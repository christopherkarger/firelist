import React from 'react';
import classes from './Footer.module.scss';
import { Link } from 'react-router-dom';

export default (props) => {
  return (
    <div className={classes.footer}>
       <nav>
         <ul>
           <li><Link to="/">Home</Link></li>
         </ul>
        </nav>
    </div>
  )
}