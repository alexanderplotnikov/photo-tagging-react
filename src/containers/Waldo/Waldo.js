import React, { Component } from 'react';
import Gameboard from '../../components/Gameboard/Gameboard';
import Aux from '../../hoc/aux/aux';
import Modal from '../../components/UI/Modal/Modal';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import Button from '../../components/UI/Button/Button';
import capitalize from '../../helpers/capitalize';
import axios from '../../hoc/axios-orders';
import convertTime from '../../helpers/convertTime';
class Waldo extends Component {
  state = {
    tag: {
      coordinates: [null, null],
    },
    remainingCharacters: [null],
    showTag: false,
    characters: null,
    gameOn: true,
    loaded: false,
    timeStart: null,
    formattedTime: null,
    tolalTimeInMs: null,
    nickname: null,
    leaderboard: [],
    showLeaderboard: false,
    inLeaderboard: false,
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
    const inLeaderboard = localStorage.getItem('inLeaderboard') === 'true';
    const nickname = capitalize(localStorage.getItem('nickname'));

    this.setState({ inLeaderboard, nickname });
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
    e.stopPropagation();
  };
  handleVerifyGuess = (character) => {
    //call to backend with coordinates and character

    const boardX = this.state.tag.coordinates[0];
    const boardY = this.state.tag.coordinates[1];
    const target = this.state.characters[`${character}`];
    if (
      !(boardX >= target.rangeX[0] && boardX <= target.rangeX[1]) ||
      !(boardY >= target.rangeY[0] && boardY <= target.rangeY[1])
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
      const timeStop = Date.now();
      const timeInMs = timeStop - this.state.timeStart;
      const convertedTime = convertTime(timeInMs);
      this.setState({ gameOn: false, formattedTime: convertedTime, timeInMs });
    }
  };
  handleOnLoad = () => {
    const timeStart = Date.now();
    this.setState({ loaded: true, timeStart });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // this.setState({ gameOn: true });
    axios
      .post('/leaderboard.json', {
        nickname: this.state.nickname,
        formattedScore: this.state.formattedTime,
        score: this.state.timeInMs,
      })
      .then((_) => {
        this.getLeaderboard();
      });
    localStorage.setItem('inLeaderboard', true);
    localStorage.setItem('nickname', this.state.nickname);
  };
  getLeaderboard = () => {
    this.setState({ showLeaderboard: true });
    axios
      .get('/leaderboard.json')
      .then((res) => {
        this.setState({ leaderboard: res.data });
      })
      .catch((err) => console.log(err));
  };
  handleInput = (e) => {
    this.setState({ nickname: e.target.value });
  };
  render() {
    const firstTimeUser = (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label htmlFor="username">Enter your nickname</label>
        <input
          id="username"
          required
          onChange={(e) => this.handleInput(e)}
          value={this.state.nickname}
        ></input>
        <Button>Done!</Button>
      </form>
    );
    const returnUser = (
      <Aux>
        <div>
          {this.state.nickname}, you have already solved this mystery before. I
          cannot let you get into Leaderboard again. You are welcome to glance
          at it once more.
        </div>
        <Button clicked={this.getLeaderboard}>View Leaderboard</Button>
      </Aux>
    );
    const prompt = (
      <Aux>
        <h2>Congratulations!</h2>
        <p>You finished it in {this.state.formattedTime}</p>
        {this.state.inLeaderboard ? returnUser : firstTimeUser}
      </Aux>
    );
    let leaderboard = null;
    if (this.state.leaderboard) {
      leaderboard = <Leaderboard leaderboard={this.state.leaderboard} />;
    }
    return (
      <Aux>
        <Modal show={!this.state.gameOn}>
          {this.state.showLeaderboard ? leaderboard : prompt}
        </Modal>
        <Gameboard
          clicked={this.handleTag}
          coordinates={this.state.tag.coordinates}
          remainingCharacters={this.state.remainingCharacters}
          verifyGuess={this.handleVerifyGuess}
          showTag={this.state.showTag}
          foundCharacters={this.foundCharacters}
          loaded={this.state.loaded}
          onload={this.handleOnLoad}
        />
      </Aux>
    );
  }
}

export default Waldo;
