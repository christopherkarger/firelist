import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from './jsModules/firebase';
import * as actions from './store/actions/index';

// const Login = React.lazy(() => import('./containers/Login/Login')); 
// const Home = React.lazy(() => import('./containers/Home/Home'));
// const ToDo = React.lazy(() => import('./containers/ToDo/ToDo')); 
// const ShareList = React.lazy(() => import('./containers/ShareList/ShareList')); 
// const EditItem = React.lazy(() => import('./containers/EditItem/EditItem')); 

import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import ToDo from './containers/ToDo/ToDo';
import ShareList from './containers/ShareList/ShareList';
import EditItem from './containers/EditItem/EditItem';

const Routes = props => {

  useEffect(() => {
    props.setLoadingStatus(true);

    firebase.auth().onAuthStateChanged((firebaseUser) => {
      props.setLoadingStatus(false);
      
      if (firebaseUser) {
        saveFirstTimeLogin(firebaseUser);
        props.saveUserData(firebaseUser);
        props.changeLoginStatus(true);
      }

    });
  }, []);

  const saveFirstTimeLogin = (user) => {
    const thisUser = firebase.database().ref('users/' + user.uid);

    thisUser.once('value', (snapshot) => {
      let userExists = snapshot.val();
      if (!userExists) {
        thisUser.set({
          username: user.displayName,
          email: user.email,
          time: new Date().getTime()
        });
      }        
    });
  }
  
  const Start = (props.loggedInStatus) ? Home : Login;
  
  if (props.location.pathname !== '/' && !props.loggedInStatus ) {
    return <Redirect to="/" />;
  } else {
    return (
      <React.Fragment>
        <Route path="/" exact component={Start} />
        <Route path="/todo/" exact component={ToDo} />
        <Route path="/todo/:timestamp/:shared?" component={ToDo} />
        <Route path="/share-list/:timestamp" component={ShareList} />
        <Route path="/edit-item/:timestamp/:index/:shared?" component={EditItem} />
      </React.Fragment>
    );
  }
  

}

const mapStateToProps = state => {
  return {
    loggedInStatus: state.login.status
  }  
};

const mapDispatchToProps = dispatch => {
  return {
    changeLoginStatus: status => dispatch(actions.changeLoginStatus(status)),
    saveUserData: data => dispatch(actions.saveUserData(data)),
    setLoadingStatus: status => dispatch(actions.setLoadingStatus(status))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);