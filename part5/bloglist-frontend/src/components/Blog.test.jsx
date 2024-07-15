import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component', () => {
  const blog = {
    title: 'astroworld',
    author: 'travis scott',
    url: 'www.travisscott.com',
    likes: 100,
    user: {
      username: 'stormer',
      name: 'landon',
    },
  }

  const userObject = {
    username: 'steez',
    name: 'bzd',
  }

  const mockHandler = vi.fn()

  beforeEach(() => {
    render(<Blog blog={blog} user={userObject} updateBlog={mockHandler} />)
  })

  test('renders blog title and author by default', () => {
    expect(screen.getByText('astroworld - travis scott')).toBeDefined()
    expect(screen.queryByText('www.travisscott.com')).toBeNull()
    expect(screen.queryByText('likes 100')).toBeNull()
  })

  test('renders all blog details when view button clicked', async () => {
    // click view button
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    expect(screen.getByText('astroworld - travis scott')).toBeDefined()
    expect(screen.getByText('www.travisscott.com')).toBeDefined()
    expect(screen.getByText('likes 100')).toBeDefined()
  })

  test('like button click calls event handler twice', async () => {
    // click view button
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    // click like button twice
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
