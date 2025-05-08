import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardList from '../components/LeaderBoardList';
import { asyncPopulateLeaderBoards } from '../states/leaderBoards/action';

function LeaderBoardPage() {
  const leaderboards = useSelector((states) => states.leaderboards) || [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateLeaderBoards());
  }, [dispatch]);

  return (
    <section className="leaderboard-page">
      <div className="leaderboard-header">
        <h2>Klasemen Pengguna Aktif</h2>
        <p>Siapa yang paling aktif minggu ini? 👑</p>
      </div>
      <LeaderboardList leaderboards={leaderboards} />
    </section>
  );
}

export default LeaderBoardPage;
