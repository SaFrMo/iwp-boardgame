<template>
    <div id="app">
        <!-- Main toggle -->
        <button @click="showView = !showView">
            {{ showView ? 'Hide' : 'Show' }} View
        </button>

        <!-- Game view -->
        <section class="game-view" v-if="G && showView">
            <ul class="board">
                <li v-for="(cell, i) in G.board" :key="i" class="cell">
                    <span v-if="cell">{{ cell }}</span>
                    <button class="claim" v-else @click="markSquare(i)">
                        &nbsp;
                    </button>
                </li>
            </ul>
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
            client.moves.markSquare({ index, mark: 'X' })
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

        --side: 100px;
        grid-template-columns: repeat(3, var(--side));
        grid-template-rows: repeat(3, var(--side));

        .cell {
            display: grid;
            align-items: center;
            text-align: center;

            .claim {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
