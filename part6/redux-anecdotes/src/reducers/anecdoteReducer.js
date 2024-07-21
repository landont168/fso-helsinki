import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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
    setAnecdotes(state, action) {
      // set initial anecdotes
      return action.payload
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    },
  },
})

export const { voteAnecdote, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    // fetches anecdotes from backend
    const anecdotes = await anecdoteService.getAll()

    // dispatches anecdotes to state
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    // create anecdote in backend
    const newAnecdote = await anecdoteService.create(content)

    // dispatch created anecdote to state
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = (id) => {
  return async (dispatch, getState) => {
    // find and update anecdote
    const anecdotes = getState().anecdotes
    const anecdoteToChange = anecdotes.find((a) => a.id === id)
    const updatedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    }

    // update anecdote in backend and store
    const newAnecdote = await anecdoteService.updateAnecdote(
      id,
      updatedAnecdote
    )
    dispatch(voteAnecdote(newAnecdote.id))
  }
}

export default anecdoteSlice.reducer
