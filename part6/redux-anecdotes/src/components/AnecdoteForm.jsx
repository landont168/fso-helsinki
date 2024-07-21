import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  // update state of store by adding new anecdote
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(createAnecdote(content))
    dispatch(setNotification(`You added: "${content}"`, 5))
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
