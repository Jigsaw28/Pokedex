import { createSlice } from '@reduxjs/toolkit'
import { getPokemonAPI } from './operations'

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getPokemonAPI.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.items.push(...action.payload)
      })
      .addCase(getPokemonAPI.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPokemonAPI.rejected, (state, action) => {
        state.isLoading = false
        if (action.payload && action.payload.aborted) {
          return
        }
        state.error = action.payload || action.error?.message
      }),
})
export const pokemonReducer = pokemonSlice.reducer
