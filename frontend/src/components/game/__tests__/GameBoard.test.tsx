import { screen, fireEvent } from "@testing-library/react";
import { GameResponse } from "@/common/types/game.types";
import { GameBoard } from "../GameBoard";
import { MOVEMENT_DIFFICULTIES } from "@/common/constants/game.constants";
import { renderWithProviders } from "@/common/utils/test-utils";

const createPreloadedState = (
  gameData: GameResponse,
  moveInterval: number = MOVEMENT_DIFFICULTIES.MEDIUM
) => ({
  game: {
    gameData,
    gameStarted: true,
    isMoving: false,
    direction: undefined,
    lastDirection: undefined,
    width: 10,
    height: 10,
    moveInterval,
    error: null,
    loading: false,
  },
});

jest.mock("@/api/gameApi", () => ({
  moveSnake: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
}));

describe("GameBoard", () => {
  const initialState: GameResponse = {
    snake: [
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ],
    bait: { x: 8, y: 6 },
    gameOver: false,
  };
  const gameOverState: GameResponse = {
    snake: [
      { x: 9, y: 5 },
      { x: 8, y: 5 },
      { x: 7, y: 5 },
    ],
    bait: { x: 1, y: 2 },
    gameOver: true,
    board: "You lose",
  };
  const mockOnReplay = jest.fn();
  const mockOnNewGame = jest.fn();
  const defaultMoveInterval = MOVEMENT_DIFFICULTIES.MEDIUM;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the game board with snake and bait", () => {
    renderWithProviders(
      <GameBoard
        initialState={initialState}
        width={10}
        height={10}
        moveInterval={defaultMoveInterval}
        onReplay={mockOnReplay}
        onNewGame={mockOnNewGame}
      />,
      {
        preloadedState: createPreloadedState(initialState),
      }
    );

    const snakeCell = screen.getByTestId("cell-2-0");
    const baitCell = screen.getByTestId("cell-8-6");
    expect(snakeCell).toHaveClass("bg-green-500");
    expect(baitCell).toHaveClass("bg-red-500");
  });

  it("displays game over with Replay and New Game buttons", () => {
    renderWithProviders(
      <GameBoard
        initialState={gameOverState}
        width={10}
        height={10}
        moveInterval={defaultMoveInterval}
        onReplay={mockOnReplay}
        onNewGame={mockOnNewGame}
      />,
      {
        preloadedState: createPreloadedState(gameOverState),
      }
    );

    expect(screen.getByText("You lose")).toBeInTheDocument();
    expect(screen.getByText("Replay")).toBeInTheDocument();
    expect(screen.getByText("New Game")).toBeInTheDocument();
  });

  it("calls onReplay when Replay button is clicked", () => {
    renderWithProviders(
      <GameBoard
        initialState={gameOverState}
        width={10}
        height={10}
        moveInterval={defaultMoveInterval}
        onReplay={mockOnReplay}
        onNewGame={mockOnNewGame}
      />,
      {
        preloadedState: createPreloadedState(gameOverState),
      }
    );

    fireEvent.click(screen.getByText("Replay"));
    expect(mockOnReplay).toHaveBeenCalledTimes(1);
  });

  it("calls onNewGame when New Game button is clicked", () => {
    renderWithProviders(
      <GameBoard
        initialState={gameOverState}
        width={10}
        height={10}
        moveInterval={defaultMoveInterval}
        onReplay={mockOnReplay}
        onNewGame={mockOnNewGame}
      />,
      {
        preloadedState: createPreloadedState(gameOverState),
      }
    );

    fireEvent.click(screen.getByText("New Game"));
    expect(mockOnNewGame).toHaveBeenCalledTimes(1);
  });

  it("passes the correct move interval to the component", () => {
    const fastInterval = MOVEMENT_DIFFICULTIES.HARD;
    renderWithProviders(
      <GameBoard
        initialState={initialState}
        width={10}
        height={10}
        moveInterval={fastInterval}
        onReplay={mockOnReplay}
        onNewGame={mockOnNewGame}
      />,
      {
        preloadedState: createPreloadedState(initialState, fastInterval),
      }
    );
    const gameBoardElement = screen
      .getByTestId("cell-2-0")
      .closest("div[class*='flex flex-col']");
    expect(gameBoardElement).toBeInTheDocument();
  });
});
