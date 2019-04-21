import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  lists: [],
  sharedLists: []
};


const reducer = (state =  initialState, action) => {
  
  if (action.type === actionTypes.SAVE_SHARED_USER_LISTS) {
    return {
      ...state,
      sharedLists: action.data
    }
  }
  
  if (action.type === actionTypes.SAVE_USER_LISTS) {
    return {
      ...state,
      lists: action.data
    }
  }
  return state;
};

export default reducer;