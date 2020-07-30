import React, { Component } from 'react';
import Gameboard from '../../components/Gameboard/Gameboard';
import Aux from '../../hoc/aux/aux';
class Waldo extends Component {
  state = {
    tag: {
      coordinates: [null, null],
    },
    characters: ['Waldo', 'Peter'],
    showTag: false,
  };
  characters = {
    waldo: {
      posX: 67.5,
      posY: 76,
      rangeX: [66, 69],
      rangeY: [73, 83],
    },
    peter: {
      posX: 0,
      posY: 0,
      rangeX: [0, 4],
      rangeY: [0, 7],
    },
  };
  foundCharacters = [];
  handleTag = (e) => {
    let bounds = e.target.getBoundingClientRect();
    let x = e.clientX - bounds.left;
    let y = e.clientY - bounds.top;
    let rangeX = Math.round((x / e.target.offsetWidth) * 100);
    let rangeY = Math.round((y / e.target.offsetHeight) * 100);
    this.setState({
      tag: { coordinates: [rangeX, rangeY] },
      showTag: true,
    });
  };
  handleVerifyGuess = (character) => {
    //call to backend with coordinates and character

    const boardX = this.state.tag.coordinates[0];
    const boardY = this.state.tag.coordinates[1];

    //backend function
    if (
      !(
        boardX >= this.characters[`${character}`].rangeX[0] &&
        boardX <= this.characters[`${character}`].rangeX[1]
      ) &&
      !(
        boardY >= this.characters[`${character}`].rangeY[0] &&
        boardY <= this.characters[`${character}`].rangeY[1]
      )
    ) {
      console.log('failed');
      return false;
    }
    console.log('you found him!');
    const result = { ...this.characters[`${character}`] };
    this.foundCharacters.push(result);
    console.log(this.foundCharacters);
    this.setState({ showTag: false });
    return true;
  };
  render() {
    return (
      <Aux>
        <Gameboard
          clicked={this.handleTag}
          coordinates={this.state.tag.coordinates}
          characters={this.state.characters}
          verifyGuess={this.handleVerifyGuess}
          showTag={this.state.showTag}
          foundCharacters={this.foundCharacters}
        />
      </Aux>
    );
  }
}

export default Waldo;
