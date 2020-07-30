import React from 'react';
import classes from './FoundCharacters.module.css';
import Aux from '../../../hoc/aux/aux';
const foundCharacter = (props) => {
  const characters = props.foundCharacters.map((character) => {
    let style = {
      height: '8vh',
      width: '8vh',
      top: `calc(${character.posY}% - 4vh)`,
      left: `calc(${character.posX}% - 4vh)`,
    };
    console.log(style);
    return (
      <div
        key={character.posX + character.posY}
        className={classes.FoundCharacters}
        style={style}
      ></div>
    );
  });

  return <Aux>{characters}</Aux>;
};

export default foundCharacter;
