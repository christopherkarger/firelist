import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  status: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_LOGIN_STATUS :
      return {
        ...state,
        status: action.status
      }

    default: return state;

  }
}

export default reducer;