import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Noitification from './components/Notification'

const App = () => {
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
