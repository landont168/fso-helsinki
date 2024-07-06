const dummy = (blogs) => {
  return 1
}

// return total sum of likes in all blogs posts
const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

// return blog with most likes
const favoriteBlog = (blogs) => {
  // empty blogs array
  if (blogs.length === 0) {
    return null
  }

  const blog = blogs.reduce((a, b) => (a.likes > b.likes ? a : b))
  return blog
}

// returns author with most blogs
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  // set up author count
  const authorCount = {}
  blogs.forEach((blog) => {
    authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
  })

  // find top author
  const topAuthor = Object.keys(authorCount).reduce((a, b) =>
    authorCount[a] > authorCount[b] ? a : b
  )

  // return author and number of blogs
  return {
    author: topAuthor,
    blogs: authorCount[topAuthor],
  }
}

// returns author with blog post with most likes
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  // get most likes author and determine likes
  const mostLikedAuthor = favoriteBlog(blogs).author
  const likes = blogs
    .filter((blog) => blog.author === mostLikedAuthor)
    .reduce((sum, blog) => sum + blog.likes, 0)

  return {
    author: mostLikedAuthor,
    likes: likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
