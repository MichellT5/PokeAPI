import axios from 'axios'
import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { Pokemon } from '../types';

export const fromAPItoPokemon = (obj: any): Pokemon => {
    return (({id, name, height, weight, sprites, types}) => ({id, name, height, weight, sprites, types}))(obj)
}

export const pokemonStoreDefinition = defineStore('pokemon', () => {
    const pokemon: Ref<Pokemon[]> = ref([])

    const getPokemonByName = async (name: string): Promise<Pokemon | undefined> => {
        const poke = pokemon.value.find(p => p.name === name)
        if (poke) return poke

        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                .then(res => fromAPItoPokemon(res.data))

            pokemon.value.push(response);

            return response;
        } catch (e) {
            return
        }
    }

    return { pokemon, getPokemonByName }
});

export default pokemonStoreDefinition