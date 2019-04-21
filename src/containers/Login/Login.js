import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Button } from '../../components/Button/Button-style';
import { Wrapper } from '../../components/Wrapper/Wrapper-style';
import { Logo, LogoTitle } from '../../components/Logo/Logo-style';
import firebase from '../../jsModules/firebase';
import flame from '../../assets/img/flame2.svg';

const Login = (props) => {
  
  const googleLogin = () => {
    props.setLoadingStatus(true)
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  return (
    <Wrapper Login>
      <Logo src={flame} alt="firelist"/>
      <LogoTitle>FireList</LogoTitle>
      <Button onClick={googleLogin}>Login with Google</Button>
    </Wrapper>
  )
};


const mapDispatchToProps = dispatch => {
  return {
    setLoadingStatus: status => dispatch(actions.setLoadingStatus(status))
  }
};

export default connect(null, mapDispatchToProps)(Login);