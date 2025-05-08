import {
  beforeEach, describe, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import * as action from './action';
import api from '../../utils/api';

/**
 * skenario test
 *
 * - asyncPopulateLeaderBoards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

const fakeLeaderboards = [
  { user: { id: 1, name: 'User1' }, score: 100 },
  { user: { id: 2, name: 'User2' }, score: 90 },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateLeaderBoards thunk', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.getAllLeaderBoards = vi.fn(() => Promise.resolve(fakeLeaderboards));

    await action.asyncPopulateLeaderBoards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: action.ActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards: fakeLeaderboards,
      },
    });
    expect(api.getAllLeaderBoards).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    api.getAllLeaderBoards = vi.fn(() => Promise.reject(fakeErrorResponse));

    window.alert = vi.fn();

    await action.asyncPopulateLeaderBoards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
