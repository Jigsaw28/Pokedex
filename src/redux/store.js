import { configureStore } from '@reduxjs/toolkit'
import { pokemonReducer } from './pokemonSlice'
import { sortReducer } from './sortSlice'

export const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
    sortPokemons: sortReducer,
  },
})
