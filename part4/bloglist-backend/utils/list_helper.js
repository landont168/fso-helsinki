const dummy = (blogs) => {
  return 1
}

// return total sum of likes in all blogs posts
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

// return blog with most likes
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  return blogs.reduce((a, b) => (a.likes > b.likes ? a : b))
}

// returns author with most blogs
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  // set up author-blogs count
  const authorCount = {}
  blogs.forEach((blog) => {
    authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
  })

  // find top author name
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

  // get author with most liked blog
  const mostLikedAuthor = favoriteBlog(blogs).author
  // calculate total likes for author
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
