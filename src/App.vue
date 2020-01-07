<template>
    <div id="app">
        <!-- Main toggle -->
        <button @click="showView = !showView">
            {{ showView ? 'Hide' : 'Show' }} View
        </button>

        <!-- Game view -->
        <section class="game-view" v-if="G && showView">
            <!-- Board -->
            <ul class="board">
                <!-- Each square on the board -->
                <li v-for="(square, i) in G.board" :key="i" class="square">
                    <!-- X or O, if present -->
                    <span v-if="square">{{ square }}</span>

                    <!-- Button allowing player to claim space -->
                    <button class="mark-square" v-else @click="markSquare(i)">
                        &nbsp;
                    </button>
                </li>
            </ul>

            <!-- Game over state -->
            <h2 v-if="fullGame && ctx.gameover">
                <span>Game over: </span>
                <span v-if="ctx.gameover.draw">Draw!</span>
                <span v-else>Winner: {{ ctx.gameover.mark }}</span>
            </h2>

            <button v-if="!fullGame" @click="fullGame = true">
                Final version
            </button>
        </section>
    </div>
</template>

<script>
import Vue from 'vue'
import client from './game'
import { cloneDeep } from './utils'

export default {
    data() {
        return {
            showView: false,
            fullGame: false,
            G: null,
            ctx: null
        }
    },
    mounted() {
        client.subscribe(this.update)
    },
    methods: {
        update({ G, ctx }) {
            Vue.set(this, 'G', cloneDeep(G))
            Vue.set(this, 'ctx', cloneDeep(ctx))
        },
        markSquare(index) {
            if (!this.fullGame) {
                client.moves.markSquare({ index, mark: 'X' })
            } else {
                const mark = this.ctx.currentPlayer === '0' ? 'X' : 'O'
                client.moves.markSquare({ index, mark })
            }
        }
    }
}
</script>

<style lang="scss">
#app {
    button {
        cursor: pointer;
    }
    // Board
    .board {
        list-style: none;
        padding: 0;
        margin: 40px auto;
        display: grid;

        --side: 200px;
        grid-template-columns: repeat(3, var(--side));
        grid-template-rows: repeat(3, var(--side));

        .square {
            display: grid;
            align-items: center;
            text-align: center;

            .mark-square {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
