import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';

/**
 * test scenario for threadsReducer
 *
 * - threadsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the threads with the new thread when given by ADD_THREAD action
 *  - should return the threads with the toggled vote when given by TOGGLE_THREAD_VOTE action
 *
 */

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Test 1',
            content: 'Content Test 1',
            upVotesBy: [],
            downVotesBy: [],
            createdAt: '2022-09-22T10:06:55.588Z',
          },
          {
            id: 'thread-2',
            title: 'Thread Test 2',
            content: 'Content Test 2',
            upVotesBy: [],
            downVotesBy: [],
            createdAt: '2022-09-22T10:06:55.588Z',
          },
        ],
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Test 1',
        content: 'Content Test 1',
        upVotesBy: [],
        downVotesBy: [],
        createdAt: '2022-09-22T10:06:55.588Z',
      },
    ];
    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Test 2',
          content: 'Content Test 2',
          upVotesBy: [],
          downVotesBy: [],
          createdAt: '2022-09-22T10:06:56.588Z',
        },
      },
    };
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return the threads with the toggled vote when given by TOGGLE_THREAD_VOTE action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Test 1',
        content: 'Content Test 1',
        upVotesBy: [],
        downVotesBy: [],
        createdAt: '2022-09-22T10:06:55.588Z',
      },
    ];
    const actionUpVote = {
      type: 'TOGGLE_THREAD_VOTE',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
        voteType: 'up-vote',
      },
    };
    const nextState = threadsReducer(initialState, actionUpVote);
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [actionUpVote.payload.userId],
        downVotesBy: [],
      },
    ]);

    const actionDownVote = {
      type: 'TOGGLE_THREAD_VOTE',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
        voteType: 'down-vote',
      },
    };
    const nextState2 = threadsReducer(nextState, actionDownVote);
    expect(nextState2).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [actionDownVote.payload.userId],
      },
    ]);

    const actionNeutralVote = {
      type: 'TOGGLE_THREAD_VOTE',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
        voteType: 'neutral-vote',
      },
    };
    const nextState3 = threadsReducer(nextState2, actionNeutralVote);
    expect(nextState3).toEqual(initialState);
  });
});
