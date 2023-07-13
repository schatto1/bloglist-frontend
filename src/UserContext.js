import { createContext, useContext, useReducer } from 'react'
import { userReducer } from './userReducer'

const UserContext = createContext()

const initialState = {
  user: null,
}

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    userReducer,
    initialState,
    () => initialState
  )

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}

export default UserContext
