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
  const actualWidth = width || props.width || 0;
  const actualHeight = height || props.height || 0;
  const actualMoveInterval =
    moveInterval || props.moveInterval || MOVEMENT_DIFFICULTIES.HARD;

  const getDifficultyLabel = (interval: number): string => {
    switch (interval) {
      case MOVEMENT_DIFFICULTIES.HARD:
        return "Hard (1/2 second)";
      case MOVEMENT_DIFFICULTIES.MEDIUM:
        return "Medium (2/3 second)";
      case MOVEMENT_DIFFICULTIES.EASY:
        return "Easy (1 second)";
      default:
        return "Custom";
    }
  };

  const boardWidthInPixels = actualWidth * 32;

  return (
    <div
      className="flex flex-col items-center mb-4 space-y-1"
      style={{ width: `${boardWidthInPixels}px` }}
    >
      <div className="flex w-full">
        <Text className="text-gray-700 mr-1">Difficulty:</Text>
        <Text className="text-black font-bold">
          {getDifficultyLabel(actualMoveInterval)}
        </Text>
      </div>
      <div className="flex w-full">
        <Text className="text-gray-700 mr-1">Dimensions:</Text>
        <Text className="text-black font-bold">
          {actualWidth}x{actualHeight}
        </Text>
      </div>
    </div>
  );
};
