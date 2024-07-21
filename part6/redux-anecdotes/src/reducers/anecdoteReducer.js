import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      // directly update anecdote vote
      const id = action.payload
      const anecdoteToChange = state.find((a) => a.id === id)
      anecdoteToChange.votes += 1
    },
    createAnecdote(state, action) {
      // directly add new anecdote to state
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      // set initial anecdotes
      return action.payload
    },
  },
})

export const { voteAnecdote, createAnecdote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
