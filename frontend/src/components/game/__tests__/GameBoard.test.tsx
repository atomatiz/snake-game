import { render, screen, fireEvent } from "@testing-library/react";
import { GameResponse } from "@/common/types/game.types";
import { GameBoard } from "../GameBoard";

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
  const mockSetGameState = jest.fn();
  const mockOnReplay = jest.fn();
  const mockOnNewGame = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the game board with snake and bait", () => {
    render(
      <GameBoard
        initialState={initialState}
        width={10}
        height={10}
        setGameState={mockSetGameState}
        onReplay={mockOnReplay}
        onNewGame={mockOnNewGame}
      />
    );

    const snakeCell = screen.getByTestId("cell-2-0");
    const baitCell = screen.getByTestId("cell-8-6");
    expect(snakeCell).toHaveClass("bg-green-500");
    expect(baitCell).toHaveClass("bg-red-500");
  });

  it("displays game over with Replay and New Game buttons", () => {
    render(
      <GameBoard
        initialState={gameOverState}
        width={10}
        height={10}
        setGameState={mockSetGameState}
        onReplay={mockOnReplay}
        onNewGame={mockOnNewGame}
      />
    );

    expect(screen.getByText("You lose")).toBeInTheDocument();
    expect(screen.getByText("Replay")).toBeInTheDocument();
    expect(screen.getByText("New Game")).toBeInTheDocument();
  });

  it("calls onReplay when Replay button is clicked", () => {
    render(
      <GameBoard
        initialState={gameOverState}
        width={10}
        height={10}
        setGameState={mockSetGameState}
        onReplay={mockOnReplay}
        onNewGame={mockOnNewGame}
      />
    );

    fireEvent.click(screen.getByText("Replay"));
    expect(mockOnReplay).toHaveBeenCalledTimes(1);
  });

  it("calls onNewGame when New Game button is clicked", () => {
    render(
      <GameBoard
        initialState={gameOverState}
        width={10}
        height={10}
        setGameState={mockSetGameState}
        onReplay={mockOnReplay}
        onNewGame={mockOnNewGame}
      />
    );

    fireEvent.click(screen.getByText("New Game"));
    expect(mockOnNewGame).toHaveBeenCalledTimes(1);
  });
});
