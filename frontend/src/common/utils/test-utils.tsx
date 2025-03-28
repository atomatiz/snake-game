import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "@/store/slices/game.slice";

export function createTestStore(preloadedState = {}) {
  const mockQueryClient = {
    invalidateQueries: jest.fn(),
    fetchQuery: jest.fn().mockImplementation(() => {
      return Promise.resolve({
        snake: [{ x: 2, y: 0 }],
        bait: { x: 8, y: 6 },
        gameOver: false,
      });
    }),
  };

  return configureStore({
    reducer: {
      game: gameReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        thunk: {
          extraArgument: { queryClient: mockQueryClient },
        },
      }),
  });
}

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  preloadedState?: Record<string, unknown>;
}

export function renderWithProviders(
  ui: ReactElement,
  { preloadedState = {}, ...renderOptions }: CustomRenderOptions = {}
) {
  const store = createTestStore(preloadedState);

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
