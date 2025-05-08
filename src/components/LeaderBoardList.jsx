import React from 'react';
import LeaderboardItem from './LeaderBoardItem';

function LeaderboardList({ leaderboards }) {
  return (
    <div className="leaderboard-list">
      <div className="leaderboard-list__header">
        <span>👤 Pengguna</span>
        <span>🔥 Skor</span>
      </div>
      {leaderboards.map((leaderboard) => (
        <LeaderboardItem
          key={leaderboard.user.id}
          user={leaderboard.user}
          score={leaderboard.score}
        />
      ))}
    </div>
  );
}

export default LeaderboardList;
