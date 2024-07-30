import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    // init blogs
    setBlogs(state, action) {
      return action.payload
    },
    // add blog to state
    addNewBlog(state, action) {
      return [...state, action.payload]
    },
    // update blog from state
    updateNewBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
    },
    // remove blog from state
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { setBlogs, addNewBlog, updateNewBlog, removeBlog } =
  blogSlice.actions
export default blogSlice.reducer
