import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Direction, GameResponse } from "@/common/types/game.types";
import { GameState } from "../types/game.types";
import {
  startGame as apiStartGame,
  moveSnake as apiMoveSnake,
} from "@/api/gameApi";
import { errorMessage } from "@/common/utils/error-message.util";
import { QueryClient } from "@tanstack/react-query";
import { AppDispatch } from "../index";

const initialState: GameState = {
  gameData: null,
  width: null,
  height: null,
  moveInterval: null,
  direction: undefined,
  lastDirection: undefined,
  gameStarted: false,
  isMoving: false,
  loading: false,
  error: null,
};

interface ThunkAPI {
  extra: {
    queryClient: QueryClient;
  };
}

export const startGameAsync = createAsyncThunk<
  GameResponse,
  { width: number; height: number; moveInterval: number },
  ThunkAPI
>(
  "game/startGame",
  async ({ width, height, moveInterval }, { extra, rejectWithValue }) => {
    try {
      const gameData = await apiStartGame(
        width,
        height,
        moveInterval,
        extra.queryClient
      );
      return gameData;
    } catch (error: unknown) {
      const errorMsg = errorMessage("Failed to start game:", error);
      console.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

export const moveSnakeAsync = createAsyncThunk<
  GameResponse,
  Direction,
  ThunkAPI
>("game/moveSnake", async (direction, { extra, rejectWithValue }) => {
  try {
    const gameData = await apiMoveSnake(direction, extra.queryClient);
    return gameData;
  } catch (error: unknown) {
    const errorMsg = errorMessage("Move failed:", error);
    console.error(errorMsg);
    return rejectWithValue(errorMsg);
  }
});

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setDirection(state, action: PayloadAction<Direction | undefined>) {
      state.direction = action.payload;
    },
    setLastDirection(state, action: PayloadAction<Direction | undefined>) {
      state.lastDirection = action.payload;
    },
    setGameStarted(state, action: PayloadAction<boolean>) {
      state.gameStarted = action.payload;
    },
    setIsMoving(state, action: PayloadAction<boolean>) {
      state.isMoving = action.payload;
    },
    resetGame(state) {
      return {
        ...initialState,
        width: state.width,
        height: state.height,
        moveInterval: state.moveInterval,
      };
    },
    newGame() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startGameAsync.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.width = action.meta.arg.width;
        state.height = action.meta.arg.height;
        state.moveInterval = action.meta.arg.moveInterval;
      })
      .addCase(startGameAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.gameData = action.payload;
      })
      .addCase(startGameAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(moveSnakeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(moveSnakeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.gameData = action.payload;
        if (state.direction) {
          state.lastDirection = state.direction;
          if (action.payload.gameOver) {
            state.direction = undefined;
          }
        }
      })
      .addCase(moveSnakeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setDirection,
  setLastDirection,
  setGameStarted,
  setIsMoving,
  resetGame,
  newGame,
} = gameSlice.actions;

export default gameSlice.reducer;

export const changeDirection = (direction: Direction) => {
  return (dispatch: AppDispatch, getState: () => { game: GameState }) => {
    const {
      direction: currentDirection,
      lastDirection,
      gameData,
    } = getState().game;

    if (gameData?.gameOver) {
      return;
    }

    if (currentDirection === direction) {
      return;
    }

    const effectiveDirection = lastDirection || currentDirection;
    if (
      (effectiveDirection === "up" && direction === "down") ||
      (effectiveDirection === "down" && direction === "up") ||
      (effectiveDirection === "left" && direction === "right") ||
      (effectiveDirection === "right" && direction === "left")
    ) {
      return;
    }

    dispatch(setDirection(direction));
  };
};
