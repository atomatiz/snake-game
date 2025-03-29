import { QueryClient } from "@tanstack/react-query";
import { GameResponse, Direction } from "@/common/types/game.types";
import { BASE_URL } from "@/common/constants/game.constants";
import { Nullable } from "@/common/types/global.types";

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
  direction: Nullable<Direction>,
  queryClient: QueryClient
): Promise<GameResponse> => {
  return queryClient.fetchQuery({
    // Remove Date.now() from queryKey to enable better caching
    // This prevents unnecessary API calls with the same direction
    queryKey: ["moveSnake", direction],
    // Set a short staleTime to improve performance while maintaining data freshness
    staleTime: 100, // 100ms stale time
    // Add retry logic for better resilience
    retry: 1,
    retryDelay: 300,
    queryFn: async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
        
        const response = await fetch(`${BASE_URL}/game/move`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ direction }),
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Failed to move snake: ${response.statusText}`);
        }

        return response.json();
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          throw new Error('Request timed out. Please check your connection.');
        }
        throw error;
      }
    },
  });
};
