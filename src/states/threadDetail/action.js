import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  TOGGLE_DETAIL_THREAD_VOTE: 'TOGGLE_DETAIL_THREAD_VOTE',
  TOGGLE_COMMENT_VOTE: 'TOGGLE_COMMENT_VOTE',
  ADD_THREAD_DETAIL_COMMENT: 'ADD_THREAD_DETAIL_COMMENT',
};

function receiveThreadDetail(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

function toggleCommentVote({
  threadId, commentId, userId, voteType,
}) {
  return {
    type: ActionType.TOGGLE_COMMENT_VOTE,
    payload: {
      threadId,
      commentId,
      userId,
      voteType,
    },
  };
}

function toggleDetailThreadVote({ threadId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_DETAIL_THREAD_VOTE,
    payload: { threadId, userId, voteType },
  };
}

function addThreadDetailComment(comment) {
  return {
    type: ActionType.ADD_THREAD_DETAIL_COMMENT,
    payload: { comment },
  };
}

function asyncToggleDetailThreadCommentVote(threadId, voteType) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    try {
      dispatch(toggleDetailThreadVote({ userId: authUser.id, voteType }));
      await api.toggleThreadVote(threadId, voteType);
    } catch (err) {
      alert(err.message);
      dispatch(toggleDetailThreadVote({ userId: authUser.id, voteType }));
    }
    dispatch(hideLoading());
  };
}

function asyncToggleCommentVote(threadId, commentId, voteType) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();

    try {
      dispatch(toggleCommentVote({ commentId, userId: authUser.id, voteType }));
      await api.toggleVoteComment(threadId, commentId, voteType);
    } catch (err) {
      alert(err.message);
      dispatch(toggleCommentVote({ commentId, userId: authUser.id, voteType }));
    }
    dispatch(hideLoading());
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threadDetail = await api.getDetailThread(threadId);
      dispatch(receiveThreadDetail(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddCommentThread({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await api.createComment({ threadId, content });
      const newComment = response.data.comment;
      dispatch(addThreadDetailComment(newComment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  asyncReceiveThreadDetail,
  asyncAddCommentThread,
  asyncToggleCommentVote,
  asyncToggleDetailThreadCommentVote,
};
