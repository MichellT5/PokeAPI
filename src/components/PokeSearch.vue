<template>
    <div class="pokemon-form mb-3">
        <div class="form-inline row">
            <div class="col-12 col-md-auto align-self-center">
                <span>Search By: </span>
                <div class="form-check form-check-inline">
                    <input type="radio" name="searchBy" id="type" value="type" v-model="searchBy">
                    <label for="type">Type</label>
                </div>
                <div class="form-check form-check-inline">
                    <input type="radio" name="searchBy" id="name" value="name" v-model="searchBy">
                    <label for="name">Name</label>
                </div>
                <div class="form-check form-check-inline">
                    <input type="radio" name="searchBy" id="id" value="id" v-model="searchBy">
                    <label for="id">ID</label>
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-3 mb-1" v-if="searchBy == 'type'">
                <div class="form-floating">
                    <select name="types" id="types" class="form-select" v-model="type">
                        <option value="normal">Normal</option>
                        <option value="fighting">Fighting</option>
                        <option value="flying">Flying</option>
                        <option value="poison">Poison</option>
                        <option value="ground">Ground</option>
                        <option value="rock">Rock</option>
                        <option value="bug">Bug</option>
                        <option value="ghost">Ghost</option>
                        <option value="steel">Steel</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="grass">Grass</option>
                        <option value="electric">Electric</option>
                        <option value="psychic">Psychic</option>
                        <option value="ice">Ice</option>
                        <option value="dragon">Dragon</option>
                        <option value="dark">Dark</option>
                        <option value="fairy">Fairy</option>
                    </select>
                    <label for="types">Type</label>
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-3 mb-1" v-if="searchBy == 'name' || searchBy == 'id'">
                <div class="form-floating">
                    <input v-model="name" type="text" name="name" id="name" placeholder="Bulbasaur, 100" class="form-control">
                    <label for="name" v-if="searchBy == 'name'">Pokemon Name</label>
                    <label for="name" v-if="searchBy == 'id'">Pokemon ID</label>
                </div>
            </div>
            <div class="col-12 col-md-auto" v-if="searchBy == 'type'">
                <div class="form-floating">
                    <select v-model="show" name="show" id="show" class="form-select">
                        <option value="10">10 Pokemon</option>
                        <option value="20">20 Pokemon</option>
                        <option value="50">50 Pokemon</option>
                        <option value="100">100 Pokemon</option>
                        <!-- <option value="-1">All Pokemon</option> -->
                    </select>
                    <label for="show">Show</label>
                </div>
            </div>
            <div class="col-auto ml-auto ml-md-0 align-self-center">
                <button class="btn btn-lg btn-primary" @click="updateSearch">Search</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    data() {
        return {
            searchBy: 'name',
            type: 'normal',
            name: '',
            show: '10',
        };
    },
    emits: ['search'],
    methods: {
        updateSearch() {
            if (this.name.trim() == "" && this.searchBy != 'type') this.searchMany();
            else {
                let base = "https://pokeapi.co/api/v2/",
                    link = '',
                    limit = this.show > 0 ? '?limit=' + this.show : '';
                    if (this.searchBy == 'type') {
                        link = `${base}type/${this.type}/${limit}`
                    } else if (this.searchBy == 'name') {
                        link = `${base}pokemon/${this.name.toLowerCase().trim()}`;
                    } else if (this.searchBy == 'id') {
                        link = `${base}pokemon/${this.name.trim()}`;
                    }
                this.$emit('search', {
                    url: link,
                    limit: this.show,
                    searchBy: this.searchBy,
                })
            }
        },
        searchMany() {
            this.$emit('search', {
                url: 'https://pokeapi.co/api/v2/pokemon?limit=50',
                searchBy: 'all',
            });
        }
    },
    mounted() {
        this.searchMany();
    }
}
</script>