//https://pokeapi.co/api/v2/{endpoint}/

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const BATCH_SIZE = 10

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
      const orderList = state.pokemons.sortedResults // масив name+url у потрібному порядку
      if (!orderList || offset >= orderList.length) {
        return { items: [], offset }
      }

      const SIGNAL = thunkAPI.signal
      const collected = []
      let idx = offset

      // Window size — скільки URL запитуємо одночасно в кожній ітерації.
      // Вибір: BATCH_SIZE * 3 — трохи запитів «про запас»
      const WINDOW = Math.max(10, BATCH_SIZE * 2)

      while (collected.length < BATCH_SIZE && idx < orderList.length) {
        const slice = orderList.slice(idx, Math.min(idx + WINDOW, orderList.length))

        // Запитуємо цей шматок паралельно (але не занадто великий)
        const responses = await Promise.all(
          slice.map(r => axios.get(r.url, { signal: SIGNAL }).then(res => res.data).catch(err => {
            // якщо конкретний запит провалився, повертаємо null, але не кидаємо весь batch
            if (err?.code === 'ERR_CANCELED') return null
            return null
          }))
        )

        for (let i = 0; i < responses.length; i++) {
          const d = responses[i]
          if (!d) continue
          if (d.is_default) {
            collected.push({
              id: d.id,
              name: d.name,
              types: d.types.map(t => t.type.name),
              sprite: d.sprites?.other?.['official-artwork']?.front_default || d.sprites?.front_default,
            })
          }
        }

        // Переміщаємо індекс на наступну віконну порцію
        idx += slice.length
      }

      // Повертаємо зібрані дефолтні елементи і наступний offset (просто idx)
      return { items: collected, offset: idx }
    } catch (err) {
      if (thunkAPI.signal.aborted || err?.code === 'ERR_CANCELED') {
        return thunkAPI.rejectWithValue({ aborted: true })
      }
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)
