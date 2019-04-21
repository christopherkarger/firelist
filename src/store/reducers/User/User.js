import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  userData: null
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SAVE_USER_DATA :
      return {
        userData: action.data
      }

    default: return state;

  }
}

export default reducer;