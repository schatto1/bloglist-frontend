export const userReducer = (state, action) => {
  switch (action.type) {
  case 'SET_USER':
    return { ...state, user: action.user }
  case 'CLEAR_USER':
    return { user: null }
  default:
    return state
  }
}