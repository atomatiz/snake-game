"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { Box } from "@/components/atoms/Box";
import {
  MAX_DIMENSION,
  MIN_DIMENSION,
  MOVEMENT_DIFFICULTIES,
} from "@/common/constants/game.constants";

interface GameFormProps {
  onSubmit: (width: number, height: number, moveInterval: number) => void;
}

export const GameForm: React.FC<GameFormProps> = ({ onSubmit }) => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [difficulty, setDifficulty] = useState("1000");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseInt(width, 10);
    const h = parseInt(height, 10);
    const interval = parseInt(difficulty, 10);

    if (
      w >= MIN_DIMENSION &&
      h >= MIN_DIMENSION &&
      w <= MAX_DIMENSION &&
      h <= MAX_DIMENSION
    ) {
      onSubmit(w, h, interval);
    } else {
      alert("Width and Height must be at least 5 and less than 25");
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4"
    >
      <Text variant="h2" className="text-center">
        Enter Matrix Dimensions
      </Text>
      <Box className="flex w-full gap-2">
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          placeholder="Width"
          className="border p-2 rounded w-full"
          min="5"
          max="25"
        />
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Height"
          className="border p-2 rounded w-full"
          min="5"
          max="25"
        />
      </Box>
      <Text variant="h2" className="text-center">
        Select Difficulty Level Of Movement
      </Text>
      <Box className="flex w-full gap-2">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value={MOVEMENT_DIFFICULTIES.HARD}>Hard (1/2 second)</option>
          <option value={MOVEMENT_DIFFICULTIES.MEDIUM}>
            Medium (2/3 second)
          </option>
          <option value={MOVEMENT_DIFFICULTIES.EASY}>Easy (1 second)</option>
        </select>
      </Box>
      <Button type="submit">Start Game</Button>
    </Box>
  );
};
