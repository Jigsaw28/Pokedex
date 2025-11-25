import { createSlice } from '@reduxjs/toolkit'
import { getPokemonAPI } from './operations'

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    offset: 0,
  },
  reducers: {
    increaseOffset(state) {
      state.offset += 20
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getPokemonAPI.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.items= [...state.items, ...action.payload]
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

export const { increaseOffset } = pokemonSlice.actions;
export const pokemonReducer = pokemonSlice.reducer
