import * as actionTypes from '../actionTypes';
import firebase from '../../../jsModules/firebase';

const changeStatus = status => {
  return {
    type: actionTypes.CHANGE_LOGIN_STATUS,
    status
  }
}

export const changeLoginStatus = status => {
  return dispatch =>  {
    if (status) {
      dispatch(changeStatus(status));
    } else {
      firebase.auth().signOut().then(() => {
        console.log('logged out');
        dispatch(changeStatus(status));
      });
    }

  }
}