import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('new blog form calls event handler with correct details', async () => {
  const user = userEvent.setup()
  const mockHandler = vi.fn()
  render(<BlogForm addBlog={mockHandler} />)

  // fill out form
  const titleInput = screen.getByPlaceholderText('enter title')
  const authorInput = screen.getByPlaceholderText('enter author')
  const urlInput = screen.getByPlaceholderText('enter url')
  await user.type(titleInput, 'astroworld')
  await user.type(authorInput, 'travis scott')
  await user.type(urlInput, 'www.travisscott.com')

  // submit form
  const createButton = screen.getByText('create')
  await user.click(createButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('astroworld')
  expect(mockHandler.mock.calls[0][0].author).toBe('travis scott')
  expect(mockHandler.mock.calls[0][0].url).toBe('www.travisscott.com')
})
