import { Client } from 'boardgame.io/client'

const game = {
    setup() {},
    moves: {}
}

const client = new Client({ game })
client.start()

export default client
