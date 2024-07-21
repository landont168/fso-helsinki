import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  // update state of store by adding new anecdote
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
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
