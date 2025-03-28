import { Direction, GameResponse } from "@/common/types/game.types";

export interface GameState {
  gameData: GameResponse | null;
  width: number | null;
  height: number | null;
  moveInterval: number | null;
  direction: Direction | undefined;
  lastDirection: Direction | undefined;
  gameStarted: boolean;
  isMoving: boolean;
  loading: boolean;
  error: string | null;
}
