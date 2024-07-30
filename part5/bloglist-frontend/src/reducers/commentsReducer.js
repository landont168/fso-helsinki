import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    // init comments
    setComments(state, action) {
      return action.payload
    },
    // add comment to state
    addNewComment(state, action) {
      return [...state, action.payload]
    },
  },
})

// fetch comments from backend
export const initializeComments = (id) => {
  return async (dispatch) => {
    const comments = await blogService.getComments(id)
    dispatch(setComments(comments))
  }
}

// add comment to backend
export const createComment = (id, comment) => {
  return async (dispatch) => {
    await blogService.addComment(id, comment)
    dispatch(addNewComment(comment))
  }
}

export const { setComments, addNewComment } = commentsSlice.actions
export default commentsSlice.reducer
