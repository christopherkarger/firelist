import * as actionTypes from '../actionTypes';

export const showModal = status => {
  return {
    type: actionTypes.SHOW_MODAL,
    status
  }
}