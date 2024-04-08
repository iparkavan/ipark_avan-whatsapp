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
  messages: {
    createdAt: string
    id: number
    message: string
    messageStatus: string
    receiverId: number
    senderId: number
    type: string
  }[]
  socket: any
}

// Define the initial state using that type
const initialState: userPorps = {
  userInfo: undefined,
  newUser: false,
  contactsPage: false,
  currentChatUser: undefined,
  messages: [],
  socket: undefined
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
    },
    setMessages: (state, action) => {
      if (action.payload.type) {
        state.messages = action.payload.chats
      } 
    },
    setSocket: (state, action) => {
      // console.log("setScoket",action.payload)
      state.socket = action.payload
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload.addMessage]
    }
  },
})

export const {setNewUser, setUserInfo, setAllContactsPage, setCurrentChatUser, setMessages, setSocket, addMessage } = userSlice.actions

export default userSlice.reducer