import React from 'react';
import classes from './Gameboard.module.css';
import Tag from '../../components/Gameboard/Tag/Tag';
import FoundCharacters from './FoundCharacter/FoundCharacter';
import Loader from '../UI/Loader/Loader';

const Gameboard = (props) => {
  return (
    <div
      className={classes.Gameboard}
      style={props.loaded ? { display: 'inline-block' } : { display: 'block' }}
    >
      {props.loaded ? null : <Loader />}
      <img
        onClick={props.clicked}
        src="https://www.wallpapertip.com/wmimgs/61-615302_waldo-walls-wherewaldocombo-breakerholy-shitthis-is-wheres-waldo.jpg"
        alt="Couldn't load"
        style={props.loaded ? {} : { display: 'none' }}
        onLoad={() => props.onload()}
      />
      <Tag
        verify={props.verifyGuess}
        coordinates={props.coordinates}
        characters={props.remainingCharacters}
        show={props.showTag}
      />
      <FoundCharacters foundCharacters={props.foundCharacters} />
    </div>
  );
};

export default Gameboard;
