import { Socket, Server } from "socket.io";
import { SOCKET_CLIENT_TO_SERVER } from "../../constants";
import RoomManager, { Room } from "../../rooms";

import {
  IDice,
  IPlayer,
  IRoomTurnStage,
  SocketRoomPlayerMessageSendPayload,
  SocketRoomPlayerStartPayload,
  SocketRoomPlayerTryMovePayload,
} from "../../types";

import {
  emitRoomJoined,
  emitRoomPlayerJoined,
  emitRoomPlayerLeft,
  emitRoomPlayerMessage,
  emitRoomPlayerMoved,
  emitRoomPlayerRollDice,
  emitRoomPlayerRollingDice,
  emitRoomPlayerTurnChange,
} from "../emitter/room";

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

  //@ts-ignore
  room.subscribe("onTurnChange", (player: IPlayer, turn: IRoomTurnStage) => {
    emitRoomPlayerTurnChange(room.id, server, socket, {
      playerID: player.id,
      turn,
    });
  });
}

export async function handleRoomPlayerStart(
  room: Room,
  socket: Socket,
  player: IPlayer
) {
  const handler = async (payload: SocketRoomPlayerStartPayload) => {
    console.log(SOCKET_CLIENT_TO_SERVER.ROOM_PLAYER_START, payload);

    room.start();
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
