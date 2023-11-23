import { reducerCases } from "./constants"

export const initialState = {
  userInfo: undefined,
  newUser: false
}

interface props {
  state: any,
  action: {
    type: {}
    userInfo: {
      name: string
      email: string
      profileImage: string
      status: string
    }
    newUser: boolean
  }
}

const reducer = ({state, action}: props) => {
  switch (action?.type) {
    case reducerCases.SET_USER_INFO:
      console.log({userInfo: action.userInfo})
      return {
        ...state,
        userInfo: action.userInfo
      }
      case reducerCases.SET_NEW_USER:
      return {
        ...state,
        newUser: action?.newUser
      }
    default:
      return state
  }
}

export default reducer