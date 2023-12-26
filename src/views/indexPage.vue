<template>
  <div class="min-w-screen min-h-screen py-10 px-5 dark:bg-zinc-900 dark:text-white">
    <div class="grid gap-5 2xl:container 2xl:mx-auto">
      <h1 class="text-3xl">Pokedex</h1>
      <div class="grid gap-3 lg:grid-cols-5 capitalize">
        <pokeCard v-for="p in poke" :key="p.name" :poke="p" />
      </div>
      <paginationIndex v-if="total > 0" :key="JSON.stringify(pagination)" :data="pagination" />
      <!-- <select class="text-black" v-model="limit" @change="limitChanged">
        <option v-for="val in limitValues" :key="val" :value="val">{{ val }} Pokemon</option>
      </select> -->
      <!-- <template v-if="!fetching">
        <ul class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <PokeCard v-for="poke in results" :key="poke.name" :pokemon="poke" />
        </ul>
      </template> -->
      <!-- <span v-else>Loading...</span> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, computed, ref, watchEffect } from 'vue'
import { usePokemonStore } from '../stores/pokemon'
import { PokeSearchResult } from '../types'
import pokeCard from '../components/pokeCard.vue'
import paginationIndex, { PaginationData } from '../components/paginationIndex.vue'
import { useRouter } from 'vue-router'
interface fetchParams { page?: number, limit?: number }

/* Data */
const router = useRouter()
const total = ref(0)
const poke = reactive<PokeSearchResult[]>([])
const pagination = computed((): PaginationData => {
  const { limit, page } = router.currentRoute.value.query
  return { limit: +(limit ?? 30), page: +(page ?? 1), total: total.value || 0 }
})
/* Methods */
const fetch = async (data: fetchParams) => {
  const { page, limit } = data;
  const { pokemon, total: t } = await usePokemonStore().fetchAllPokemon({ page, limit })
  total.value = t
  poke.length = 0
  poke.push(...pokemon)
}

/* Hooks */
watchEffect(() => {
  const data = { page: 1, limit: 30, ...router.currentRoute.value.query }
  fetch(data);
});
</script>