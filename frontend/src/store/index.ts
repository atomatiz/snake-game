import { configureStore } from "@reduxjs/toolkit";
import { QueryClient } from "@tanstack/react-query";
import gameReducer from "./slices/game.slice";

export const queryClient = new QueryClient();

const store = configureStore({
  reducer: {
    game: gameReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { queryClient },
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
