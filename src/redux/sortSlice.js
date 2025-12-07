import { createSlice } from '@reduxjs/toolkit'

const sortSlice = createSlice({
  name: 'sortPokemons',
  initialState: {
    sortType: 'LOW_FIRST', // HIGH_FIRST | LOW_FIRST | A_Z | Z_A
  },
  reducers: {
    setSortType: (state, action) => {
      state.sortType = action.payload
    },
  },
})

export const { setSortType } = sortSlice.actions
export const sortReducer = sortSlice.reducer
