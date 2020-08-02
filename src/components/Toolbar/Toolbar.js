import React from 'react';
import classes from './Toolbar.module.css';

const toolbar = (props) => {
  const greeting = null;
  return (
    <div className={classes.Toolbar}>
      <h1>Where's Waldo?</h1>
      {greeting}
    </div>
  );
};

export default toolbar;
