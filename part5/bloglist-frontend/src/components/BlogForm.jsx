import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // event handler for creating new blog
  const handleNewBlog = (event) => {
    event.preventDefault()
    addBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            placeholder='enter title'
            id='title'
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='Author'
            placeholder='enter author'
            id='author'
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='Url'
            placeholder='enter url'
            id='url'
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button id='submit-button' type='submit'>
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
