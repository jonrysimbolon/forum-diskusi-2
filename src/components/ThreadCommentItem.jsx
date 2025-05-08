import React from 'react';
import PropTypes from 'prop-types';
import {
  FaThumbsUp,
  FaRegThumbsUp,
  FaThumbsDown,
  FaRegThumbsDown,
} from 'react-icons/fa';
import parser from 'html-react-parser';
import postedAt from '../utils';
import VoteItem from './VoteItem';

function ThreadCommentItem({
  id,
  content,
  owner,
  createdAt,
  upVotesBy,
  downVotesBy,
  threadId,
  authUser,
  onUpVote,
  onDownVote,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const handleUpVote = () => {
    onUpVote(threadId, id, isUpVoted);
  };

  const handleDownVote = () => {
    onDownVote(threadId, id, isDownVoted);
  };

  return (
    <div className="comment-item">
      <div className="comment-item__header">
        <img
          src={owner.avatar}
          alt={owner.name}
          className="comment-item__avatar"
        />
        <span className="comment-item__name">{owner.name}</span>
        <span className="comment-item__date">{postedAt(createdAt)}</span>
      </div>
      <div className="comment-item__content">{parser(content)}</div>
      <div className="comment-item__votes">
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
    </div>
  );
}

ThreadCommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default ThreadCommentItem;
