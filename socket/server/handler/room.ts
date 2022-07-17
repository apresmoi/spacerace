import { Socket, Server } from "socket.io";
import { SOCKET_CLIENT_TO_SERVER } from "../../constants";
import RoomManager, { Room } from "../../rooms";

import {
  IDice,
  IItem,
  IPlayer,
  IPosition,
  IRoomTurnStage,
  SocketRoomPlayerMessageSendPayload,
  SocketRoomPlayerStartPayload,
  SocketRoomPlayerTryDropItemPayload,
  SocketRoomPlayerTryMovePayload,
} from "../../types";

import {
  emitRoomJoined,
  emitRoomPlayerDropItem,
  emitRoomPlayerJoined,
  emitRoomPlayerLeft,
  emitRoomPlayerMessage,
  emitRoomPlayerMoved,
  emitRoomPlayerPickUpItem,
  emitRoomPlayerRollDice,
  emitRoomPlayerRollingDice,
  emitRoomPlayerStarted,
  emitRoomPlayerTurnChange,
} from "../emitter/room";

export async function handleRoomEvents(
  room: Room,
  server: Server,
  socket: Socket
) {
  //@ts-ignore
  room.subscribe("onTurnChange", (player: IPlayer, turn: IRoomTurnStage) => {
    emitRoomPlayerTurnChange(room.id, server, socket, {
      playerID: player.id,
      turn,
    });
  });

  //@ts-ignore
  room.subscribe("onStart", (player: IPlayer, startedAt: string) => {
    emitRoomPlayerStarted(room.id, server, socket, {
      startedAt,
    });
  });

  //@ts-ignore
  room.subscribe("onSystemMessage", (content: string) => {
    emitRoomPlayerMessage(room.id, server, socket, {
      message: {
        content,
        date: new Date(),
      },
    });
  });

  room.subscribe(
    "onPickUpItem",
    //@ts-ignore
    (player: IPlayer, item: IItem, position: IPosition) => {
      emitRoomPlayerPickUpItem(room.id, server, socket, {
        playerID: player.id,
        item,
        position,
      });
    }
  );
}

export async function handleRoomPlayerJoin(
  room: Room,
  server: Server,
  socket: Socket,
  player: IPlayer
) {
  if (!socket.rooms.has(room.id)) {
    socket.rooms.add(room.id);
  }
  socket.join(room.id);

  emitRoomPlayerJoined(room.id, socket, {
    player,
  });
  emitRoomJoined(server, socket, {
    room: room.serialized,
    playerID: player.id,
  });
}

export async function handleRoomPlayerStart(
  room: Room,
  server: Server,
  socket: Socket,
  player: IPlayer
) {
  const handler = async (payload: SocketRoomPlayerStartPayload) => {
    console.log(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_START, payload);

    room.start(player.id);
  };

  socket.on(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_START, handler);
}

export async function handleRoomPlayerLeave(
  room: Room,
  roomStore: RoomManager,
  socket: Socket,
  player: IPlayer
) {
  const handler = () => {
    console.log("player disconnected");

    socket.leave(room.id);

    emitRoomPlayerLeft(room.id, socket, {
      playerID: player.id,
    });

    room.removePlayer(player.id);
    if (!room.getPlayerCount()) roomStore.destroyRoom(room.id);
  };

  socket.on("disconnection", handler);
  socket.on("disconnect", handler);
}

export async function handleRoomPlayerMessageSend(
  room: Room,
  socket: Socket,
  server: Server,
  player: IPlayer
) {
  const handler = async (payload: SocketRoomPlayerMessageSendPayload) => {
    console.log(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_MESSAGE_SEND, payload);

    emitRoomPlayerMessage(room.id, server, socket, {
      message: { ...payload.message, date: new Date(), playerID: player.id },
    });
  };

  socket.on(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_MESSAGE_SEND, handler);
}

export async function handleRoomPlayerTryMove(
  room: Room,
  socket: Socket,
  server: Server,
  player: IPlayer
) {
  const handler = async (payload: SocketRoomPlayerTryMovePayload) => {
    console.log(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_TRY_MOVE, payload);

    room.tryMovePlayer(player.id, payload.position);
  };

  //@ts-ignore
  room.subscribe("onPlayerMove", (player: IPlayer, position: IPosition) => {
    emitRoomPlayerMoved(room.id, server, socket, {
      playerID: player.id,
      position,
    });
  });

  socket.on(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_TRY_MOVE, handler);
}

export async function handleRoomPlayerTryDice(
  room: Room,
  socket: Socket,
  server: Server,
  player: IPlayer
) {
  const handler = async (payload: SocketRoomPlayerMessageSendPayload) => {
    console.log(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_TRY_DICE, payload);

    room.tryRollDice(player.id);

    // emitRoomPlayerRollingDice(room.id, server, socket, {});
  };

  //@ts-ignore
  room.subscribe("onDiceRolled", (player: IPlayer, dice: IDice) => {
    emitRoomPlayerRollDice(room.id, server, socket, {
      playerID: player.id,
      dice,
    });
  });

  socket.on(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_TRY_DICE, handler);
}

export async function handleRoomPlayerTryDropItem(
  room: Room,
  socket: Socket,
  server: Server,
  player: IPlayer
) {
  const handler = async (payload: SocketRoomPlayerTryDropItemPayload) => {
    console.log(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_TRY_DROP_ITEM, payload);

    room.tryDropItem(player.id, payload.targetPlayerID, payload.item);
  };

  room.subscribe(
    "onDropItem",
    //@ts-ignore
    (targetPlayer: IPlayer, item: IItem, position: IPosition) => {
      emitRoomPlayerDropItem(room.id, server, socket, {
        playerID: targetPlayer.id,
        item,
        position,
      });
    }
  );

  socket.on(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_TRY_DROP_ITEM, handler);
}
