import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

// retrieve anecdotes from server
export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data)

// create anecdotes to server
export const createAnecdote = (newAnecdote) =>
  axios.post(baseUrl, newAnecdote).then((res) => res.data)

// update votes of an anecdote
export const updateAnecdote = (updatedAnecdote) =>
  axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data)
