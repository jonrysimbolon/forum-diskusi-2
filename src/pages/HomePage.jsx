import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ThreadsList from '../components/ThreadsList';
import asyncPopulateUsersAndThreads from '../states/shared/action';
import { asyncToggleThreadVote } from '../states/threads/action';

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpVote = (id, isUpVoted) => {
    dispatch(asyncToggleThreadVote(id, isUpVoted ? 'neutral-vote' : 'up-vote'));
  };

  const onDownVote = (id, isDownVoted) => {
    dispatch(
      asyncToggleThreadVote(id, isDownVoted ? 'neutral-vote' : 'down-vote'),
    );
  };

  const categories = [...new Set(threads.map((thread) => thread.category))];

  const threadList = threads
    .filter((thread) => (selectedCategory ? thread.category === selectedCategory : true))
    .map((thread) => ({
      ...thread,
      owner: users.find((user) => user.id === thread.ownerId),
      authUser: authUser.id,
    }));

  return (
    <section className="home-page">
      <div className="categories">
        <p>Kategori:</p>
        <div className="category-list">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(
                selectedCategory === category ? null : category,
              )}
            >
              #
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="home-header">
        <h2 className="home-title">Ayo berdiskusi ...?!</h2>
        <Link to="/new" className="add-thread-button">
          + Buat Diskusi
        </Link>
      </div>

      <ThreadsList
        threads={threadList}
        upVote={onUpVote}
        downVote={onDownVote}
      />
    </section>
  );
}

export default HomePage;
