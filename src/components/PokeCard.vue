<template>
    <div class="rounded border p-3 bg-white text-black">
        <div class="flex items-start">
            <div class="grid gap-2 grow">
                {{ localPoke?.name ?? poke.name }}
                <div class="flex flex-wrap gap-2 font-mono">
                    <div v-if="!imageLoaded" class="rounded-full w-24 bg-zinc-900 text-white text-center">
                        ???
                    </div>
                    <template v-else>
                        <div v-for="_type in localPoke?.types" :key="_type.slot"
                            class="rounded-full w-24 bg-[--color] text-white text-center"
                            :style="['--color: var(--type-' + _type.type.name + ')']">
                            {{ _type.type.name }}
                        </div>
                    </template>
                </div>
            </div>
            <div class="flex-none rounded-full max-w-[12rem] bg-zinc-200">
                <img v-show="!imageLoaded" src="../assets/ditto-sprite.png" alt="Ditto">
                <template v-if="localPoke">
                    <img v-show="imageLoaded" :src="localPoke.sprites.front_default" :alt="localPoke.name"
                        @load="delay">
                </template>
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

const delay = async () => {
    await (new Promise(res => setTimeout(res, Math.random() * 1000)))
    imageLoaded.value = true
}

onBeforeMount(async () => {
    localPoke.value = await pokeStore.fetchPokemon(poke.name)
})
</script>