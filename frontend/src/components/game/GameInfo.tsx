"use client";

import React from "react";
import { Text } from "@/components/atoms/Text";
import { MOVEMENT_DIFFICULTIES } from "@/common/constants/game.constants";
import { useAppSelector } from "@/store/hooks";

interface GameInfoProps {
  width?: number;
  height?: number;
  moveInterval?: number;
}

export const GameInfo: React.FC<GameInfoProps> = (props) => {
  const width = useAppSelector((state) => state.game.width);
  const height = useAppSelector((state) => state.game.height);
  const moveInterval = useAppSelector((state) => state.game.moveInterval);
  const gameData = useAppSelector((state) => state.game.gameData);
  const actualWidth = width || props.width || 0;
  const actualHeight = height || props.height || 0;
  const actualMoveInterval =
    moveInterval || props.moveInterval || MOVEMENT_DIFFICULTIES.HARD;

  let resultMessage = null;
  let resultColor = "";

  if (gameData?.gameOver) {
    if (gameData.board === "You win!") {
      resultMessage = "You win!";
      resultColor = "text-yellow-500";
    } else {
      resultMessage = "You lose!";
      resultColor = "text-red-600";
    }
  }

  const getDifficultyLabel = (interval: number): string => {
    switch (interval) {
      case MOVEMENT_DIFFICULTIES.HARD:
        return "Hard 1/2s";
      case MOVEMENT_DIFFICULTIES.MEDIUM:
        return "Medium 2/3s";
      case MOVEMENT_DIFFICULTIES.EASY:
        return "Easy 1s";
      default:
        return "Custom";
    }
  };

  const boardWidthInPixels = actualWidth * 32;

  return (
    <div
      className="flex flex-col items-center mb-4 space-y-2"
      style={{ width: `${boardWidthInPixels}px` }}
    >
      {resultMessage && (
        <Text
          variant="h4"
          className={`${resultColor} font-bold mb-2 text-center`}
        >
          {resultMessage}
        </Text>
      )}

      <div className="flex w-full items-center space-x-1">
        <Text variant="p" className="text-gray-700">
          Difficulty:
        </Text>
        <Text variant="p" className="text-black font-bold">
          {getDifficultyLabel(actualMoveInterval)}
        </Text>
      </div>
      <div className="flex w-full items-center space-x-1">
        <Text variant="p" className="text-gray-700">
          Dimensions:
        </Text>
        <Text variant="p" className="text-black font-bold">
          {actualWidth}x{actualHeight}
        </Text>
      </div>
    </div>
  );
};
