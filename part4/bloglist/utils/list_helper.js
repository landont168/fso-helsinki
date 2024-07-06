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

module.exports = {
  dummy,
  totalLikes,
}
