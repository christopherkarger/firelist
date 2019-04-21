import { combineReducers } from 'redux';
import login from './Login/Login';
import modal from './Modal/Modal';
import user from './User/User';
import lists from './Lists/Lists';
import loading from './Loading/Loading';

const combinedStore = combineReducers({
  user,
  login,
  modal,
  lists,
  loading
});

export default combinedStore;

