export interface Pokemon {
  id: number
  name: string
  image_url: string
  pokedex_number: number
  types: Type[]
}

export interface Type {
  id: number
  name: string
  pokemons: Pokemon[]
}