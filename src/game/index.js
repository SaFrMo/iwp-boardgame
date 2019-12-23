const game = {
    setup() {
        return {
            board: Array(9).fill('')
        }
    },
    moves: {}
}

import { Client } from 'boardgame.io/client'

const client = new Client({ game })
client.start()

export default client
