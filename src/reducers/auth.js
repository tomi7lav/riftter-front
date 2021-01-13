

export const getUserData = () => 
    fetch('http://localhost:3000/user', {
        credentials: 'include',
    })
    .then((response) => response.json())
    .catch(() => null);


export default function authReducer(state = { user: null }, action) {
    switch (action.type) {
      case 'user/set':
        return {
            ...state,
            user: action.payload
        }
      case 'user/clear':
        return {
           user: null
        }
      default:
        return state
    }
}
