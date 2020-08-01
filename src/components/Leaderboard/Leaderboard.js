import React from 'react';
import classes from './Leaderboard.module.css';
const leaderboard = (props) => {
  const leaderboard = Object.keys(props.leaderboard)
    .map((key) => {
      return key;
    })
    .sort((a, b) => props.leaderboard[a].score > props.leaderboard[b].score)
    .map((key, index) => (
      <tr>
        <td>{index + 1}</td>
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
          <td></td>
          <td>Time</td>
        </tr>
        {leaderboard}
      </table>
    </div>
  );
};

export default leaderboard;
