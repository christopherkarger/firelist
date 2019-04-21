import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Wrapper } from '../../components/Wrapper/Wrapper-style';
import { AddTodoListButton, RemoveButton } from '../../components/Button/Button-style';
import { List } from '../../components/List/List-style';
import { BigHeadline } from '../../components/BigHeadline/BigHeadline-style';
import { Subheadline } from '../../components/Subheadline/Subheadline-style';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import firebase from '../../jsModules/firebase';

const stadardTitel = 'Title';

const Home = (props) => {
  let sharedFirebaseList;  

  // Did mount
  useEffect(() => {     
    props.getUserLists({
      uid: props.userData.uid
    });

    sharedFirebaseList = firebase.database().ref('/userlists/' + props.userData.uid + '/sharedlists');
    
    sharedFirebaseList.on('value', (snapshot) => {
      props.getSharedUserLists({
        data: snapshot.val()
      });
    });

    return () => {
      sharedFirebaseList.off();
    }

  }, []);

  const toNewNote = () => {
    props.history.push('/todo');
  };

  const removeList = index => () => {
    let thisList;
    let timestamp;
    for (let key in props.lists[index]) {
      timestamp = key;
    }

    props.lists.forEach((list) => {
      if (list[timestamp]) {
        thisList = list[timestamp];
      }
    });

    if (thisList.shareWith && thisList.shareWith.users) {
      for (let user in thisList.shareWith.users) {
        const dbKey = encodeURIComponent('/userlists/' + user + '/lists/' + timestamp);
        const dbPath = '/userlists/' + user + '/sharedlists/' + props.userData.uid;
        firebase.database().ref(dbPath).set({
          [dbKey]: null
        });
      }
    }

    const list = firebase.database().ref('userlists/' + props.userData.uid + '/lists/' + timestamp);
    list.remove();
    props.getUserLists({
      uid: props.userData.uid
    });
  };

  const getListPeekText = list => {
    let peekText = '';
    const max = 3;
    
    if (list.items && list.items.length > 0) {
      const loopLength = list.items.length > max ? max : list.items.length;  
    
      for (let i = 0; i<loopLength; i++) {
        if (i > 0) {
          peekText += ','  
        }
        peekText += list.items[i].item;
  
        if ((list.items.length > max) && (i === (max - 1))) {
          peekText += '...';
        }
      }
    } else {
      peekText = 'Empty list';
    }
    
    return peekText;
  }

  const getListItemsHTML = listItem => {
    return (
      <List myList>
        { listItem.map((elm,index) => {
          let timestamp;
          for (let key in elm) {
            timestamp = key;
          }

          return (
            <li key={index}>
              <Link to={'/todo/' + timestamp }>
                { elm[timestamp].title !== stadardTitel ? 
                  elm[timestamp].title : getListPeekText(elm[timestamp]) 
                }
              </Link>
              <RemoveButton onClick={removeList(index)}><span>Remove</span></RemoveButton>
            </li>
          )
        }) }
        
      </List>
    );
  
  }


  const getSharedListItemsHTML = listItem => {
    return (
      <React.Fragment>
        <Subheadline>Shared lists</Subheadline>
        <List>
          { listItem.map((elm,index) => {
            let timestamp;
            for (let key in elm) {
              timestamp = key;
            }

            return (
              <li key={index}>
                <Link to={'/todo/' + timestamp + '/shared'}>
                  { elm[timestamp].title !== stadardTitel ? 
                    elm[timestamp].title : getListPeekText(elm[timestamp]) 
                  }
                </Link>
              </li>
            )
          }) }

        </List>
      </React.Fragment>
    )
  };

  return (
    <Wrapper>
      <BigHeadline withBorder>
        Hello <span>{ props.userData ? props.userData.displayName.split(' ')[0] : null }!</span>
      </BigHeadline>

      <Subheadline>
        { (props.lists && props.lists.length > 0) ? 'Your' :  'No' } Todo's
      </Subheadline>
      
      { (props.lists && props.lists.length > 0) ? getListItemsHTML(props.lists) : null }

      { (props.sharedLists && props.sharedLists.length > 0) ? getSharedListItemsHTML(props.sharedLists) : null }
      <AddTodoListButton onClick={toNewNote}><span>Add Todo</span></AddTodoListButton>
    </Wrapper>
  )
};

const mapStateToProps = state => {
  return {
    userData: state.user.userData,
    lists: state.lists.lists,
    sharedLists: state.lists.sharedLists
  }  
};

const mapDispatchToProps = dispatch => {
  return {
    getUserLists: payload => dispatch(actions.getUserLists(payload)),
    getSharedUserLists: payload => dispatch(actions.getSharedUserLists(payload))
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Home));