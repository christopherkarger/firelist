import React, { useState, useEffect, useRef } from 'react';
import firebase from '../../jsModules/firebase';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { BigInputWithBorder } from '../../components/Input/Input-style';
import { BigHeadline } from '../../components/BigHeadline/BigHeadline-style';
import { AddItemForm } from '../../components/AddItemForm/AddItemForm-style';
import { List } from '../../components/List/List-style';
import { Subheadline } from '../../components/Subheadline/Subheadline-style';
import { Button, RemoveButton } from '../../components/Button/Button-style';
import { Wrapper } from '../../components/Wrapper/Wrapper-style';
import { withRouter } from 'react-router-dom';

const shareList = (props) => {
  const [users, setUsers] = useState([]);
  const inputEl = useRef(null);
  const propsTimestamp = props.match.params.timestamp;

  useEffect(() => {
    inputEl.current.focus();
  },[]);
  
  const getFirebaseUser = async (inputVal) => {
    return new Promise((resolve,reject) => {
      firebase.database().ref('/users')
      .orderByChild('username')
      .startAt(inputVal )
      .endAt(inputVal + "\uf8ff")
      .once('value', (snapshot) => {
        const snapshotVal = snapshot.val();
        if (snapshotVal) {
          resolve(snapshotVal); 
        } else {
          resolve(false);
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

  const unShareWith = id => () => {
    let thisListCopy = JSON.parse(JSON.stringify(props.thisList(propsTimestamp)));
    delete thisListCopy.shareWith.users[id];
    props.updateSingleTodoList({
      allLists: props.lists,
      list: thisListCopy,
      listkey: propsTimestamp
    });

    firebase.database().ref('/userlists/' + props.userData.uid + '/lists/' + propsTimestamp + '/shareWith/users/' + id).remove();
    firebase.database().ref('/userlists/' + id + '/sharedlists/' + props.userData.uid + '/' + encodeURIComponent('/userlists/' + props.userData.uid + '/lists/' + propsTimestamp)).remove();
  
  };

  const shareWith = user => () => {
    const id = user.uid;
    let thisListCopy = JSON.parse(JSON.stringify(props.thisList(propsTimestamp)));
    
    if (!thisListCopy.shareWith) { thisListCopy.shareWith = {}; }
    if (!thisListCopy.shareWith.users) { thisListCopy.shareWith.users = {}; }
    thisListCopy.shareWith.users[id] = {
      username: user.username
    };

    props.updateSingleTodoList({
      allLists: props.lists,
      list: thisListCopy,
      listkey: propsTimestamp
    });

    firebase.database().ref('/userlists/' + props.userData.uid + '/lists/' + propsTimestamp + '/shareWith/users/' + id).set({
      username: user.username
    });
    
    // Save info to shared user
    firebase.database().ref('/userlists/' + id + '/sharedlists/' + props.userData.uid + '/' + encodeURIComponent('/userlists/' + props.userData.uid + '/lists/' + propsTimestamp)).set(true);

    setUsers([]);
  };

  const showUsers = async () => {
    let thisListCopy = JSON.parse(JSON.stringify(props.thisList(propsTimestamp)));
    const thisUserId = props.userData.uid;
    let inputVal = inputEl.current.value;
    const foundUsers = [];
    let firebaseUsers;

    if (inputVal && inputVal.length > 0) { 
      firebaseUsers = await getFirebaseUser(inputVal);
    
      if (!firebaseUsers) {
        let valArr = inputVal.split('');
        valArr[0] = valArr[0].toUpperCase();
        valArr = valArr.join('');
        firebaseUsers = await getFirebaseUser(valArr);
      }

      if (firebaseUsers) {
        const firebaseUsersCopy = JSON.parse(JSON.stringify(firebaseUsers));

        for (let user in firebaseUsersCopy) {
          if (user !== thisUserId) {
            
            firebaseUsersCopy[user].uid = user;

            if (!thisListCopy.shareWith || !thisListCopy.shareWith.users[user]) {
              firebaseUsersCopy[user].uid = user;
              foundUsers.push(firebaseUsersCopy[user]);
            }
            
          }
        }
      }
    }

    setUsers(foundUsers);
    
  }
  return (
    <Wrapper>
      <BigHeadline withBorder>Search for friends</BigHeadline>
      <AddItemForm>
        <BigInputWithBorder ref={inputEl} type="text" onChange={showUsers} placeholder="Name"/>
        { users.length > 0 ? users.map((user,index) => {
          return (
            <div key={index}>
              <Button onClick={shareWith(user)}>
                <p>{ user.username }</p>
              </Button>
            </div>
          )
        }) : null }
      </AddItemForm>

      { props.thisList(propsTimestamp).shareWith ? 
        <React.Fragment>
          { Object.values(props.thisList(propsTimestamp).shareWith).map((elm,i) => {
            return (
              <React.Fragment key={'share' + i}>
                { Object.values(elm).length > 0 ?
                  <React.Fragment>
                    <Subheadline>Liste geteilt mit:</Subheadline>
                    <List share>{
                      Object.values(elm).map((user,index) => {
                        return (
                          <li key={index}>
                            {user.username}
                            <RemoveButton onClick={unShareWith(Object.keys(elm)[index])}><span>Remove</span></RemoveButton>
                          </li>
                        );
                      })
                    }</List>

                  </React.Fragment> : null }

              </React.Fragment>
            );
          }) }
        </React.Fragment> : null }
    </Wrapper>
    )
};

const mapStateToProps = state => {
  return {
    userData: state.user.userData,
    lists: state.lists.lists,
    thisList: (timestamp) => {
      let thisList;
      state.lists.lists.forEach(element => {
        if (element[timestamp]) {
          thisList =  JSON.parse(JSON.stringify(element[timestamp]));
        } 
      });
      return thisList;
    }
  }  
};

const mapDispatchToProps = dispatch => {
  return {
    updateSingleTodoList: payload => dispatch(actions.updateSingleTodoList(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(shareList));

