<template>
    <div class="rounded border p-3 bg-white text-black">
        <div class="flex items-start">
            <div class="grid gap-2 grow">
                {{ localPoke?.name ?? poke.name }}
                <div class="relative font-mono">
                    <Transition name="fade">
                        <div v-if="!infoLoaded"
                            class="transition duration-500 rounded-full w-24 bg-zinc-900 text-white text-center">
                            ???
                        </div>
                        <div v-else class="transition duration-500 flex flex-wrap gap-2">
                            <div v-for="_type in localPoke?.types" :key="_type.slot"
                                class="rounded-full w-24 bg-[--color] text-white text-center"
                                :style="['--color: var(--type-' + _type.type.name + ')']">
                                {{ _type.type.name }}
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
            <div class="relative flex-none rounded-full max-w-[12rem] bg-zinc-200">
                <Transition name="fade">
                    <img v-if="!localPoke || !imageLoaded" class="transition duration-500" src="../assets/ditto-sprite.png"
                        alt="Ditto">
                    <img v-else class="transition duration-500" :src="localPoke.sprites.front_default"
                        :alt="localPoke.name">
                </Transition>
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
const infoLoaded = ref(false)

onBeforeMount(async () => {
    localPoke.value = await pokeStore.fetchPokemon(poke.name)
    const img = document.createElement('img')
    img.addEventListener('load', () => infoLoaded.value = imageLoaded.value = true)
    img.addEventListener('error', () => infoLoaded.value = true)
    img.src = localPoke.value?.sprites.front_default || ''
})
</script>

<style>
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active {
    position: absolute;
    top: 0;
    left: 0;
}
</style>