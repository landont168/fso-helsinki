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
    return 0
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
