import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import GameBoard from "./GameBoard";

describe("GameBoard Component", () => {
  const renderGame = () => {
    const utils = render(<GameBoard />);

    const getCells = () =>
      utils.container.querySelectorAll(".board-main button");

    const clickCell = (index) => {
      fireEvent.click(getCells()[index]);
    };

    return { ...utils, getCells, clickCell };
  };

  test("renders the game board with 9 cells", () => {
    const { getCells } = renderGame();

    expect(
      screen.getByRole("heading", { name: "Tic Tac Toe" })
    ).toBeInTheDocument();

    expect(getCells()).toHaveLength(9);
    expect(screen.getByText("Player X's turn")).toBeInTheDocument();
  });

  test("allows X and O to take turns", () => {
    const { getCells, clickCell } = renderGame();

    clickCell(0);
    expect(getCells()[0]).toHaveTextContent("X");
    expect(screen.getByText("Player O's turn")).toBeInTheDocument();

    clickCell(1);
    expect(getCells()[1]).toHaveTextContent("O");
    expect(screen.getByText("Player X's turn")).toBeInTheDocument();
  });

  test("prevents selecting an occupied cell", () => {
    const { getCells, clickCell } = renderGame();

    clickCell(0);
    clickCell(0);

    expect(getCells()[0]).toHaveTextContent("X");
    expect(getCells()[1]).toHaveTextContent("");
    expect(screen.getByText("Player O's turn")).toBeInTheDocument();
  });

  test("detects an X win and highlights the winning cells", () => {
    const { getCells, clickCell } = renderGame();

    [0, 3, 1, 4, 2].forEach(clickCell);

    expect(screen.getByText("Player X wins")).toBeInTheDocument();

    [0, 1, 2].forEach((index) => {
      expect(getCells()[index]).toHaveClass("winCell");
    });

    getCells().forEach((cell) => expect(cell).toBeDisabled());
  });

  test("detects an O win", () => {
    const { clickCell } = renderGame();

    [0, 3, 1, 4, 8, 5].forEach(clickCell);

    expect(screen.getByText("Player O wins")).toBeInTheDocument();
  });

  test("detects a draw when all cells are filled", () => {
    const { getCells, clickCell } = renderGame();

    [0, 1, 2, 4, 3, 5, 7, 6, 8].forEach(clickCell);

    expect(screen.getByText("It's a draw")).toBeInTheDocument();
    getCells().forEach((cell) => expect(cell).toBeDisabled());
  });

  test("resets the board and starts again with X", () => {
    const { getCells, clickCell } = renderGame();

    clickCell(0);
    clickCell(1);

    fireEvent.click(
      screen.getByRole("button", { name: "Reset Game!" })
    );

    expect(screen.getByText("Player X's turn")).toBeInTheDocument();

    getCells().forEach((cell) => {
      expect(cell).toHaveTextContent("");
      expect(cell).toBeEnabled();
      expect(cell).not.toHaveClass("winCell");
    });
  });

  test("clears the winning result after reset", () => {
    const { getCells, clickCell } = renderGame();

    [0, 3, 1, 4, 2].forEach(clickCell);

    expect(screen.getByText("Player X wins")).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "Reset Game!" })
    );

    expect(screen.getByText("Player X's turn")).toBeInTheDocument();
    expect(screen.queryByText("Player X wins")).not.toBeInTheDocument();
    expect(getCells().length).toBe(9);

    getCells().forEach((cell) => {
      expect(cell).not.toHaveClass("winCell");
    });
  });
});