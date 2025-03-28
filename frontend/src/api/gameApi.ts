import { QueryClient } from "@tanstack/react-query";
import { GameResponse, Direction } from "@/common/types/game.types";
import { BASE_URL } from "@/common/constants/game.constants";

export const startGame = (
  width: number,
  height: number,
  moveInterval: number,
  queryClient: QueryClient
): Promise<GameResponse> => {
  if (!moveInterval) {
    throw new Error("Move interval is required");
  }
  return queryClient.fetchQuery({
    queryKey: ["startGame", width, height],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/game/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ width, height }),
      });

      if (!response.ok) {
        throw new Error(`Failed to start game: ${response.statusText}`);
      }

      return response.json();
    },
  });
};

export const moveSnake = (
  direction: Direction | undefined,
  queryClient: QueryClient
): Promise<GameResponse> => {
  return queryClient.fetchQuery({
    queryKey: ["moveSnake", direction, Date.now()],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/game/move`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ direction }),
      });

      if (!response.ok) {
        throw new Error(`Failed to move snake: ${response.statusText}`);
      }

      return response.json();
    },
  });
};
