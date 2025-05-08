import React from 'react';
import PropTypes from 'prop-types';
import {
  FaThumbsUp,
  FaRegThumbsUp,
  FaThumbsDown,
  FaRegThumbsDown,
} from 'react-icons/fa';
import VoteItem from './VoteItem';

function ThreadDetailAction({
  id,
  upVotesBy,
  downVotesBy,
  authUser,
  onUpVote,
  onDownVote,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const handleUpvote = () => {
    onUpVote(id, isUpVoted);
  };

  const handleDownvote = () => {
    onDownVote(id, isDownVoted);
  };

  return (
    <div className="thread-detail-action">
      <VoteItem
        type="upVote"
        count={upVotesBy.length}
        event={handleUpvote}
        isVoted={isUpVoted}
        icon={isUpVoted ? <FaThumbsUp /> : <FaRegThumbsUp />}
      />
      <VoteItem
        type="downVote"
        count={downVotesBy.length}
        event={handleDownvote}
        isVoted={isDownVoted}
        icon={isDownVoted ? <FaThumbsDown /> : <FaRegThumbsDown />}
      />
    </div>
  );
}

ThreadDetailAction.propTypes = {
  id: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default ThreadDetailAction;
