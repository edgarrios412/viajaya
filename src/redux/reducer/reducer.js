
import { SET_USER } from '../actions/actions';

const initialState = {
  user:{},
};
const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:{
      return{
        ...state,
        user:payload
      }
    }
    default:
      return { ...state };
  }
};

export default rootReducer;
