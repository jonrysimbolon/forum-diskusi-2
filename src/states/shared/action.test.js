import {
  afterEach, beforeEach, describe, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import asyncPopulateUsersAndThreads from './action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

/**
 * skenario test
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Test 1',
    content: 'Content Test 1',
    upVotesBy: [],
    downVotesBy: [],
    createdAt: '2022-09-22T10:06:55.588Z',
  },
];

const fakeUsersResponse = [
  {
    id: 'user-1',
    name: 'User  Test 1',
    photo: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    delete api._getAllUsers;
    delete api._getAllThreads;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.getAllUsers = vi.fn(() => Promise.resolve(fakeUsersResponse));
    api.getAllThreads = vi.fn(() => Promise.resolve(fakeThreadsResponse));

    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(fakeUsersResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadsActionCreator(fakeThreadsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    api.getAllUsers = vi.fn(() => Promise.reject(fakeErrorResponse));
    api.getAllThreads = vi.fn(() => Promise.reject(fakeErrorResponse));

    const dispatch = vi.fn();

    window.alert = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
