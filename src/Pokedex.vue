<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <div class="bg-dark text-light">
        <div class="container">
            <h1>Pokedex</h1>
            <poke-search @perform-search="updateDataURL" />
            <div class="pokemon-list">
                <div class="loading-gif" v-if="loading">
                    <img src="./assets/loading.gif" alt="Pokeball Loading...">
                    <h3 class="loading-text">Loading...</h3>
                </div>
                <div class="card" v-else-if="error">
                    <div class="card-header text-center">
                        <h2>Error</h2>
                    </div>
                    <div class="card-body">
                        <div class="text-center text-danger">The search didn't produce any result.</div>
                    </div>
                </div>
                <div class="row" v-else-if="Array.isArray(pokemonResult)">
                    <poke-card v-for="pokemon in pokemonResult" :key="pokemon.name" :pokemon="pokemon"/>
                </div>
                <div class="row justify-content-center" v-else-if="pokemonResult">
                    <poke-card :pokeInfo="pokemonResult" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PokeCard from './components/PokeCard.vue';
import PokeSearch from './components/PokeSearch.vue';
export default {
    name: "Pokedex",
    components: {
        PokeCard,
        PokeSearch,
    },
    data() {
        return {
            loading: true,
            error: false,
            pokemonResult: null,
            data: {},
            url: '',
        }
    },
    methods: {
        search() {
            this.showLoading();
            console.log(this.data.url);
            fetch(this.data.url)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                this.loading = false;
                this.pokemonResult = json.results || json;
            })
            .catch(this.showError);
        },
        updateDataURL(data) {
            this.data.url = data.url;
            this.data.searchBy = data.searchBy;
            this.search();
        },
        showLoading() {
            this.loading = true;
            this.error = false;
        },
        showError(error = null) {
            this.error = true;
            this.loading = false;
            if (error) console.error(error);
        }
    },
    mounted: function() {
    }
};
</script>