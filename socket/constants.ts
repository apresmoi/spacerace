export enum SOCKET_CLIENT_TO_SERVER {
  "ROOM_PLAYER_TRY_MOVE" = "ROOM_PLAYER_TRY_MOVE",
  "ROOM_PLAYER_TRY_DICE" = "ROOM_PLAYER_TRY_DICE",
  "ROOM_PLAYER_MESSAGE_SEND" = "ROOM_PLAYER_MESSAGE_SEND",
}

export enum SOCKET_SERVER_TO_CLIENT {
  "ROOM_JOINED" = "ROOM_JOINED",
  "ROOM_PLAYER_JOINED" = "ROOM_PLAYER_JOINED",
  "ROOM_PLAYER_LEFT" = "ROOM_PLAYER_LEFT",
  "ROOM_PLAYER_TURN_CHANGE" = "ROOM_PLAYER_TURN_CHANGE",
  "ROOM_PLAYER_ROLLING_DICE" = "ROOM_PLAYER_ROLLING_DICE",
  "ROOM_PLAYER_ROLL_DICE" = "ROOM_PLAYER_ROLL_DICE",
  "ROOM_PLAYER_MOVED" = "ROOM_PLAYER_MOVED",
  "ROOM_PLAYER_MESSAGE" = "ROOM_PLAYER_MESSAGE",
}
