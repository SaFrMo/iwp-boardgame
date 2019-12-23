<template>
    <div id="app">
        <h2>{{ G }}</h2>
    </div>
</template>

<script>
import client from './game'
export default {
    name: 'app',
    data() {
        return {
            gameState: {}
        }
    },
    computed: {
        G() {
            return this.gameState.G
        },
        ctx() {
            return this.gameState.ctx
        }
    },
    mounted() {
        setInterval(() => {
            this.gameState = { ...client.store.getState() }
        }, 150)
    }
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
