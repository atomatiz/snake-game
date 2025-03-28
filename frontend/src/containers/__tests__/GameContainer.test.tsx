import { screen, fireEvent, waitFor, act } from "@testing-library/react";
import { GameContainer } from "../GameContainer";
import * as gameApi from "@/api/gameApi";
import { renderWithProviders } from "@/common/utils/test-utils";

const createInitialPreloadedState = () => ({
  game: {
    gameData: null,
    gameStarted: false,
    isMoving: false,
    direction: undefined,
    lastDirection: undefined,
    width: null,
    height: null,
    moveInterval: null,
    error: null,
    loading: false,
  },
});

jest.mock("@/components/game/GameForm", () => ({
  GameForm: ({
    onSubmit,
  }: {
    onSubmit: (w: number, h: number, interval: number) => void;
  }) => (
    <div>
      <input data-testid="width-input" />
      <input data-testid="height-input" />
      <button onClick={() => onSubmit(10, 10, 1000)}>Start</button>
    </div>
  ),
}));
jest.mock("@/components/game/GameBoard", () => ({
  GameBoard: ({
    onReplay,
    onNewGame,
    moveInterval,
  }: {
    onReplay: () => void;
    onNewGame: () => void;
    moveInterval: number;
  }) => (
    <div data-testid="game-board" data-move-interval={moveInterval}>
      <button onClick={onReplay}>Replay</button>
      <button onClick={onNewGame}>New Game</button>
    </div>
  ),
}));

jest.mock("@/api/gameApi", () => ({
  startGame: jest.fn().mockImplementation(() => {
    return Promise.resolve({
      snake: [{ x: 2, y: 0 }],
      bait: { x: 8, y: 6 },
      gameOver: false,
    });
  }),
}));

jest.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
}));

describe("GameContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders GameForm when no game state exists", () => {
    renderWithProviders(<GameContainer />, {
      preloadedState: createInitialPreloadedState(),
    });
    expect(screen.getByTestId("width-input")).toBeInTheDocument();
    expect(screen.getByText("Start")).toBeInTheDocument();
  });

  it("renders GameBoard after starting game", async () => {
    (gameApi.startGame as jest.Mock).mockResolvedValue({
      snake: [{ x: 2, y: 0 }],
      bait: { x: 8, y: 6 },
      gameOver: false,
    });

    renderWithProviders(<GameContainer />, {
      preloadedState: createInitialPreloadedState(),
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Start"));
    });
    
    await waitFor(
      () => {
        expect(screen.getByTestId("game-board")).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it("replays game with same dimensions", async () => {
    (gameApi.startGame as jest.Mock)
      .mockResolvedValueOnce({
        snake: [{ x: 2, y: 0 }],
        bait: { x: 8, y: 6 },
        gameOver: false,
      })
      .mockResolvedValueOnce({
        snake: [{ x: 2, y: 0 }],
        bait: { x: 5, y: 5 },
        gameOver: false,
      });

    renderWithProviders(<GameContainer />, {
      preloadedState: createInitialPreloadedState(),
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Start"));
    });
    
    await waitFor(
      () => {
        expect(screen.getByTestId("game-board")).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    await act(async () => {
      fireEvent.click(screen.getByText("Replay"));
    });
    
    expect(gameApi.startGame).toHaveBeenCalledWith(
      10,
      10,
      1000,
      expect.anything()
    );
    expect(gameApi.startGame).toHaveBeenCalledTimes(2);
  });

  it("shows GameForm on New Game", async () => {
    (gameApi.startGame as jest.Mock).mockResolvedValue({
      snake: [{ x: 2, y: 0 }],
      bait: { x: 8, y: 6 },
      gameOver: false,
    });

    renderWithProviders(<GameContainer />, {
      preloadedState: createInitialPreloadedState(),
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Start"));
    });
    
    await waitFor(
      () => {
        expect(screen.getByTestId("game-board")).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    await act(async () => {
      fireEvent.click(screen.getByText("New Game"));
    });
    
    expect(screen.getByTestId("width-input")).toBeInTheDocument();
  });
});
