import { Direction, GameResponse } from "@/common/types/game.types";
import { Nullable } from "@/common/types/global.types";

export interface GameState {
  gameData: Nullable<GameResponse>;
  width: Nullable<number>;
  height: Nullable<number>;
  moveInterval: Nullable<number>;
  direction: Nullable<Direction>;
  lastDirection: Nullable<Direction>;
  gameStarted: boolean;
  isMoving: boolean;
  loading: boolean;
  error: Nullable<string>;
}
