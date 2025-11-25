//https://pokeapi.co/api/v2/{endpoint}/

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getPokemonAPI = createAsyncThunk(
  'pokemon/getAllPokemons',
  async (offset, thunkAPI) => {
    try {
      const {
        data: { results },
      } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`,
        {
          signal: thunkAPI.signal,
        }
      )
      const infoPromise = Promise.all(
        results.map(async (pokemon) => {
          const { data } = await axios.get(pokemon.url, {
            signal: thunkAPI.signal,
          })

          return {
            id: data.id,
            name: data.name,
            types: data.types.map((item) => item.type.name),
            sprite:
              data.sprites?.other?.['official-artwork']?.front_default ||
              data.sprites?.other?.dream_world?.front_default ||
              data.sprites?.front_default,
          }
        })
      )
      const detailsPokemon = await infoPromise
      return detailsPokemon
    } catch (e) {
      if (thunkAPI.signal.aborted || e?.code === 'ERR_CANCELED') {
        return thunkAPI.rejectWithValue({ aborted: true })
      }
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)
