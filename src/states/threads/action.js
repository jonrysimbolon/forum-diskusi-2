import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_THREAD_VOTE: 'TOGGLE_THREAD_VOTE',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleThreadVoteAction({ threadId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_THREAD_VOTE,
    payload: { threadId, userId, voteType },
  };
}

function asyncToggleThreadVote(threadId, voteType) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();

    try {
      dispatch(
        toggleThreadVoteAction({ threadId, userId: authUser.id, voteType }),
      );
      await api.toggleThreadVote(threadId, voteType);
    } catch (err) {
      alert(err.message);
      dispatch(
        toggleThreadVoteAction({ threadId, userId: authUser.id, voteType }),
      );
    }
    dispatch(hideLoading());
  };
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncAddThread,
  toggleThreadVoteAction,
  asyncToggleThreadVote,
};
