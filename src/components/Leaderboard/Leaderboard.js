import React from 'react';
import classes from './Leaderboard.module.css';
import orderLeaderboardByTime from '../../helpers/order';
const leaderboard = (props) => {
  const leaderboard = Object.keys(props.leaderboard)
    .map((key) => {
      return key;
    })
    .sort((a, b) => orderLeaderboardByTime(a, b))
    .map((key, index) => (
      <tr>
        <td>{index}</td>
        <td>{props.leaderboard[key].nickname}</td>
        <td>{props.leaderboard[key].formattedScore}</td>
      </tr>
    ));
  return (
    <div className={classes.Leaderboard}>
      <h2>Leaderboard</h2>
      <table>
        <tr>
          <td></td>
          <td>Nickname</td>
          <td>Score</td>
        </tr>
        {leaderboard}
      </table>
    </div>
  );
};

export default leaderboard;
