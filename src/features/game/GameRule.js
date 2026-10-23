import { GAME_RULE_TEMPLATE } from "./GameRuleTemplate";

export default function GameRule(board) {
    for(const rules of GAME_RULE_TEMPLATE) {
        const [a, b, c] = rules;

        if(board[a] && board[a] === board[b] && board[b] === board[c]) {
            return {
                result: board[a],
                resultCells: rules,
            }
        }
    }

    return null;
}