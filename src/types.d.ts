import { PokemonTypes } from "./enums"

export interface PokeSearchResult {
    name:   string,
    url:    string,
}

export interface Pokemon {
    id:                 number,
    name:               string,
    height:             number,
    weight:             number,
    // abilities: 
    sprites:            PokemonSprites,
    // stats: 
    types: {
        slot: number,
        type: {
            name: PokemonTypes,
            url: string,
        }
    }[]
}

export interface PokemonSprites {
    front_default:          string
    front_shiny:            string
    front_female:           string | undefined
    front_shiny_female:     string | undefined
    back_default:           string
    back_shiny:             string
    back_female:            string | undefined
    back_shiny_female:      string | undefined
}