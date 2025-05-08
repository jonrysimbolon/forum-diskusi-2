import { describe, it, expect } from 'vitest';
import leaderboardsReducer from './reducer';

/**
 * test scenario for leaderboardsReducer
 *
 * - leaderboardsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the leaderboards when given by RECEIVE_LEADERBOARDS action
 *
 */

describe('leaderboardsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    const nextState = leaderboardsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return the leaderboards when given by RECEIVE_LEADERBOARDS action', () => {
    const initialState = [];
    const action = {
      type: 'RECEIVE_LEADERBOARDS',
      payload: {
        leaderboards: [
          {
            userId: 'user-1',
            score: 100,
          },
          {
            userId: 'user-2',
            score: 80,
          },
        ],
      },
    };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
