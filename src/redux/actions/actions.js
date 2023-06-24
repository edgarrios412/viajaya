export const SET_USER = "SET_USER"

export const setUser = (user) => {
  return (dispatch) => {
    dispatch({type:SET_USER, payload:user})
  }
}