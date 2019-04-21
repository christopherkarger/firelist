import * as actionTypes from '../actionTypes';
import firebase from '../../../jsModules/firebase';
import { setLoadingStatus } from '../Loading/Loading';

const saveLists = data => {
  return {
    type: actionTypes.SAVE_USER_LISTS,
    data
  }
}

const saveSharedLists = data => {
  return {
    type: actionTypes.SAVE_SHARED_USER_LISTS,
    data
  }
}


export const saveUserLists = data => {
  return dispatch => {
    dispatch(saveLists(data));
  }
};


export const updateSingleTodoList = (payload) => {
  return dispatch => {
    const allListsCopy = JSON.parse(JSON.stringify(payload.allLists));
    const listCopy = JSON.parse(JSON.stringify(payload.list));

    let added = false;
    allListsCopy.forEach(element => {
      if (element[payload.listkey]) {
        added = true;
        element[payload.listkey] = listCopy;
      } 
    });
    
    if (!added) {
      allListsCopy.push({
        [payload.listkey]: listCopy
      });
    }
    
    if (payload.shared) {
      dispatch(saveSharedLists(allListsCopy));
    } else {
      dispatch(saveLists(allListsCopy));
    }
    
  }
};

let firstTimeListsFetch;

export const getUserLists = payload => {
  return dispatch => {
    
    if (!firstTimeListsFetch) {
      dispatch(setLoadingStatus(true));
    }
    
    const list = firebase.database().ref('userlists/' + payload.uid + '/lists');
    list.once('value', snapshot => {
      const snapshotVal = snapshot.val();
      const allLists = [];

      if (snapshotVal) {
        for (let key in snapshotVal) {
          allLists.push({
            [key]: snapshotVal[key]
          });
        }
      }
      
      if (!firstTimeListsFetch) {
        dispatch(setLoadingStatus(false));
        firstTimeListsFetch = true;
      }

      dispatch(saveLists(allLists));
    });

  }
};

export const getSharedUserLists = payload => {
  return dispatch => {

    const snapshotVal = payload.data;
    const allLists = [];
    const promises = [];

    if (snapshotVal) {
      for (let i in snapshotVal) { 
        for (let listPath in snapshotVal[i]) {
          const listPathDecoded = decodeURIComponent(listPath);
          let createTime = listPathDecoded.substr(listPathDecoded.lastIndexOf('/') + 1);
          createTime = parseInt(createTime);
          
          promises.push(firebase.database().ref(listPathDecoded).once('value', (list) => {
            const listVal = list.val();
            listVal.path = listPathDecoded;
  
            if (listVal) {
              allLists.push({
                [createTime]: listVal
              });
            } 

          }).catch(err => {
            console.log(err);
          }));

        }    
      }
      
      Promise.all(promises).then(() => {
        dispatch(saveSharedLists(allLists));
      });
      
    } else {
      dispatch(saveSharedLists(allLists));
    }
      
  }
}