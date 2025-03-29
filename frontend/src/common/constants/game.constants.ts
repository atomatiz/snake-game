export const BASE_URL =
  process.env.NEXT_PUBLIC_SNAKE_GAME_API_URL || "http://localhost:3001/v1/api";

export const MIN_DIMENSION = 5;
export const MAX_DIMENSION = 25;

export const MOVEMENT_DIFFICULTIES = {
  HARD: 500,
  MEDIUM: 750,
  EASY: 1000,
} as const;
