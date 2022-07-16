import { v4 as uuid } from "uuid";
import { getRandomName } from "../utils/names";
import { IPlayer, IPosition, IRoom } from "./types";

class Room {
  _room: IRoom;

  constructor(name: string) {
    this._room = {
      id: uuid(),
      name: name || getRandomName(),
      players: [],
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

  movePlayer = (playerID: string, position: IPosition) => {
    this._room.players = this._room.players.map((player) =>
      player.id === playerID ? { ...player, ...position } : player
    );
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
