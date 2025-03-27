"use client";

import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { GameBoard } from "@/components/game/GameBoard";
import { GameForm } from "@/components/game/GameForm";
import { startGame } from "@/api/gameApi";
import { GameResponse } from "@/common/types/game.types";
import { errorMessage } from "@/common/utils/error-message.util";

export const GameContainer: React.FC = () => {
  const [gameState, setGameState] = useState<GameResponse | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const handleStartGame = async (w: number, h: number) => {
    try {
      const initialState = await startGame(w, h, queryClient);
      setWidth(w);
      setHeight(h);
      setGameState(initialState);
    } catch (error: unknown) {
      console.error(errorMessage("Failed to start game:", error));
    }
  };

  const handleReplay = async () => {
    if (width && height) {
      try {
        const initialState = await startGame(width, height, queryClient);
        setGameState(initialState);
      } catch (error: unknown) {
        console.error(errorMessage("Failed to replay game:", error));
      }
    }
  };

  const handleNewGame = () => {
    setGameState(null);
    setWidth(null);
    setHeight(null);
  };

  return (
    <>
      {!gameState ? (
        <GameForm onSubmit={handleStartGame} />
      ) : width && height ? (
        <GameBoard
          initialState={gameState}
          width={width}
          height={height}
          setGameState={setGameState}
          onReplay={handleReplay}
          onNewGame={handleNewGame}
        />
      ) : null}
    </>
  );
};
