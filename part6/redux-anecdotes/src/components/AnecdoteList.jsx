import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {
  // retrieve anecdotes from redux store
  const anecdotes = useSelector((state) => state)

  // used to dispatch actions to store in order to update state through reducer
  const dispatch = useDispatch()

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() =>
              dispatch({ type: 'VOTE', payload: { id: anecdote.id } })
            }
          />
        ))}
    </div>
  )
}

const Anecdote = ({ anecdote, handleClick }) => (
  <div>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </div>
)

export default AnecdoteList
