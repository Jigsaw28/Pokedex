//https://pokeapi.co/api/v2/{endpoint}/

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { transformPokemonData } from '../utils/transformPokemonData'

export const BATCH_SIZE = 20


export const fetchResultsList = createAsyncThunk(
  'pokemons/fetchResultsList',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=2000', {
        signal: thunkAPI.signal,
      })
      return data.results
    } catch (err) {
      if (thunkAPI.signal.aborted || err?.code === 'ERR_CANCELED') {
        return thunkAPI.rejectWithValue({ aborted: true })
      }
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const fetchDetailsBatch = createAsyncThunk(
  'pokemons/fetchDetailsBatch',
  async ({ offset }, thunkAPI) => {
    try {
      const state = thunkAPI.getState()
      const orderList = state.pokemons.sortedResults
      if (!orderList || offset >= orderList.length) {
        return { items: [], offset }
      }

      const SIGNAL = thunkAPI.signal
      const collected = []
      let idx = offset

      // Window size — скільки URL запитуємо одночасно в кожній ітерації.
      // BATCH_SIZE * 3 — трохи запитів «про запас»
      // Оптимізація: було 60, стало ~15 для зменшення навантаження
      const WINDOW = Math.max(10, BATCH_SIZE)

      while (collected.length < BATCH_SIZE && idx < orderList.length) {
        const sliceStart = idx
        const slice = orderList.slice(idx, Math.min(idx + WINDOW, orderList.length))

        // Запитуємо цей шматок паралельно
        const responses = await Promise.all(
          slice.map((r) =>
            axios
              .get(r.url, { signal: SIGNAL })
              .then((res) => res.data)
              .catch((err) => {
                if (err?.code === 'ERR_CANCELED') return null
                return null
              })
          )
        )

        for (let i = 0; i < responses.length; i++) {
          const data = responses[i]
          const pokemon = transformPokemonData(data)
          if (pokemon) {
            collected.push(pokemon)
          }

          if (collected.length >= BATCH_SIZE) {
            return { items: collected, offset: sliceStart + i + 1 }
          }
        }
        idx += slice.length
      }
    } catch (err) {
      if (thunkAPI.signal.aborted || err?.code === 'ERR_CANCELED') {
        return thunkAPI.rejectWithValue({ aborted: true })
      }
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)
