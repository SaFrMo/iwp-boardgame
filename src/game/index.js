import { INVALID_MOVE } from 'boardgame.io/core'

const game = {
    setup() {
        return {
            board: Array(9).fill('')
        }
    },
    moves: {
        markSquare(G, ctx, { index, mark }) {
            if (G.board[index]) {
                return INVALID_MOVE
            }
            G.board[index] = mark
        }
    },
    endIf(G, ctx) {
        // if any of these groups are all the same mark,
        // that mark wins
        const groups = [
            // rows
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            // columns
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            // diagonals
            [0, 4, 8],
            [2, 4, 6]
        ]

        const winner = groups.find(group => {
            return (
                group.every(idx => G.board[idx] === 'X') ||
                group.every(idx => G.board[idx] === 'O')
            )
        })
        if (winner) {
            // get the mark of the winning row
            const mark = G.board[winner[0]]

            return mark
        }

        if (G.board.every(val => val)) {
            return 'draw'
        }
    }
}

import { Client } from 'boardgame.io/client'
const client = new Client({ game })
client.start()

export default client
