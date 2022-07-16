import { v4 as uuid } from "uuid";
import { getRandomName } from "../utils/names";
import { IPlayer, IPosition, IRoom } from "./types";

// let rooms: IRoom[] = [];

class RoomManager {
  rooms: IRoom[] = [];

  addRoom = (name: string) => {
    const room = {
      id: uuid(),
      name: name || getRandomName(),
      players: [],
    };
    this.rooms.push(room);
    return room;
  };

  destroyRoom = (id: string) => {
    this.rooms = this.rooms.filter((room) => room.id !== id);
  };

  getRoom = (id: string) => {
    console.log("rooms", this.rooms);
    return this.rooms.find((room) => room.id === id);
  };

  getRooms = () => {
    return this.rooms;
  };

  getPlayerCount = (id: string) => {
    const room = this.getRoom(id);
    if (room) room.players.length;
    return 0;
  };

  addPlayer = (id: string, player: IPlayer) => {
    const room = this.getRoom(id);
    if (room) room.players.push(player);
  };

  removePlayer = (id: string, playerID: string) => {
    const room = this.getRoom(id);
    if (room)
      room.players = room.players.filter((player) => player.id !== playerID);
  };

  movePlayer = (id: string, playerID: string, position: IPosition) => {
    const room = this.getRoom(id);
    if (room)
      room.players = room.players.map((player) =>
        player.id === playerID ? { ...player, ...position } : player
      );
  };
}

// const addRoom = (name: string) => {
//   const room = {
//     id: uuid(),
//     name: name || getRandomName(),
//     players: [],
//   };
//   rooms.push(room);
//   return room;
// };

// const getRoom = (id: string) => {
//   console.log("rooms", rooms);
//   return rooms.find((room) => room.id === id);
// };

// const getRooms = () => {
//   return rooms;
// };

// const addPlayer = (id: string, player: IPlayer) => {
//   const room = getRoom(id);
//   if (room) room.players.push(player);
// };

// const removePlayer = (id: string, playerID: string) => {
//   const room = getRoom(id);
//   if (room)
//     room.players = room.players.filter((player) => player.id !== playerID);
// };

// const movePlayer = (id: string, playerID: string, position: IPosition) => {
//   const room = getRoom(id);
//   if (room)
//     room.players = room.players.map((player) =>
//       player.id === playerID ? { ...player, ...position } : player
//     );
// };

// const roomStore = {
//   addRoom,
//   getRoom,
//   getRooms,
//   addPlayer,
//   removePlayer,
//   movePlayer,
// };

export default RoomManager;
