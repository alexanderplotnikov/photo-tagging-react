import React, { Component } from 'react';
import Gameboard from '../../components/Gameboard/Gameboard';
import Aux from '../../hoc/aux/aux';

import axios from '../../hoc/axios-orders';

class Waldo extends Component {
  state = {
    tag: {
      coordinates: [null, null],
    },
    remainingCharacters: [null],
    showTag: false,
    characters: null,
    gameOn: true,
    loading: true,
  };

  componentDidMount() {
    axios
      .get('/characters.json')
      .then((res) => {
        const setupCharacters = Object.keys(res.data).map((key) => {
          return key;
        });
        this.setState({
          characters: res.data,
          remainingCharacters: setupCharacters,
        });
      })
      .catch((err) => console.log(err));
  }
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
        boardX >= this.state.characters[`${character}`].rangeX[0] &&
        boardX <= this.state.characters[`${character}`].rangeX[1]
      ) &&
      !(
        boardY >= this.state.characters[`${character}`].rangeY[0] &&
        boardY <= this.state.characters[`${character}`].rangeY[1]
      )
    ) {
      return false;
    }
    const remainingCharacters = [...this.state.remainingCharacters];
    const index = remainingCharacters.indexOf(character);
    if (index > -1) {
      remainingCharacters.splice(index, 1);
    }
    const result = { ...this.state.characters[`${character}`] };
    this.foundCharacters.push(result);
    this.setState({ showTag: false, remainingCharacters });
    this.checkGameState(remainingCharacters);
    return true;
  };
  checkGameState = (remainingCharacters) => {
    if (remainingCharacters.length === 0) {
      this.setState({ gameOn: false });
    }
  };
  render() {
    return (
      <Aux>
        {this.state.gameOn ? <p>Game ON</p> : <p>Game over</p>}

        <Gameboard
          clicked={this.handleTag}
          coordinates={this.state.tag.coordinates}
          remainingCharacters={this.state.remainingCharacters}
          verifyGuess={this.handleVerifyGuess}
          showTag={this.state.showTag}
          foundCharacters={this.foundCharacters}
        />
      </Aux>
    );
  }
}

export default Waldo;
