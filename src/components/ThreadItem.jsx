import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  FaThumbsUp,
  FaRegThumbsUp,
  FaThumbsDown,
  FaRegThumbsDown,
} from 'react-icons/fa';
import parser from 'html-react-parser';
import postedAt from '../utils';
import VoteItem from './VoteItem';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  totalComments,
  authUser,
  upVote,
  downVote,
}) {
  const navigate = useNavigate();

  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const handleUpVote = (e) => {
    e.stopPropagation();
    upVote?.(id, isUpVoted);
  };

  const handleDownVote = (e) => {
    e.stopPropagation();
    downVote?.(id, isDownVoted);
  };

  const handleNavigate = () => {
    navigate(`/threads/${id}`);
  };

  const handlePress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/threads/${id}`);
    }
  };

  return (
    <div
      className="thread-item"
      role="button"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={handlePress}
    >
      <div className="thread-meta">
        <span className="thread-category">
          #
          {category}
        </span>
        <span className="thread-date">{postedAt(createdAt)}</span>
      </div>
      <div className="thread-title">{title}</div>
      <div className="thread-body">{parser(body)}</div>
      <div className="thread-votes">
        <VoteItem
          type="upVote"
          count={upVotesBy.length}
          event={handleUpVote}
          isVoted={isUpVoted}
          icon={isUpVoted ? <FaThumbsUp /> : <FaRegThumbsUp />}
        />
        <VoteItem
          type="downVote"
          count={downVotesBy.length}
          event={handleDownVote}
          isVoted={isDownVoted}
          icon={isDownVoted ? <FaThumbsDown /> : <FaRegThumbsDown />}
        />
      </div>
      <div className="thread-footer">
        <div className="thread-comments">
          💬
          {totalComments}
          {' '}
          komentar
        </div>
        <div className="thread-owner">
          Dibuat oleh
          {' '}
          <strong>{owner.name}</strong>
        </div>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  authUser: PropTypes.string.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export { threadItemShape };
export default ThreadItem;
