"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { Box } from "@/components/atoms/Box";
import { Input } from "@/components/atoms/Input";
import { Selection } from "@/components/atoms/Selection";
import { Alert } from "@/components/atoms/Alert";
import {
  MAX_DIMENSION,
  MIN_DIMENSION,
  MOVEMENT_DIFFICULTIES,
} from "@/common/constants/game.constants";
import { useAppDispatch } from "@/store/hooks";
import { startGameAsync } from "@/store/slices/game.slice";

interface GameFormProps {
  onSubmit: (width: number, height: number, moveInterval: number) => void;
}

export const GameForm: React.FC<GameFormProps> = ({ onSubmit }) => {
  const [width, setWidth] = useState(MIN_DIMENSION.toString());
  const [height, setHeight] = useState(MIN_DIMENSION.toString());
  const [difficulty, setDifficulty] = useState(
    MOVEMENT_DIFFICULTIES.EASY.toString()
  );
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const w = parseInt(width, 10);
    const h = parseInt(height, 10);
    const interval = parseInt(difficulty, 10);

    if (
      w >= MIN_DIMENSION &&
      h >= MIN_DIMENSION &&
      w <= MAX_DIMENSION &&
      h <= MAX_DIMENSION
    ) {
      dispatch(startGameAsync({ width: w, height: h, moveInterval: interval }));
      onSubmit(w, h, interval);
    } else {
      setError(`Width and Height must be filled to start the game`);
      setTimeout(() => {
        setError(null);
      }, 30000);
    }
  };

  const difficultyOptions = [
    {
      value: MOVEMENT_DIFFICULTIES.HARD.toString(),
      label: "Hard (1/2 second)",
    },
    {
      value: MOVEMENT_DIFFICULTIES.MEDIUM.toString(),
      label: "Medium (2/3 second)",
    },
    { value: MOVEMENT_DIFFICULTIES.EASY.toString(), label: "Easy (1 second)" },
  ];

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4"
    >
      <Text variant="h5" className="text-center">
        Enter Matrix Dimensions
      </Text>
      <Box className="flex w-full gap-2">
        <Input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          placeholder="Width"
          inputProps={{
            min: MIN_DIMENSION,
            max: MAX_DIMENSION,
          }}
          className="w-full"
        />
        <Input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Height"
          inputProps={{
            min: MIN_DIMENSION,
            max: MAX_DIMENSION,
          }}
          className="w-full"
        />
      </Box>

      {error && (
        <Alert
          severity="error"
          title="Caution"
          onClose={() => setError(null)}
          className="w-full mt-2"
        >
          {error}
        </Alert>
      )}
      <Text variant="h5" className="text-center">
        Select Difficulty Level Of Movement
      </Text>
      <Box className="flex w-full gap-2">
        <Selection
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as string)}
          options={difficultyOptions}
          className="w-full"
        />
      </Box>
      <Button type="submit" variant="primary">
        Start Game
      </Button>
    </Box>
  );
};
