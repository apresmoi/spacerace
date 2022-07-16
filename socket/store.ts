import { v4 as uuid } from "uuid";
import { getRandomName } from "../utils/names";
import { IPlayer, IPosition, IRoom, IRoomSubscribers } from "./types";

class Room {
  _room: IRoom;
  _subscribers: IRoomSubscribers = {
    onDiceRolled: [],
    onPlayerMove: [],
    onTurnChange: [],
  };

  subscribe = (
    key: keyof IRoomSubscribers,
    callback: IRoomSubscribers[keyof IRoomSubscribers]
  ) => {
    if (!this._subscribers[key]) this._subscribers[key] = [];
    //@ts-ignore
    this._subscribers[key].push(callback);
  };

  unsubscribe = (
    key: keyof IRoomSubscribers,
    callback: IRoomSubscribers[keyof IRoomSubscribers]
  ) => {
    if (!this._subscribers[key]) this._subscribers[key] = [];
    //@ts-ignore
    this._subscribers[key] = this._subscribers[key].filter(
      //@ts-ignore
      (cb) => cb !== callback
    );
  };

  private trigger = (key: keyof IRoomSubscribers, ...args: any) => {
    if (!this._subscribers[key]) this._subscribers[key] = [];
    this._subscribers[key].forEach((cb) => {
      //@ts-ignore
      cb(...args);
    });
  };

  constructor(name: string) {
    this._room = {
      id: uuid(),
      name: name || getRandomName(),
      players: [],
      cells: [
        { x: 0, y: 1, type: "space" },
        { x: 1, y: 1, type: "space" },
        { x: 2, y: 1, type: "space" },
        { x: 3, y: 1, type: "space" },
        { x: 4, y: 1, type: "space" },
        { x: 5, y: 1, type: "space" },
        { x: 6, y: 1, type: "space" },
        { x: 2, y: 2, type: "space" },
        { x: 2, y: 3, type: "space" },
        { x: 2, y: 4, type: "space" },
        { x: 3, y: 4, type: "space" },
        { x: 4, y: 4, type: "space" },
        { x: 6, y: 4, type: "space" },
        { x: 7, y: 4, type: "space" },
        { x: 8, y: 4, type: "space" },
        { x: 9, y: 4, type: "space" },
        { x: 5, y: 2, type: "space" },
        { x: 5, y: 3, type: "space" },
        { x: 5, y: 4, type: "space" },
        { x: 5, y: 5, type: "space" },
        { x: 5, y: 6, type: "space" },
        { x: 5, y: 7, type: "space" },
      ],
      effects: [{ x: 0, y: 0, type: "storm" }],
      height: 10,
      width: 10,
      currentTurnPlayerID: undefined,
      started: false,
      currentDice: [0, 0],
      turnStage: "WAITING_FOR_START",
    };
  }

  get id() {
    return this._room.id;
  }

  get name() {
    return this._room.name;
  }

  get players() {
    return this._room.players;
  }

  get serialized() {
    return this._room;
  }

  getPlayerCount = () => {
    return this._room.players.length;
  };

  addPlayer = (player: IPlayer) => {
    this._room.players.push(player);
  };

  removePlayer = (playerID: string) => {
    this._room.players = this._room.players.filter(
      (player) => player.id !== playerID
    );
  };

  getPlayerById = (playerID: string) => {
    return this._room.players.find((player) => player.id === playerID);
  };

  getPlayerIndex = (playerID: string) => {
    return this._room.players.findIndex((player) => player.id === playerID);
  };

  getNextPlayer = (playerID: string) => {
    let index = this.getPlayerIndex(playerID);
    if (index >= this.getPlayerCount() - 1) index = 0;
    else index += 1;

    return this._room.players[index];
  };

  getRandomPlayer = () => {
    const randomIndex = Math.floor(Math.random() * this._room.players.length);
    return this._room.players[randomIndex];
  };

  private movePlayer = (playerID: string, position: IPosition) => {
    this._room.players = this._room.players.map((player) =>
      player.id === playerID ? { ...player, ...position } : player
    );
  };

  private rollDice = () => {
    this._room.currentDice = [
      Math.floor(Math.random() * 6),
      Math.floor(Math.random() * 6),
    ];
  };

  private nextTurn = () => {
    if (this._room.currentTurnPlayerID) {
      const nextPlayer = this.getNextPlayer(this._room.currentTurnPlayerID);
      this._room.currentTurnPlayerID = nextPlayer.id;
      this._room.turnStage = "WAITING_FOR_ROLL";
    }
  };

  private triggerTurnChange = () => {
    if (this._room.currentTurnPlayerID) {
      const currentPlayer = this.getPlayerById(this._room.currentTurnPlayerID);

      if (currentPlayer) {
        this.trigger("onTurnChange", currentPlayer, this._room.turnStage);
      }
    }
  };

  private triggerDiceRolled = () => {
    if (this._room.currentTurnPlayerID) {
      const currentPlayer = this.getPlayerById(this._room.currentTurnPlayerID);

      if (currentPlayer) {
        this.trigger("onDiceRolled", currentPlayer, this._room.currentDice);
      }
    }
  };

  private triggerPlayerMoved = () => {
    if (this._room.currentTurnPlayerID) {
      const currentPlayer = this.getPlayerById(this._room.currentTurnPlayerID);

      if (currentPlayer) {
        this.trigger("onPlayerMove", currentPlayer, {
          x: currentPlayer.x,
          y: currentPlayer.y,
        });
      }
    }
  };

  start = () => {
    this._room.started = true;
    this._room.startedAt = new Date();

    this._room.currentTurnPlayerID = this.getRandomPlayer().id;
    this._room.turnStage = "WAITING_FOR_ROLL";

    this.triggerTurnChange();
  };

  tryRollDice = (playerID: string) => {
    if (
      this._room.turnStage === "WAITING_FOR_ROLL" &&
      this._room.currentTurnPlayerID === playerID
    ) {
      this.rollDice();
      this.triggerDiceRolled();
      this._room.turnStage = "WAITING_FOR_MOVE";
      this.triggerTurnChange();
    }
  };

  tryMovePlayer = (playerID: string, position: IPosition) => {
    if (
      this._room.turnStage === "WAITING_FOR_MOVE" &&
      this._room.currentTurnPlayerID === playerID
    ) {
      this.movePlayer(playerID, position);
      this.triggerPlayerMoved();
      this.nextTurn();
      this.triggerTurnChange();
    }
  };
}

class RoomManager {
  _rooms: Room[] = [];

  addRoom = (name: string) => {
    const room = new Room(name);
    this._rooms.push(room);
    return room;
  };

  destroyRoom = (id: string) => {
    this._rooms = this._rooms.filter((room) => room.id !== id);
  };

  getRoom = (id: string) => {
    console.log("rooms", this._rooms);
    return this._rooms.find((room) => room.id === id);
  };

  getRooms = () => {
    return this._rooms;
  };
}

export default RoomManager;
export { Room };
