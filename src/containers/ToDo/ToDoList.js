import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ListToDo } from '../../components/List/List-style';
import { RemoveButton, CheckButton } from '../../components/Button/Button-style';
import { CheckSymbol } from '../../components/Check/Check-style';

const ToDoList = props => {
  return (
    <TransitionGroup component={ListToDo} >
      { (props.thisList.items && props.thisList.items.length > 0) ? props.thisList.items.map((element,index) => {      
        return (
          <CSSTransition key={index} timeout={500} classNames="item">
            <li>
              <CheckButton toggleDone onClick={props.toggleDoneOnItem(index)}>
                { element.done ? <CheckSymbol/> : null }
                <span>Check</span>
              </CheckButton>  
              <Link to={'/edit-item/' + props.createTime + '/' + index + ((props.propsShared) ? '/shared' : '') }>
                <div>{element.item}</div>
              </Link>
              <RemoveButton onClick={props.deleteToDoItem(index)}><span>Remove</span></RemoveButton>
            </li>
          </CSSTransition>
        );
        
      }) : null }
      </TransitionGroup>
  )

};

export default ToDoList;