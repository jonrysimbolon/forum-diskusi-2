import React from 'react';
import PropTypes from 'prop-types';
import ThreadDetailHeader from './ThreadDetailHeader';
import ThreadDetailContent from './ThreadDetailContent';
import ThreadDetailAction from './ThreadDetailAction';
import ThreadCommentInput from './ThreadCommentInput';
import ThreadCommentList from './ThreadCommentList';

function ThreadDetail({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  comments,
  authUser,
  onUpVote,
  onDownVote,
  onAddComment,
  onUpVoteComment,
  onDownVoteComment,
  commentContent,
  onCommentChange,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const enrichedComments = comments.map((comment) => ({
    ...comment,
    isUpVoted: comment.upVotesBy.includes(authUser),
    isDownVoted: comment.downVotesBy.includes(authUser),
  }));

  return (
    <div className="thread-shell">
      <ThreadDetailHeader
        owner={owner}
        createdAt={createdAt}
        category={category}
        title={title}
      />
      <ThreadDetailContent body={body} />
      <ThreadDetailAction
        id={id}
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
        authUser={authUser}
        isUpVoted={isUpVoted}
        isDownVoted={isDownVoted}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
      />
      <ThreadCommentInput
        value={commentContent}
        onChange={onCommentChange}
        onSubmit={onAddComment}
      />
      <ThreadCommentList
        threadId={id}
        comments={enrichedComments}
        authUser={authUser}
        onUpVote={onUpVoteComment}
        onDownVote={onDownVoteComment}
      />
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

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
  authUser: PropTypes.string.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
  onUpVoteComment: PropTypes.func.isRequired,
  onDownVoteComment: PropTypes.func.isRequired,
  commentContent: PropTypes.string.isRequired,
  onCommentChange: PropTypes.func.isRequired,
};

export default ThreadDetail;
