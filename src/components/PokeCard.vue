<template>
    <div class="rounded border p-3 bg-white text-black">
        <div class="flex">
            <div class="grow">
                {{ localPoke?.name ?? poke.name }}
            </div>
            <div class="flex-none rounded-full max-w-[12rem] bg-zinc-200">
                <!-- <img v-show="!imageLoaded" src="../assets/ditto-sprite.png" alt="Ditto">
                <template v-if="localPoke">
                    <img v-show="imageLoaded" :src="localPoke.sprites.front_default" :alt="localPoke.name"
                        @load="imageLoaded = true">
                </template> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PokeSearchResult, Pokemon } from '../types'
import { usePokemonStore } from '../stores/pokemon'
import { ref, onBeforeMount } from 'vue'
const pokeStore = usePokemonStore()

const { poke } = defineProps<{ poke: PokeSearchResult }>()
const localPoke = ref<Pokemon>()
const imageLoaded = ref(false)

onBeforeMount(async () => {
    localPoke.value = await pokeStore.fetchPokemon(poke.name)
})
</script>