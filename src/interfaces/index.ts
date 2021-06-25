export interface Pokemon {
  id: number
  name: string
  image_url: string
  pokedex_number: number
  types: Type[]
  games: Game[]
}

export interface Type {
  id: number
  name: string
  pokemons: Pokemon[]
  double_damage_to: Type[]
  double_damage_from: Type[]
  half_damage_to: Type[]
  half_damage_from: Type[]
  no_damage_to: Type[]
  no_damage_from: Type[]
  games: Game[]
}

export interface Game {
  id: number
  generation: number
  name: string
  regions: Region[]
  pokemons: Pokemon[]
  types: Type[]
}

export interface Region {
  id: number
  games: Game[]
}
