"use client";

import React, { useEffect } from "react";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Coordinate, Direction } from "@/common/types/game.types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  moveSnakeAsync,
  changeDirection,
  setGameStarted,
  setIsMoving,
  setDirection,
} from "@/store/slices/game.slice";
import { GameResponse } from "@/common/types/game.types";

interface GameBoardProps {
  initialState: GameResponse;
  width: number;
  height: number;
  moveInterval: number;
  onReplay: () => void;
  onNewGame: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  width,
  height,
  moveInterval,
  onReplay,
  onNewGame,
}) => {
  const dispatch = useAppDispatch();
  const {
    gameData: gameState,
    direction,
    lastDirection,
    gameStarted,
    isMoving,
  } = useAppSelector((state) => state.game);

  useEffect(() => {
    let lastKeyPressTime = 0;
    const keyDebounceTime = 50;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        event.preventDefault();
        const now = Date.now();

        if (now - lastKeyPressTime < keyDebounceTime) {
          return;
        }

        lastKeyPressTime = now;

        if (!gameState || gameState.gameOver || isMoving) {
          return;
        }

        const currentDirection = lastDirection;
        let newDirection: Direction | undefined;

        switch (event.key) {
          case "ArrowUp":
            newDirection = "up";
            break;
          case "ArrowDown":
            newDirection = "down";
            break;
          case "ArrowLeft":
            newDirection = "left";
            break;
          case "ArrowRight":
            newDirection = "right";
            break;
          default:
            return;
        }

        if (
          (currentDirection === "up" && newDirection === "down") ||
          (currentDirection === "down" && newDirection === "up") ||
          (currentDirection === "left" && newDirection === "right") ||
          (currentDirection === "right" && newDirection === "left")
        ) {
          return;
        }

        dispatch(changeDirection(newDirection));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [dispatch, gameState, lastDirection, isMoving]);

  useEffect(() => {
    if (direction) {
      dispatch(setGameStarted(true));
    }
  }, [direction, dispatch]);

  useEffect(() => {
    if (!gameState || gameState.gameOver || !gameStarted) {
      return;
    }

    let moveCount = 0;
    const maxMovesPerSecond = 5;

    const handleMove = async () => {
      if (isMoving) return;

      moveCount++;

      if (moveCount > maxMovesPerSecond) {
        moveCount = 0;
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      const directionToUse = direction || lastDirection;
      if (directionToUse) {
        dispatch(setIsMoving(true));
        try {
          await dispatch(moveSnakeAsync(directionToUse));
        } finally {
          dispatch(setIsMoving(false));
        }
      }
    };

    const moveIntervalId = setInterval(handleMove, moveInterval);
    return () => clearInterval(moveIntervalId);
  }, [
    gameState,
    lastDirection,
    moveInterval,
    gameStarted,
    isMoving,
    direction,
    dispatch,
  ]);

  const renderCell = (x: number, y: number) => {
    if (!gameState)
      return (
        <Box
          key={`${x}-${y}`}
          className="w-8 h-8 border border-gray-300 bg-white rounded-sm"
        />
      );

    const isSnake = gameState.snake.some(
      (segment: Coordinate) => segment.x === x && segment.y === y
    );
    const isBait = gameState.bait.x === x && gameState.bait.y === y;

    const isSnakeHead =
      gameState.snake.length > 0 &&
      gameState.snake[0].x === x &&
      gameState.snake[0].y === y;

    return (
      <Box
        key={`${x}-${y}`}
        data-testid={`cell-${x}-${y}`}
        className={`w-8 h-8 border border-gray-300 rounded-sm transition-colors duration-100 ${
          isSnakeHead
            ? "bg-green-700 shadow-inner"
            : isSnake
            ? "bg-green-500"
            : isBait
            ? "bg-red-500 animate-pulse"
            : "bg-white hover:bg-gray-100"
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

  const handleReplay = () => {
    dispatch(setDirection(undefined));
    dispatch(setGameStarted(false));
    dispatch(setIsMoving(false));
    onReplay();
  };

  return (
    <Box className="flex flex-col items-center">
      <Box className="flex flex-col border-4 border-gray-800 rounded shadow-lg p-1 bg-gray-100">
        {board}
      </Box>
      {gameState && gameState.gameOver ? (
        <Box className="mt-4 flex flex-col items-center gap-2">
          <Button variant="warning" onClick={handleReplay}>
            Replay
          </Button>
          <Button variant="success" onClick={onNewGame}>
            New Game
          </Button>
        </Box>
      ) : (
        <Box className="mt-4 flex flex-col items-center gap-2">
          <Button variant="danger" onClick={onNewGame}>
            Exit Game
          </Button>
        </Box>
      )}
    </Box>
  );
};
