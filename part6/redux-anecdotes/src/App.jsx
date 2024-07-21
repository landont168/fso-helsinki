import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer'

import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Noitification from './components/Notification'

import anecdoteService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => {
      dispatch(setAnecdotes(anecdotes))
    })
  }, [dispatch])

  return (
    <div>
      <div>
        <h2>Anecdotes</h2>
        <Noitification />
        <Filter />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    </div>
  )
}

export default App
