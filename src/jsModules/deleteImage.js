import firebase from './firebase';

export const deleteImage = payload => {
  const toDoItemsCopy = JSON.parse(JSON.stringify(payload.thisList));
  const toDoItem = toDoItemsCopy.items[payload.index];
  const image = toDoItem.image;
  if (image) {
    delete toDoItemsCopy.items[payload.index].image;
    firebase.storage()
    .ref()
    .child(`${payload.uid}/${payload.createTime}/${image.fileName}`)
    .delete().then(() => {
      payload.callback(toDoItemsCopy);
      
    });
  }
};