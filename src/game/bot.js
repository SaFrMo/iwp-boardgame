const ai = {
    enumerate(G, ctx) {
        const moves = []

        G.board.forEach((square, i) => {
            if (square === '') {
                moves.push({
                    move: 'markSquare',
                    args: {
                        index: i,
                        mark: ctx.currentPlayer === '0' ? 'X' : 'O'
                    }
                })
            }
        })

        return moves
    }
}

export { ai }
