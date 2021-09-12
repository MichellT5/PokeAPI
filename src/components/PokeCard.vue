<template>
    <div class="col-12 col-md-6 col-lg-4 col-xxl-3 px-2 my-2">
        <div class="card" :class="{loading: loading, error: error}" @click="sendOpenModal">
            <div class="card-body">
                <div class="pokemon-card d-flex">
                    <div class="poke-img">
                        <img v-if="!imageLoaded" src="../assets/ditto-sprite.png" >
                        <img v-show="imageLoaded" @load="swapImage" ref="image">
                    </div>
                    <div class="poke-info">
                        <h4 class="poke-name" v-if="pokeInfo">{{ pokeInfo.species.name }}</h4>
                        <div class="type-list" >
                            <div v-if="loading">Loading types...</div>
                            <div v-else-if="error">
                                <p>There was an error with your request...</p>
                                <button class="btn btn-primary" @click="fetchInfo()">Reload...</button>
                            </div>
                            <span v-else v-for="type in pokeInfo.types" :key="type.slot" class="type" :class="['type-'+type.type.name]">{{ type.type.name }}</span>
                        </div>
                    </div>
                    <span class="poke-id" v-if="pokeInfo">#{{ pokeInfo.id }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PokeCard",
    emits: ['openModal'],
    props: {
        pokemon: {
            type: Object,
            default: () => { return {}; },
        },
        pokeData: {
            type: Object,
            default: () => { return {}; },
        }
    },
    data() {
        return {
            loading: true,
            error: false,
            pokeInfo: null,
            imageLoaded: false,
        };
    },
    methods: {
        showLoading() {
            this.loading = true;
            this.error = false;
        },
        showError(error) {
            this.error = true;
            this.loading = false;
            if (error) console.error(error);
        },
        swapImage() {
            this.imageLoaded = true;
            this.loading = false;
        },
        fetchInfo() {
            this.showLoading();
            fetch(this.pokemon.url)
            .then(result => result.json())
            .then(this.showPokemonInfo)
            .catch(this.showError);
        },
        showPokemonInfo(pokemonInfo) {
            this.$refs['image'].src = pokemonInfo.sprites.front_default;
            this.pokeInfo = pokemonInfo;
        },
        sendOpenModal() {
            if (this.imageLoaded) {
                this.$emit('openModal', this.pokeInfo);
            }
        },
    },
    mounted: function() {
        if (this.pokeData.name) this.showPokemonInfo(this.pokeData);
        else this.fetchInfo();
    },
};
</script>
<style scope lang="scss">
.card {
    color: #1d1d1d;
    height: 100%;
    cursor: pointer;
    &.loading { background: #b9b9ff; cursor: initial; }
    &.error { background: #ffa9a9; cursor: initial; }
}
</style>
