import * as actionTypes from '../actionTypes';

export const saveUserData = data => {
  return {
    type: actionTypes.SAVE_USER_DATA,
    data
  }
}