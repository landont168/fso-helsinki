import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  // update state of store by adding new anecdote
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    // create new anecdote and dispatch to store
    const newAnecdote = await anecdoteService.create(content)
    dispatch(createAnecdote(newAnecdote))

    // set notification
    dispatch(setNotification(`You added: "${content}"`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  // display anecdote form
  return (
    <form onSubmit={addAnecdote}>
      <input name='anecdote' />
      <button type='submit'>add</button>
    </form>
  )
}

export default AnecdoteForm
