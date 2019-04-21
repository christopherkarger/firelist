import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  status: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_LOADING_STATUS :
      return {
        ...state,
        status: action.status
      }

    default: return state;

  }
};

export default reducer;