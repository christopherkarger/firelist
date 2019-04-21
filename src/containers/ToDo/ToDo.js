import React, { useState, useEffect, useRef } from 'react';
import * as actions from '../../store/actions/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from '../../jsModules/firebase';
import { BigInputWithBorder } from '../../components/Input/Input-style';
import { Wrapper } from '../../components/Wrapper/Wrapper-style';
import { Button, ShareButton } from '../../components/Button/Button-style';
import { Subheadline } from '../../components/Subheadline/Subheadline-style';
import  { AddItemForm } from '../../components/AddItemForm/AddItemForm-style';
import { ListTitleInput } from '../../components/Input/Input-style';
import Modal from '../../components/Modal/Modal';
import { deleteImage } from '../../jsModules/deleteImage';
import ToDoList from './ToDoList';

let createTime;
let firebaseList;
const stadardTitel = 'Titel';

const toDo = props => {
  const propsTimestamp = props.match.params.timestamp;
  const propsShared = props.match.params.shared;
  const [activeToDoItem, setActiveToDoItem] = useState(null);
  const [showModal, setshowModal] = useState(null);
  const inputElAdd = useRef(null);

  let thisList = {
    title: stadardTitel,
    items: []
  };
  
  const listKey = propsTimestamp || createTime;
  
  if (listKey) {
    let thisLists = (propsShared) ? props.sharedLists : props.lists; 
    thisLists.forEach((list) => {
      if (list[listKey]) {
        thisList = list[listKey];
      }
    });
  }

  const [listTitle, setListTitle] = useState(thisList.title);

  // Did Mount
  useEffect(() => {
    createTime = propsTimestamp ? propsTimestamp : new Date().getTime();
    
    if (!propsTimestamp) {
      inputElAdd.current.focus();
    }

    firebaseList = firebase.database().ref('userlists/' + props.userData.uid + '/lists/' + createTime);

    if (propsShared) {
      firebaseList = firebase.database().ref(thisList.path);
    }


    firebaseList.on('value', (snapshot) => {
      const snapshotVal = snapshot.val();
      if (snapshotVal) {
        let updatetList = snapshotVal;
        
        if (propsShared) { updatetList.path = thisList.path }

        props.updateSingleTodoList({
          allLists: (propsShared) ? props.sharedLists : props.lists,
          list: updatetList,
          listkey: createTime,
          shared: (propsShared) ? true : false,
        });
      } 
    });
    
    return () => {
      firebaseList.off();
      createTime = null; 
      firebaseList = null;
    } 

  }, []);

  const saveActiveToDoItem = () => {
    setActiveToDoItem(inputElAdd.current.value);
    inputElAdd.current.focus();
  };

  const updateToDoItems = (toDoItemsCopy) => {
    toDoItemsCopy.lastUpdatet = new Date().getTime();
    props.updateSingleTodoList({
      allLists: (propsShared) ? props.sharedLists : props.lists,
      list: toDoItemsCopy,
      listkey: createTime,
      shared: (propsShared) ? true : false
    });
    
    firebaseList.set(toDoItemsCopy).catch(error => {
      if (error.code ===  "PERMISSION_DENIED") {
        setshowModal((<Modal>
            <Subheadline>Ups! Liste wird nicht mehr geteilt</Subheadline>
            <Button onClick={() => props.history.push('/')}>Verstanden</Button>
        </Modal>));
      }

    });
  };

  const addToDoItem = item => {
    const toDoItemsCopy = JSON.parse(JSON.stringify(thisList));
    toDoItemsCopy.items = toDoItemsCopy.items || [];
    toDoItemsCopy.items.unshift({
      item: item,
      done: false,
      hash: Math.random().toString(36).substring(7)
    });

    updateToDoItems(toDoItemsCopy);
  };

  const deleteToDoItem = index => () => {
    deleteItemImage(index);
    const toDoItemsCopy = JSON.parse(JSON.stringify(thisList));
    toDoItemsCopy.items.splice(index, 1);
    updateToDoItems(toDoItemsCopy);
  };

  const toggleDoneOnItem = index => () => {
    const toDoItemsCopy = JSON.parse(JSON.stringify(thisList));
    const status = toDoItemsCopy.items[index].done;
    toDoItemsCopy.items[index].done = !status;
    updateToDoItems(toDoItemsCopy);
  };

  const submit = (event) => {
    event.preventDefault();
    if (activeToDoItem && activeToDoItem.trim().length > 0) {
      addToDoItem(activeToDoItem);
      setActiveToDoItem(null);
      inputElAdd.current.value = '';
    }
  };

  const deleteItemImage = index => {
    deleteImage({
      thisList,
      index,
      uid: props.userData.uid,
      createTime: propsTimestamp,
      callback: toDoItemsCopy => {}
    });
  };

  const showShareList = () => {
    const toDoItemsCopy = JSON.parse(JSON.stringify(thisList));
    updateToDoItems(toDoItemsCopy);
    props.history.push('/share-list/' + createTime);
  };

  const saveListTitle = event => {
    const toDoItemsCopy = JSON.parse(JSON.stringify(thisList));
    const value = event.target.value;
    toDoItemsCopy.title = (value.length > 0) ? event.target.value : stadardTitel;
    updateToDoItems(toDoItemsCopy);
  };

  return (
    <Wrapper>
      { showModal }
      <ListTitleInput type="text" value={listTitle} onChange={(event) => setListTitle(event.target.value)} onBlur={saveListTitle} />
      <ShareButton onClick={showShareList}><span>Share List</span></ShareButton>
      <AddItemForm onSubmit={submit}>
        <BigInputWithBorder onChange={saveActiveToDoItem} ref={inputElAdd} type="text" placeholder="To-Do" />
        <Button onClick={saveActiveToDoItem}>Hinzufügen</Button>
      </AddItemForm>
        <ToDoList 
          thisList={thisList} 
          createTime={createTime} 
          propsShared={propsShared} 
          toggleDoneOnItem={toggleDoneOnItem} 
          deleteToDoItem={deleteToDoItem} />
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
    updateSingleTodoList: payload => dispatch(actions.updateSingleTodoList(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(toDo));