import React, { useState, useEffect, useRef } from 'react';
import * as actions from '../../store/actions/index';
import firebase from '../../jsModules/firebase';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input } from '../../components/Input/Input-style';
import { Wrapper } from '../../components/Wrapper/Wrapper-style';
import { Button, ImageUploadButton } from '../../components/Button/Button-style';
import { ItemImage } from '../../components/ItemImage/ItemImage-style';
import { ListTitleInput } from '../../components/Input/Input-style';
import { deleteImage } from '../../jsModules/deleteImage';

let firebaseListItem;

const editItem = props => {
  const propsTimestamp = props.match.params.timestamp;
  const propsIndex = props.match.params.index;
  const propsShared = props.match.params.shared;
  const [itemTitle, setItemTitle] = useState(props.thisList(propsTimestamp, propsShared).items[propsIndex].item);

   // Did Mount
   useEffect(() => {
    firebaseListItem = firebase.database().ref('userlists/' + props.userData.uid + '/lists/' + propsTimestamp + '/items/' + propsIndex);

    if (propsShared) {
      firebaseListItem = firebase.database().ref(props.thisList(propsTimestamp, propsShared).path + '/items/' + propsIndex);
    }

    return () => {
      firebaseListItem = null;
    }
   }, []);

  const saveItemTitle = event => {
    let thisListCopy = JSON.parse(JSON.stringify(props.thisList(propsTimestamp, propsShared)));
    thisListCopy.items[parseInt(propsIndex)].item = itemTitle;
    console.log(thisListCopy);
    updateToDoItems(thisListCopy);
  };


  const updateToDoItems = (thisListCopy) => {
    props.updateSingleTodoList({
      allLists: (propsShared) ? props.sharedLists : props.lists,
      list: thisListCopy,
      listkey: propsTimestamp,
      shared: (propsShared) ? true : false 
    });

    firebaseListItem.set(thisListCopy.items[parseInt(propsIndex)]);
  };

  const deleteItemImage = () => {
    deleteImage({
      thisList: props.thisList(propsTimestamp, propsShared),
      index: parseInt(propsIndex),
      uid: props.userData.uid,
      createTime: propsTimestamp,
      callback: toDoItemsCopy => {
        updateToDoItems(toDoItemsCopy);
      }
    });
  }


  const uploadImage = event => {
    if (event.target.files.length === 0) { return; }
    
    props.setLoadingStatus(true);

    let thisListCopy = JSON.parse(JSON.stringify(props.thisList(propsTimestamp, propsShared)));
    const toDoItem = thisListCopy.items[propsIndex];
    const itemHash = toDoItem.hash;
    
    if (!event.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
      alert('Keine Bilddatei');
      event.target.value = null;
      return;
    }
    
  const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      const result = reader.result;
      const fileType = result.substr(0, result.indexOf('base64'));
      let fileExt = 'jpg';

      if (fileType.indexOf('png') > -1) { fileExt = 'png'; }
      if (fileType.indexOf('gif') > -1) { fileExt = 'gif'; }

      const imageFile =  firebase.storage()
                                 .ref()
                                 .child(`${props.userData.uid}/${propsTimestamp}/${itemHash}.${fileExt}`);
      
      imageFile.putString(result, 'data_url').then(() => {
        imageFile.getDownloadURL().then((url) => {
          toDoItem.image = {
            url,
            fileName: `${itemHash}.${fileExt}`
          };
          updateToDoItems(thisListCopy);
          
          const itemImage = new Image();
          itemImage.src = url;
          itemImage.onload = () => { props.setLoadingStatus(false); }
        });
      });

    };
  };

  

  return (
    <Wrapper>
      <ListTitleInput type="text" value={itemTitle} onChange={(event) => setItemTitle(event.target.value)} onBlur={saveItemTitle} />
      <form>
        <ImageUploadButton htmlFor={'upload'}><span>Image upload</span></ImageUploadButton>
        <Input id={'upload'} type="file" accept="image/*" onChange={uploadImage}/>
      </form>
      
      {props.thisList(propsTimestamp, propsShared).items[propsIndex].image ? 
        <React.Fragment>
          <ItemImage src={ props.thisList(propsTimestamp, propsShared).items[propsIndex].image.url } />
          <Button onClick={deleteItemImage}>Löschen</Button>
        </React.Fragment>       
      : null  }
           
    </Wrapper>
  );
}

const mapStateToProps = state => {
  return {
    userData: state.user.userData,
    lists: state.lists.lists,
    sharedLists: state.lists.sharedLists,
    thisList: (timestamp, shared) => {
      let thisList;
      const activeLists = shared ? state.lists.sharedLists : state.lists.lists;

      activeLists.forEach(element => {
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
    updateSingleTodoList: payload => dispatch(actions.updateSingleTodoList(payload)),
    setLoadingStatus: status => dispatch(actions.setLoadingStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(editItem));
