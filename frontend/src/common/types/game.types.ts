export type Coordinate = {
  x: number;
  y: number;
};

export type Direction = "up" | "down" | "left" | "right";

export interface GameResponse {
  snake: Coordinate[];
  bait: Coordinate;
  gameOver: boolean;
  board?: string;
}
