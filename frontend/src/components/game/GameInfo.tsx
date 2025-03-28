"use client";

import React from "react";
import { Text } from "@/components/atoms/Text";
import { MOVEMENT_DIFFICULTIES } from "@/common/constants/game.constants";

interface GameInfoProps {
  width: number;
  height: number;
  moveInterval: number;
}

export const GameInfo: React.FC<GameInfoProps> = ({
  width,
  height,
  moveInterval,
}) => {
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
  const boardWidthInPixels = width * 32;

  return (
    <div
      className="flex flex-col items-center mb-4 space-y-1"
      style={{ width: `${boardWidthInPixels}px` }}
    >
      <div className="flex w-full">
        <Text className="text-gray-700 mr-1">Difficulty:</Text>
        <Text className="text-black font-bold">
          {getDifficultyLabel(moveInterval)}
        </Text>
      </div>
      <div className="flex w-full">
        <Text className="text-gray-700 mr-1">Dimensions:</Text>
        <Text className="text-black font-bold">
          {width}x{height}
        </Text>
      </div>
    </div>
  );
};
