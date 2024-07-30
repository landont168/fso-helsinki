import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

// blog reducer slice
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

// fetch blogs from backend
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

// add blog to backend
export const addBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(addNewBlog(newBlog))
  }
}

// update blog in backend
export const updateBlog = (id, blogObject) => {
  return async (dispatch) => {
    // updates blog
    const updatedBlog = await blogService.update(id, blogObject)
    dispatch(updateNewBlog(updatedBlog))
  }
}

// delete blog from backend
export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteObject(id)
    dispatch(removeBlog(id))
  }
}

export const { setBlogs, addNewBlog, updateNewBlog, removeBlog } =
  blogSlice.actions
export default blogSlice.reducer
