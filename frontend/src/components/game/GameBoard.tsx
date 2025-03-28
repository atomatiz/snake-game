"use client";

import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Text } from "@/components/atoms/Text";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { moveSnake } from "@/api/gameApi";
import { Coordinate, Direction, GameResponse } from "@/common/types/game.types";
import { errorMessage } from "@/common/utils/error-message.util";

interface GameBoardProps {
  initialState: GameResponse;
  width: number;
  height: number;
  moveInterval: number;
  setGameState: (state: GameResponse) => void;
  onReplay: () => void;
  onNewGame: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  initialState,
  width,
  height,
  moveInterval,
  setGameState,
  onReplay,
  onNewGame,
}) => {
  const [gameState, setLocalGameState] = useState<GameResponse>(initialState);
  const [direction, setDirection] = useState<Direction | undefined>(undefined);
  const [gameStarted, setGameStarted] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [lastDirection, setLastDirection] = useState<Direction | undefined>(
    undefined
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    setLocalGameState(initialState);
    setDirection(undefined);
    setLastDirection(undefined);
    setGameStarted(false);
    setIsMoving(false);
  }, [initialState]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          setDirection("up");
          break;
        case "ArrowDown":
          setDirection("down");
          break;
        case "ArrowLeft":
          setDirection("left");
          break;
        case "ArrowRight":
          setDirection("right");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    if (direction) {
      setLastDirection(direction);
      setGameStarted(true);
    }
  }, [direction]);

  useEffect(() => {
    if (gameState.gameOver) {
      return;
    }

    if (!gameStarted) {
      return;
    }

    const handleMove = async () => {
      if (isMoving) return;

      try {
        setIsMoving(true);
        const directionToUse = direction || lastDirection;
        if (directionToUse) {
          const newState = await moveSnake(directionToUse, queryClient);
          setLocalGameState(newState);
          setGameState(newState);
          if (direction) setDirection(undefined);
        }
      } catch (error: unknown) {
        console.error(errorMessage("Move failed:", error));
      } finally {
        setIsMoving(false);
      }
    };

    const moveIntervalId = setInterval(handleMove, moveInterval);

    return () => clearInterval(moveIntervalId);
  }, [
    gameState,
    direction,
    lastDirection,
    queryClient,
    setGameState,
    moveInterval,
    gameStarted,
    isMoving,
  ]);

  const renderCell = (x: number, y: number) => {
    const isSnake = gameState.snake.some(
      (segment: Coordinate) => segment.x === x && segment.y === y
    );
    const isBait = gameState.bait.x === x && gameState.bait.y === y;
    return (
      <Box
        key={`${x}-${y}`}
        data-testid={`cell-${x}-${y}`}
        className={`w-8 h-8 border border-gray-300 ${
          isSnake ? "bg-green-500" : isBait ? "bg-red-500" : "bg-white"
        }`}
      />
    );
  };

  const renderRow = (y: number) => {
    const cells = Array.from({ length: width }, (_, x) => renderCell(x, y));
    return (
      <Box key={y} className="flex">
        {cells}
      </Box>
    );
  };

  const board = Array.from({ length: height }, (_, y) => renderRow(y));

  return (
    <Box className="flex flex-col items-center">
      <Box className="flex flex-col">{board}</Box>
      {gameState.gameOver ? (
        <Box className="mt-4 flex flex-col items-center gap-2">
          <Text variant="h2" className="text-red-600">
            {gameState.board || "Game Over"}
          </Text>
          <Button
            onClick={() => {
              setDirection(undefined);
              setLastDirection(undefined);
              setGameStarted(false);
              setIsMoving(false);
              onReplay();
            }}
          >
            Replay
          </Button>
          <Button onClick={onNewGame}>New Game</Button>
        </Box>
      ) : (
        <Box className="mt-4 flex flex-col items-center gap-2">
          <Button
            onClick={onNewGame}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Exit Game
          </Button>
        </Box>
      )}
    </Box>
  );
};
