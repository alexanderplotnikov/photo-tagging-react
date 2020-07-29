import React from 'react';
import classes from './Gameboard.module.css';
import Tag from '../../components/Gameboard/Tag/Tag';

const gameboard = (props) => {
  return (
    <div className={classes.Gameboard}>
      <img
        onClick={props.clicked}
        src="https://www.wallpapertip.com/wmimgs/61-615302_waldo-walls-wherewaldocombo-breakerholy-shitthis-is-wheres-waldo.jpg"
        alt="Couldn't load"
      />
      <Tag coordinates={props.coordinates} characters={props.characters} />
    </div>
  );
};

export default gameboard;