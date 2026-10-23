import GameRule from "./GameRule";
import { GAME_RULE_TEMPLATE } from "./GameRuleTemplate";

describe("GameRule", () => {
  test("returns null when the board is empty", () => {
    const board = Array(9).fill(null);

    expect(GameRule(board)).toBeNull();
  });

  test("returns null when there is no winning combination", () => {
    const board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];

    expect(GameRule(board)).toBeNull();
  });

  test("detects a winning row for X", () => {
    const board = ["X", "X", "X", "O", "O", null, null, null, null];

    expect(GameRule(board)).toEqual({
      result: "X",
      resultCells: [0, 1, 2],
    });
  });

  test("detects a winning column for O", () => {
    const board = ["O", "X", null, "O", "X", null, "O", null, "X"];

    expect(GameRule(board)).toEqual({
      result: "O",
      resultCells: [0, 3, 6],
    });
  });

  test("detects a diagonal win for X", () => {
    const board = ["X", "O", null, "O", "X", null, null, null, "X"];

    expect(GameRule(board)).toEqual({
      result: "X",
      resultCells: [0, 4, 8],
    });
  });

  test("returns the winning cells from GAME_RULE_TEMPLATE", () => {
    const board = ["O", "X", "X", null, "O", "X", null, null, "O"];

    const expectedWinningRule = GAME_RULE_TEMPLATE.find(
      ([a, b, c]) =>
        board[a] === "O" &&
        board[a] === board[b] &&
        board[b] === board[c]
    );

    expect(GameRule(board)).toEqual({
      result: "O",
      resultCells: expectedWinningRule,
    });
  });

  test("does not detect a win when only two matching cells exist", () => {
    const board = ["X", "X", null, "O", null, null, null, null, null];

    expect(GameRule(board)).toBeNull();
  });

  test("returns the first winning combination when multiple wins exist", () => {
    const board = ["X", "X", "X", "O", "O", "O", "X", null, null];

    const expectedRule = GAME_RULE_TEMPLATE.find(
      ([a, b, c]) =>
        board[a] &&
        board[a] === board[b] &&
        board[b] === board[c]
    );

    expect(GameRule(board)).toEqual({
      result: board[expectedRule[0]],
      resultCells: expectedRule,
    });
  });
});