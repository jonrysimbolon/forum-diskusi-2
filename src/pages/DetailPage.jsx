import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  asyncAddCommentThread,
  asyncToggleCommentVote,
  asyncToggleDetailThreadCommentVote,
} from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';
import useInput from '../hooks/useInput';

function DetailPage() {
  const { id } = useParams();
  const { detailThread = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  const [commentContent, onCommentChange, setCommentContent] = useInput('');

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onUpVoteThread = (threadId, isUpVoted) => {
    dispatch(
      asyncToggleDetailThreadCommentVote(
        threadId,
        isUpVoted ? 'neutral-vote' : 'up-vote',
      ),
    );
  };

  const onDownVoteThread = (threadId, isDownVoted) => {
    dispatch(
      asyncToggleDetailThreadCommentVote(
        threadId,
        isDownVoted ? 'neutral-vote' : 'down-vote',
      ),
    );
  };

  const onUpVoteComment = (threadId, commentId, isUpVoted) => {
    dispatch(
      asyncToggleCommentVote(
        threadId,
        commentId,
        isUpVoted ? 'neutral-vote' : 'up-vote',
      ),
    );
  };

  const onDownVoteComment = (threadId, commentId, isDownVoted) => {
    dispatch(
      asyncToggleCommentVote(
        threadId,
        commentId,
        isDownVoted ? 'neutral-vote' : 'down-vote',
      ),
    );
  };

  const onAddComment = () => {
    if (commentContent.trim()) {
      dispatch(
        asyncAddCommentThread({ threadId: id, content: commentContent }),
      );
      setCommentContent('');
    }
  };

  if (!detailThread) {
    return null;
  }

  return (
    <ThreadDetail
      {...detailThread}
      authUser={authUser.id}
      onUpVote={onUpVoteThread}
      onDownVote={onDownVoteThread}
      onAddComment={onAddComment}
      onUpVoteComment={onUpVoteComment}
      onDownVoteComment={onDownVoteComment}
      commentContent={commentContent}
      onCommentChange={onCommentChange}
    />
  );
}

export default DetailPage;
