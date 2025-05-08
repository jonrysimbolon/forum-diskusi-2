import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';

/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the auth user when given by SET_AUTH_USER action
 *  - should return null when given by UNSET_AUTH_USER action
 *
 */

describe('authUserReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };
    const nextState = authUserReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return the auth user when given by SET_AUTH_USER action', () => {
    const initialState = null;
    const action = {
      type: 'SET_AUTH_USER',
      payload: {
        authUser: {
          id: 'user-1',
          name: 'User One',
        },
      },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should return null when given by UNSET_AUTH_USER action', () => {
    const initialState = {
      id: 'user-1',
      name: 'User One',
    };
    const action = {
      type: 'UNSET_AUTH_USER',
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBeNull();
  });
});
