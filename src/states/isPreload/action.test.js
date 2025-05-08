import {
  beforeEach, describe, it, vi, expect,
} from 'vitest';
import * as action from './action';
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

// Scenario test
/**
 * asyncPreloadProcess thunk
 * - should dispatch setAuthUserActionCreator and setIsPreloadActionCreator correctly when data fetching success
 * - should dispatch setAuthUserActionCreator with null and setIsPreloadActionCreator correctly when data fetching failed
 */

const fakeAuthUserResponse = {
  id: 1,
  name: 'Test User',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('action', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  describe('asyncPreloadProcess thunk', () => {
    it('should dispatch setAuthUserActionCreator and setIsPreloadActionCreator correctly when data fetching success', async () => {
      api.getOwnProfile = vi.fn(() => Promise.resolve(fakeAuthUserResponse));

      await action.asyncPreloadProcess()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUserResponse));

      expect(dispatch).toHaveBeenCalledWith({
        type: action.ActionType.SET_IS_PRELOAD,
        payload: { isPreload: false },
      });

      expect(api.getOwnProfile).toHaveBeenCalled();
    });

    it('should dispatch setAuthUserActionCreator with null and setIsPreloadActionCreator correctly when data fetching failed', async () => {
      api.getOwnProfile = vi.fn(() => Promise.reject(fakeErrorResponse));

      await action.asyncPreloadProcess()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));

      expect(dispatch).toHaveBeenCalledWith({
        type: action.ActionType.SET_IS_PRELOAD,
        payload: { isPreload: false },
      });

      expect(api.getOwnProfile).toHaveBeenCalled();
    });
  });
});
