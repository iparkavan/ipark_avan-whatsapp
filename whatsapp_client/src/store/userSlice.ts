import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { stat } from 'fs'

// Define a type for the slice state
interface userPorps {
  userInfo: {
    id: number
    name: string
    email: string
    profileImage: string 
    status: string
  } | undefined
  newUser: boolean
  contactsPage: boolean
  currentChatUser: {
    id: number
    name: string
    email: string
    profilePicture: string 
    status: string
  } | undefined
}

// Define the initial state using that type
const initialState: userPorps = {
  userInfo: undefined,
  newUser: false,
  contactsPage: false,
  currentChatUser: undefined
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setNewUser: (state, action) => {
      state.newUser = action.payload
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    setAllContactsPage: (state, action) => {
      state.contactsPage = !state.contactsPage
    },
    setCurrentChatUser: (state, action) => {
      state.currentChatUser = action.payload
    }
  },
})

export const {setNewUser, setUserInfo, setAllContactsPage, setCurrentChatUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer