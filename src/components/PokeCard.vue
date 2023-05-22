<template>
    <div class="relative rounded bg-zinc-200 p-3 text-black">
        <span class="absolute bottom-1 right-2" v-if="pokemonData">#{{ pokemonData.id.toString().padStart(3, '0') }}</span>
        <div class="flex items-start gap-2">
            <img class="flex-none rounded-full bg-white" v-if="!imageLoaded" src="../assets/ditto-sprite.png" :alt="name">
            <img class="flex-none rounded-full bg-white p-3" v-if="pokemonData" v-show="imageLoaded"
                :src="pokemonData.sprites.front_default" @load="imageLoaded = true" :alt="name">
            <div class="flex-1">
                <h3 class="text-xl">{{ name }}</h3>
                <template v-if="loading">
                    <i class="fa-solid fa-spin fa-spinner"></i>
                    <span class="text-sm">Loading Info</span>
                </template>
                <div v-else-if="pokemonData?.types" class="flex flex-wrap mt-5 gap-2">
                    <span class="drop-shadow-md rounded-full w-[10ch] uppercase font-mono text-center text-white"
                        :class="[`bg-${type.name}`]" v-for="{ type } in pokemonData.types" :key="type.name">
                        {{ type.name }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType, Ref, computed, onBeforeMount, ref } from 'vue';
import { PokeSearchResult, Pokemon } from '../types';
import pokemonStoreDefinition from '../store/pokemon';

const pokemonData: Ref<Pokemon | undefined> = ref()
const pokemonStore = pokemonStoreDefinition()
const loading = ref(false)
const imageLoaded = ref(false)

const props = defineProps({
    pokemon: Object as PropType<PokeSearchResult>
})

const name = computed(() => props.pokemon?.name
    ? props.pokemon?.name[0].toLocaleUpperCase() + props.pokemon?.name.slice(1)
    : undefined)

onBeforeMount(async () => {
    loading.value = true;
    const name = props.pokemon?.name
    if (name) {
        const poke = await pokemonStore.getPokemonByName(name)
        if (poke) pokemonData.value = poke;
    }
    loading.value = false;
})
</script>