<template>
    <div class="bg-dark text-light">
        <div class="container">
            <h1>Pokedex</h1>
            <poke-search @search="search" />
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
                <div class="row" v-else-if="searchType == 'all' || searchType == 'type'">
                    <poke-card @open-modal="showPokeModal" v-for="pokemon in pokemonResult" :key="pokemon.name" :pokemon="pokemon"/>
                </div>
                <div class="row justify-content-center" v-else-if="searchType == 'name' || searchType == 'id'">
                    <poke-card @open-modal="showPokeModal" :pokeData="pokemonResult" />
                </div>
            </div>
        </div>
    </div>
    <template v-if="showModal">
        <poke-modal :pokemon="pokemonModal" @close-modal="closePokeModal" />
    </template>
</template>

<script>
import PokeCard from './components/PokeCard.vue';
import PokeSearch from './components/PokeSearch.vue';
import PokeModal from './components/PokeModal.vue';
export default {
    name: "Pokedex",
    components: {
        PokeCard,
        PokeSearch,
        PokeModal,
    },
    data() {
        return {
            loading: true,
            error: false,
            showModal: false,
            pokemonResult: null,
            searchType: null,
            pokemonModal: null,
        }
    },
    methods: {
        search(data) {
            this.showLoading();
            console.log(data.url);
            fetch(data.url)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                if (data.searchBy == 'all') {
                    this.pokemonResult = json.results;
                } else if (data.searchBy == 'name' || data.searchBy == 'id') {
                    this.pokemonResult = json;
                } else if (data.searchBy == 'type') {
                    let poke = json.pokemon.slice(0, data.limit).map(p => p = p.pokemon);
                    console.log(poke);
                    this.pokemonResult = poke;
                }
                this.searchType = data.searchBy;
                this.loading = false;
            })
            .catch(this.showError);
        },
        updateDataURL(data) {
            this.data.url = data.url;
            this.data.searchBy = data.searchBy;
            this.search();
        },
        showLoading() {
            this.showModal = false;
            this.loading = true;
            this.error = false;
        },
        showError(error = null) {
            this.error = true;
            this.loading = false;
            if (error) console.error(error);
        },
        showPokeModal(pokemon) {
            this.pokemonModal = pokemon;
            this.showModal = true;
        },
        closePokeModal() {
            this.showModal = false;
            this.PokeModal = null;
        },
    },
};
</script>