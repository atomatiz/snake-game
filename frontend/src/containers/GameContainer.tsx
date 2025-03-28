"use client";

import React from "react";
import { GameBoard } from "@/components/game/GameBoard";
import { GameForm } from "@/components/game/GameForm";
import { GameInfo } from "@/components/game/GameInfo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { startGameAsync, newGame } from "@/store/slices/game.slice";

export const GameContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { gameData, width, height, moveInterval } = useAppSelector(
    (state) => state.game
  );

  const handleStartGame = async (w: number, h: number, interval: number) => {
    await dispatch(
      startGameAsync({ width: w, height: h, moveInterval: interval })
    );
  };

  const handleReplay = async () => {
    if (width && height && moveInterval) {
      await dispatch(startGameAsync({ width, height, moveInterval }));
    }
  };

  const handleNewGame = () => {
    dispatch(newGame());
  };

  return (
    <>
      {!gameData || !width || !height || !moveInterval ? (
        <GameForm onSubmit={handleStartGame} />
      ) : (
        <>
          <GameInfo />
          <GameBoard
            initialState={gameData}
            width={width}
            height={height}
            moveInterval={moveInterval}
            onReplay={handleReplay}
            onNewGame={handleNewGame}
          />
        </>
      )}
    </>
  );
};
