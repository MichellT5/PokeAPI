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
                <div class="flex justify-center gap-1 mt-2">
                    <button
                        class="flex items-center justify-center rounded bordered w-10 h-10 p-1"
                        :class="[page === currentPage ? 'bg-blue-700 text-white' : 'bg-zinc-200 text-black']"
                        @click="page != currentPage ? fetchPokemon(page) : null"
                        v-for="page in listPages" :key="page">{{ page }}</button>
                </div>
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

const fetchPokemon = async (page: number) => {
    fetching.value = true
    const data = await axios.get('https://pokeapi.co/api/v2/pokemon/', {
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