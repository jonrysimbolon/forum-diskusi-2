import React from 'react';

function LeaderBoardItem({ user, score }) {
  return (
    <div className="leaderboard-item">
      <div className="user-info">
        <img className="avatar" src={user.avatar} alt={user.name} />
        <div className="username">
          <strong>{user.name || 'Tidak diketahui'}</strong>
          {user.isAuthUser && <em> (Anda)</em>}
        </div>
      </div>
      <div className="user-score">{score ?? 0}</div>
    </div>
  );
}

export default LeaderBoardItem;
