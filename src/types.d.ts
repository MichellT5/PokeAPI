export interface PokeSearchResult {
    name:   string,
    url:    string,
}

export interface Pokemon {
    id:                 number,
    name:               string,
    height:             number,
    weight:             number,
    abilities:          PokemonAbilityInfo[]
    sprites:            PokemonSpritesCollection,
    stats:              PokemonStatInfo[]
    types:              PokemonTypeInfo[]
}

interface PokemonAbilityInfo {
    is_hidden:      boolean,
    slot:           number,
    ability:        PokemonAbility,
}

interface PokemonAbility extends PokeSearchResult {}

interface PokemonStatInfo {
    base_stat:      number,
    effort:         number,
    stat:           PokemonStat,
}

interface PokemonStat extends PokeSearchResult {}

interface PokemonTypeInfo {
    slot:   number,
    type:   PokemonType,
}

interface PokemonType extends PokeSearchResult {}

interface PokemonSpritesCollection extends PokemonSpritesGeneric {
    other: {
        dream_world:        PokemonSpritesDreamWorld,
        home:               PokemonSpritesHome,
        'oficial-artwork':  PokemonSpritesOfficial,
        showdown:           PokemonSpritesShowdown,
    }
}

interface PokemonSpritesDreamWorld {
    front_default:          string,
    front_female?:          string,
}

interface PokemonSpritesHome {
    front_default:          string,
    front_female?:          string,
    front_shiny:            string,
    front_shiny_female?:    string,
}

interface PokemonSpritesOfficial {
    front_default:          string,
    front_shiny:            string,
}

interface PokemonSpritesShowdown extends PokemonSpritesGeneric {}

interface PokemonSpritesGeneric {
    front_default:          string,
    front_shiny:            string,
    back_default:           string,
    back_shiny:             string,
    front_female?:          string,
    front_shiny_female?:    string,
    back_female?:           string,
    back_shiny_female?:     string,
}