import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';

/**
 * test scenario for threadDetailReducer
 *
 * - threadDetailReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the thread detail when given by RECEIVE_THREAD_DETAIL action
 *  - should return the thread detail with the toggled vote when given by TOGGLE_DETAIL_THREAD_VOTE action
 *  - should return the thread detail with the toggled comment vote when given by TOGGLE_COMMENT_VOTE action
 *  - should return the thread detail with the new comment when given by ADD_THREAD_DETAIL_COMMENT action
 *
 */

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };
    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return the thread detail when given by RECEIVE_THREAD_DETAIL action', () => {
    const initialState = null;
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        threadDetail: {
          id: 'thread-1',
          title: 'Thread Test 1',
          content: 'Content Test 1',
          upVotesBy: [],
          downVotesBy: [],
          comments: [],
        },
      },
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return the thread detail with the toggled vote when given by TOGGLE_DETAIL_THREAD_VOTE action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Test 1',
      content: 'Content Test 1',
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const actionUpVote = {
      type: 'TOGGLE_DETAIL_THREAD_VOTE',
      payload: {
        userId: 'user-1',
        voteType: 'up-vote',
      },
    };

    const nextState = threadDetailReducer(initialState, actionUpVote);
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [actionUpVote.payload.userId],
      downVotesBy: [],
    });

    const actionDownVote = {
      type: 'TOGGLE_DETAIL_THREAD_VOTE',
      payload: {
        userId: 'user-1',
        voteType: 'down-vote',
      },
    };

    const nextState2 = threadDetailReducer(nextState, actionDownVote);
    expect(nextState2).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [actionDownVote.payload.userId],
    });

    const actionNeutralVote = {
      type: 'TOGGLE_DETAIL_THREAD_VOTE',
      payload: {
        userId: 'user-1',
        voteType: 'neutral-vote',
      },
    };

    const nextState3 = threadDetailReducer(nextState2, actionNeutralVote);
    expect(nextState3).toEqual(initialState);
  });

  it('should return the thread detail with the toggled comment vote when given by TOGGLE_COMMENT_VOTE action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Test 1',
      content: 'Content Test 1',
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Comment Test 1',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const actionUpVote = {
      type: 'TOGGLE_COMMENT_VOTE',
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
        voteType: 'up-vote',
      },
    };

    const nextState = threadDetailReducer(initialState, actionUpVote);
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [actionUpVote.payload.userId],
          downVotesBy: [],
        },
      ],
    });

    const actionDownVote = {
      type: 'TOGGLE_COMMENT_VOTE',
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
        voteType: 'down-vote',
      },
    };

    const nextState2 = threadDetailReducer(nextState, actionDownVote);
    expect(nextState2).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
          downVotesBy: [actionDownVote.payload.userId],
        },
      ],
    });

    const actionNeutralVote = {
      type: 'TOGGLE_COMMENT_VOTE',
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
        voteType: 'neutral-vote',
      },
    };

    const nextState3 = threadDetailReducer(nextState2, actionNeutralVote);
    expect(nextState3).toEqual(initialState);
  });

  it('should return the thread detail with the new comment when given by ADD_THREAD_DETAIL_COMMENT action', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Test 1',
      content: 'Content Test 1',
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Comment Test 1',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const newComment = {
      id: 'comment-2',
      content: 'Comment Test 2',
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: 'ADD_THREAD_DETAIL_COMMENT',
      payload: {
        comment: newComment,
      },
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      comments: [newComment, ...initialState.comments],
    });
  });
});
