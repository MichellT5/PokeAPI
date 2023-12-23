import { reactive } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'

export const PokemonTypes = Object.freeze({
  Bug: 'Bug',
  Dark: 'Dark',
  Dragon: 'Dragon',
  Electric: 'Electric',
  Fairy: 'Fairy',
  Fighting: 'Fighting',
  Fire: 'Fire',
  Flying: 'Flying',
  Ghost: 'Ghost',
  Ground: 'Ground',
  Ice: 'Ice',
  Normal: 'Normal',
  Plant: 'Plant',
  Psychic: 'Psychic',
  Rock: 'Rock',
  Steel: 'Steel',
  Water: 'Water'
})

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonList = reactive([])

  const fetchPokemon = async (name: string): Pokemon => {
    let poke = pokemonList.find((p) => p.name === name)
    if (!poke) {
      const result = await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((r) => r.data)
      poke = (({ abilities, height, id, name, sprites, stats, types, weight }) => ({
        abilities,
        height,
        id,
        name,
        sprites,
        stats,
        types,
        weight
      }))(result)
      pokemonList.push(poke)
    }

    return poke
  }

  const fetchAllPokemon = async (data: { page?: number; limit?: number }): PokeSearchResult[] => {
    const { page, limit } = { ...{ page: 1, limit: 15 }, ...data }
    const pokemon = await axios
      .get('https://pokeapi.co/api/v2/pokemon-species/', {
        params: {
          limit,
          offset: (page - 1) * limit
        }
      })
      .then((res) => res.data)

    return pokemon.results
  }

  return { pokemonList, fetchPokemon, fetchAllPokemon }
})
