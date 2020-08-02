import React from 'react';
import Button from '../UI/Button/Button';
import Aux from '../../hoc/aux/aux';
import classes from './Prompt.module.css';
const prompt = (props) => {
  const firstTimeUser = (
    <form onSubmit={(e) => props.submitted(e)}>
      <div>
        <input
          id="username"
          required
          onChange={(e) => props.changed(e)}
          value={props.nickname}
        />
        <label htmlFor="username">Enter your nickname</label>
      </div>
      <Button>Done!</Button>
    </form>
  );
  const returnUser = (
    <Aux>
      <div>
        {props.nickname}, you have already solved this mystery before. I cannot
        let you get into Leaderboard again. You are welcome to glance at it once
        more.
      </div>
      <Button clicked={props.getLeaderboard}>View Leaderboard</Button>
    </Aux>
  );
  return (
    <div className={classes.Prompt}>
      <h2>Congratulations!</h2>
      <p>You finished it in {props.formattedTime}</p>
      {props.inLeaderboard ? returnUser : firstTimeUser}
    </div>
  );
};

export default prompt;
