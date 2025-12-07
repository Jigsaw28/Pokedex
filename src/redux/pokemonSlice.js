import { createSlice } from '@reduxjs/toolkit'
import { BATCH_SIZE, fetchDetailsBatch, fetchResultsList } from './operations'

const initialState = {
  items: [], // вже завантажені деталі
  resultsList: [], // повний список name+url
  sortedResults: [], // resultsList у поточному порядку
  isLoading: false,
  isLoadingBatch: false,
  error: null,
  displayCount: 20,
  batchOffset: 0, // скільки url уже опрацьовано (для наступного батчу)
}

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    // Показувати ще 20 карток на сторінці
    increaseDisplayCount: (state) => {
      state.displayCount += 20
    },

    // Повернути до показу 20 карток (при зміні сорту)
    resetDisplayCount: (state) => {
      state.displayCount = 20
    },

    // Зберегти відсортований список URL (для підвантаження батчів у правильному порядку)
    setSortedResults: (state, action) => {
      state.sortedResults = action.payload
    },

    // Очистити завантажені деталі при зміні сорту
    clearItemsForSort: (state) => {
      state.items = []
      state.batchOffset = 0
    },
  },

  extraReducers: (builder) => {
    // Завантаження списку URL (fetchResultsList)
    builder.addCase(fetchResultsList.pending, (state) => {
      state.isLoading = true
      state.error = null
    })

    builder.addCase(fetchResultsList.fulfilled, (state, action) => {
      state.isLoading = false
      state.resultsList = action.payload // зберігаємо повний список URL
      state.sortedResults = action.payload.slice() // копіюємо як початковий sortedResults
      state.batchOffset = 0 // готові завантажувати батчі з 0-го індексу
    })

    builder.addCase(fetchResultsList.rejected, (state, action) => {
      state.isLoading = false
      if (action.payload && action.payload.aborted) return
      state.error = action.payload || action.error?.message
    })

    // Завантаження батчу деталей (fetchDetailsBatch)
    builder.addCase(fetchDetailsBatch.pending, (state) => {
      state.isLoadingBatch = true
      state.error = null
    })

    builder.addCase(fetchDetailsBatch.fulfilled, (state, action) => {
      state.isLoadingBatch = false
      // додаємо деталі в кінець items
      state.items = [...state.items, ...action.payload.items]
      // оновлюємо batchOffset: offset + BATCH_SIZE
      state.batchOffset = Math.min(state.sortedResults.length, action.payload.offset + BATCH_SIZE)
    })

    builder.addCase(fetchDetailsBatch.rejected, (state, action) => {
      state.isLoadingBatch = false
      if (action.payload && action.payload.aborted) return
      state.error = action.payload || action.error?.message
    })
  },
})

export const { increaseDisplayCount, resetDisplayCount, setSortedResults, clearItemsForSort } = pokemonSlice.actions
export const pokemonReducer = pokemonSlice.reducer
