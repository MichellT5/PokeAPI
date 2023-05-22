<template>
    <div class="min-w-screen min-h-screen py-10 px-5 dark:bg-zinc-900 dark:text-white">
        <div class="2xl:container 2xl:mx-auto">
            <h1 class="text-5xl">Pokedex</h1>
            <select class="text-black" v-model="limit" @change="limitChanged">
                <option v-for="val in limitValues" :key="val" :value="val">{{ val }} Pokemon</option>
            </select>
            <hr>
            <h6 class="text-md">Pokemon List</h6>
            <template v-if="!fetching">
                <ul class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <PokeCard v-for="poke in results" :key="poke.name" :pokemon="poke" />
                </ul>
                <template v-if="listPages">
                    <div class="flex justify-center gap-1 mt-2">
                        <button
                            class="flex items-center justify-center rounded bordered w-10 h-10 bg-zinc-200 p-1 text-black"
                            :class="[currentPage === 1 ? 'cursor-not-allowed' : '']"
                            @click="currentPage > 1 ? fetchPokemon(currentPage - 1) : null">
                            <i class="fa fa-caret-left"></i>
                        </button>
                        <span
                            class="flex items-center justify-center rounded bordered w-fit h-10 bg-blue-700 p-1 px-3 text-white">
                            {{ currentPage }} of {{ pages }}
                        </span>
                        <button
                            class="flex items-center justify-center rounded bordered w-10 h-10 bg-zinc-200 p-1 text-black"
                            :class="[currentPage === pages ? 'cursor-not-allowed' : '']"
                            @click="currentPage < pages ? fetchPokemon(currentPage + 1) : null">
                            <i class="fa fa-caret-right"></i>
                        </button>
                    </div>
                    <div class="flex items-center justify-center gap-2 mt-2">
                        Go to page #
                        <input class="self-stretch w-[7ch] p-2 text-black" type="number" :min="1" :max="pages"
                            v-model="searchPage" @keyup.enter="searchPageFunc">
                        <button
                            class="flex items-center justify-center rounded bordered w-10 h-10 bg-zinc-200 p-1 text-black"
                            @click="searchPageFunc">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </template>
            </template>
            <span v-else>Loading...</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { PokeSearchResult } from './types'
import PokeCard from './components/PokeCard.vue';
const limitValues = [12, 24, 36]

const pages = ref(0)
const currentPage = ref(1)
const searchPage = ref(currentPage.value)
const limit = ref(limitValues[0])
const fetching = ref(false)
const results = ref([] as PokeSearchResult[])

const listPages = computed(() => {
    const num = 3,
        left = currentPage.value - num < 1 ? 1 : currentPage.value - num,
        rigth = currentPage.value + num > pages.value ? pages.value : currentPage.value + num

    console.log(left, rigth)
    if (left < rigth) return [...(new Array(rigth - left + 1))].map((_e, i) => left + i)
})

const limitChanged = () => {
    pages.value = 0
    fetchPokemon(1)
}

const searchPageFunc = async () => {
    if (searchPage.value >= 1 && searchPage.value <= pages.value) {
        await fetchPokemon(searchPage.value)
        searchPage.value = currentPage.value
    }
}

const fetchPokemon = async (page: number) => {
    fetching.value = true
    const data = await axios.get('https://pokeapi.co/api/v2/pokemon-species/', {
        params: {
            limit: limit.value,
            offset: (page - 1) * limit.value
        }
    }).then(res => res.data);

    if (data) {
        results.value = data.results as PokeSearchResult[]
        currentPage.value = page
        if (!pages.value) pages.value = Math.ceil(data.count / limit.value)
    }
    fetching.value = false
}

onMounted(() => {
    fetchPokemon(1)
})
</script>