import React from 'react';
import PropTypes from 'prop-types';
import ThreadCommentItem from './ThreadCommentItem';

function ThreadCommentList({
  threadId,
  comments,
  authUser,
  onUpVote,
  onDownVote,
}) {
  return (
    <div className="comment-list">
      <h4>
        Komentar (
        {comments.length}
        )
      </h4>
      {comments.map((comment) => (
        <ThreadCommentItem
          key={comment.id}
          {...comment}
          threadId={threadId}
          authUser={authUser}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      ))}
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ThreadCommentList.propTypes = {
  threadId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
  authUser: PropTypes.string.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default ThreadCommentList;
