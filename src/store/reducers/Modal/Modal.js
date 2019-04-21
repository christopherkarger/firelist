import * as actionTypes from '../../actions/actionTypes';

const initialState = {
  showModal: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SHOW_MODAL :
      return {
        showModal: action.status
      }

    default: return state;

  }
}

export default reducer;