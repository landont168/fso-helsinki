import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  // create mutation for creating new anecdote
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    // invalidate old query result to refetch new data
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], [...anecdotes, newAnecdote])
      // successful notification
      dispatch({
        type: 'SUCCESS',
        payload: `You created "${newAnecdote.content}"`,
      })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    },
    onError: () => {
      // error notification
      dispatch({
        type: 'SUCCESS',
        payload: 'too short anecdote, must have length 5 or more',
      })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    // performs mutation to create new anecdote
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
