import * as actionTypes from '../actionTypes';

export const setLoadingStatus = status => {
  return {
    type: actionTypes.SET_LOADING_STATUS,
    status
  }
};

