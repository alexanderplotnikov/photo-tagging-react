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
      ratioX: [66, 69],
      ratioY: [73, 83],
    },
    peter: {
      ratioX: [0, 4],
      ratioY: [0, 7],
    },
  };

  handleTag = (e) => {
    let bounds = e.target.getBoundingClientRect();
    let x = e.clientX - bounds.left;
    let y = e.clientY - bounds.top;
    let ratioX = Math.round((x / e.target.offsetWidth) * 100);
    let ratioY = Math.round((y / e.target.offsetHeight) * 100);
    this.setState({
      tag: { coordinates: [ratioX, ratioY] },
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
        boardX >= this.characters[`${character}`].ratioX[0] &&
        boardX <= this.characters[`${character}`].ratioX[1]
      ) &&
      !(
        boardY >= this.characters[`${character}`].ratioY[0] &&
        boardY <= this.characters[`${character}`].ratioY[1]
      )
    ) {
      console.log('failed');
      return false;
    }
    console.log('you found him!');
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
        />
      </Aux>
    );
  }
}

export default Waldo;
