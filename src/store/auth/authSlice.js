import { createSlice } from '@reduxjs/toolkit'


const initialState = {
   status: 'guest' // 'guest' 'logedIn', 'wait' 
}


export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      increment: (state) => {
         // Redux Toolkit allows us to write "mutating" logic in reducers. It
         // doesn't actually mutate the state because it uses the Immer library,
         // which detects changes to a "draft state" and produces a brand new
         // immutable state based off those changes
         state.value += 1
      },
      decrement: (state) => {
         state.value -= 1
      },
      incrementByAmount: (state, action) => {
         state.value += action.payload
      },

      setStatus: (state) => {
         state.status = 'logedIn'
      },
      logedOut: (state) => {
         state.status = 'guest'
      }

   },
})

// Action creators are generated for each case reducer function
export const { setStatus, logedOut } = authSlice.actions

export default authSlice.reducer