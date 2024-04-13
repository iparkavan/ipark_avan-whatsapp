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
  socket: any,
  messagesSearch: boolean
  userContacts: { 
    id: any; 
    name?: string; 
    email?: string; 
    about?: string; 
    profilePicture?: string; 
  }[]
  onlineUser: userPorps[]
  filteredContacts: {}[],
  voiceCall: {
    id: number
    name: string
    email: string
    profilePicture: string 
    status: string
    type: string
    callType: string
    roomId: number
  } ,
  videoCall:  {
    id: number
    name: string
    email: string
    profilePicture: string 
    status: string
    type: string
    callType: string
    roomId: number
  } 
  incomingVoiceCall: undefined,
  incomingVideoCall: undefined,
}

// Define the initial state using that type
const initialState: userPorps = {
  userInfo: undefined,
  newUser: false,
  contactsPage: false,
  currentChatUser: undefined,
  messages: [],
  socket: undefined,
  messagesSearch: false,
  userContacts: [],
  onlineUsers: [],
  filteredContacts: [],
  voiceCall: undefined,
  videoCall: undefined,
  incomingVoiceCall: undefined,
  incomingVideoCall: undefined,

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
    },
    setMessagesSearch: (state, action) => {
      state.messagesSearch = !state.messagesSearch
    },
    setUserContacts: (state, action) => {
      state.userContacts = action.payload
    },
    setOnlineUsers: (state, action) => {
      state.onlineUser = action.payload
    },
    setFilteredContacts: (state, action) => {
      const filteredContacts = state.userContacts.filter((contact) => contact.name?.toLocaleLowerCase().includes(action.payload.toLocaleLowerCase()))
      state.filteredContacts = filteredContacts
    },
    setVoiceCall: (state, action) => {
      state.voiceCall = action.payload
    },
    setVideoCall: (state, action) => {
      console.log("action",action.payload)
      state.videoCall = action.payload
    },
    setIncomingVoiceCall: (state, action) => {
      state.incomingVoiceCall = action.payload
    },
    setIncomingVideoCall: (state, action) => {
      state.incomingVideoCall = action.payload
    },
    setEndCall: (state, action) => {
      state.voiceCall = undefined
      state.videoCall= undefined
      state.incomingVoiceCall = undefined
      state.incomingVideoCall = undefined
    },
  },
})

export const {
  setNewUser, 
  setUserInfo, 
  setAllContactsPage, 
  setCurrentChatUser, 
  setMessages, 
  setSocket, 
  addMessage, 
  setMessagesSearch,
  setOnlineUsers,
  setUserContacts,
  setFilteredContacts,
  setVoiceCall,
  setVideoCall,
  setIncomingVoiceCall, 
  setIncomingVideoCall, 
  setEndCall
} = userSlice.actions

export default userSlice.reducer