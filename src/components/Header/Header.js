import React, { useState, useEffect }  from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import  { HeaderWrapper } from './Header-style';
import { Button, SidebarTogler, BackButton } from '../Button/Button-style';
import { Blackout } from '../Blackout/Blackout-style';
import { Sidepanel } from '../Sidepanel/Sidepanel-style';
import { withRouter } from 'react-router-dom';
//import AbortModal from '../Modal/Modal-abort';

const Header = (props) => {
  const [showBackButton, setshowBackButton] = useState(false);
  let mounted; 
  const [showSidepanel, setShowSidepanel] = useState(false);

  //const [showAbortModal, setShowAbortModal] = useState(false);
  
  //const showOrHideAbortModal = status => () => { setShowAbortModal(status) };

  const checkIfShowBackButton = (location) => {
    const propsLocation = location ? location : props.location;
    let showBack = propsLocation.pathname.indexOf('/todo') > -1;
    if (!showBack) {
      showBack = propsLocation.pathname.indexOf('/share-list') > -1;
    }

    if (!showBack) {
      showBack = propsLocation.pathname.indexOf('/edit-item') > -1;
    }
    setshowBackButton(showBack);
  };

  useEffect(() => {
    mounted = true;
    checkIfShowBackButton();
    const unlisten = props.history.listen((location, action) => {
      if (mounted) {
        checkIfShowBackButton(location);
      }
    });

    return () => {
      unlisten();
      mounted = false;
    }
  }, []);

  const navigateBack = () => {
    const pathname = props.location.pathname;
    const sharePath = '/share-list/';
    const editPath = '/edit-item/';
    const sharedPath = '/shared';

    if (pathname.indexOf(sharePath) > -1) {  
      const listTimestamp = pathname.substr(pathname.indexOf(sharePath) + sharePath.length);
      props.history.push('/todo/' + listTimestamp);
    
    } else if (pathname.indexOf(editPath) > -1) {
      let listTimestamp = pathname.substr(pathname.indexOf(sharePath) + sharePath.length);
      listTimestamp = listTimestamp.substr(0, listTimestamp.indexOf('/'));

      props.history.push('/todo/' + listTimestamp + ((pathname.indexOf(sharedPath) > -1) ? sharedPath : '' ) );
      
    } else {
      props.history.push('/');
    }
  };

  
  const toggleSidepanel = () => {
    setShowSidepanel(!showSidepanel);
  };

  const hideSidepanel = () => {
    if (showSidepanel) {
      setShowSidepanel(false);
    }
  }

  return (
    <HeaderWrapper>
      { showBackButton ? <BackButton fullWith onClick={navigateBack}><span>Back</span></BackButton> : null }
      <SidebarTogler toggleSidepanel onClick={toggleSidepanel} className={showSidepanel ? 'active' : false}>
        <span className="text">Show sidepanel</span>
        <span className="dot"></span>
      </SidebarTogler>
      <Sidepanel className={showSidepanel ? 'active' : false}>
        { /*showAbortModal? <AbortModal abort={showOrHideAbortModal(false)} accept={ backToHome }/>: null*/ }
    
        <Button fullWith onClick={props.logout}>Logout</Button>
      </Sidepanel>
      <Blackout onClick={hideSidepanel} className={showSidepanel ? 'active' : false} />
    </HeaderWrapper>
  )

};


const mapDispatchToProps = dispatch => {
  return {
    logout: () => { 
      dispatch(actions.changeLoginStatus(false))
    }
  }
};

export default connect(null, mapDispatchToProps)(withRouter(Header));