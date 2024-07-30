import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const loginAsyncUser = (userObject) => {
  return async (dispatch) => {
    const user = await loginService.login(userObject)
    dispatch(setUser(user))
    return user
  }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
