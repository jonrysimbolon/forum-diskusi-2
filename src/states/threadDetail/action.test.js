import {
  beforeEach, describe, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import * as action from './action';
import api from '../../utils/api';

/**
 * Scenario:
 * - asyncToggleDetailThreadCommentVote thunk
 *   - should dispatch action correctly when vote toggle success
 *   - should dispatch action and call alert correctly when vote toggle failed
 * - asyncToggleCommentVote thunk
 *   - should dispatch action correctly when vote toggle success
 *   - should dispatch action and call alert correctly when vote toggle failed
 * - asyncReceiveThreadDetail thunk
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action and call alert correctly when data fetching failed
 * - asyncAddCommentThread thunk
 *   - should dispatch action correctly when adding comment success
 *   - should dispatch action and call alert correctly when adding comment failed
 */

const fakeThreadDetailResponse = {
  id: 1,
  title: 'Test Thread',
  content: 'This is a test thread',
  upVotesBy: [],
  downVotesBy: [],
  createdAt: '2025-05-08',
};

const fakeCommentResponse = {
  id: 1,
  content: 'Test comment',
  createdAt: '2025-05-08',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('action', () => {
  let dispatch;
  let getState;

  beforeEach(() => {
    dispatch = vi.fn();
    getState = vi.fn(() => ({
      authUser: { id: 1 },
    }));
  });

  describe('asyncToggleDetailThreadCommentVote thunk', () => {
    it('should dispatch action correctly when vote toggle success', async () => {
      api.toggleThreadVote = vi.fn(() => Promise.resolve({}));

      const threadId = 1;
      const voteType = 'upvote';

      await action.asyncToggleDetailThreadCommentVote(threadId, voteType)(
        dispatch,
        getState,
      );

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TOGGLE_DETAIL_THREAD_VOTE',
        payload: { userId: 1, voteType },
      });
      expect(api.toggleThreadVote).toHaveBeenCalledWith(threadId, voteType);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when vote toggle failed', async () => {
      api.toggleThreadVote = vi.fn(() => Promise.reject(fakeErrorResponse));
      window.alert = vi.fn();

      const threadId = 1;
      const voteType = 'upvote';

      await action.asyncToggleDetailThreadCommentVote(threadId, voteType)(
        dispatch,
        getState,
      );

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TOGGLE_DETAIL_THREAD_VOTE',
        payload: { userId: 1, voteType },
      });
      expect(api.toggleThreadVote).toHaveBeenCalledWith(threadId, voteType);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
  });

  describe('asyncToggleCommentVote thunk', () => {
    it('should dispatch action correctly when vote toggle success', async () => {
      api.toggleVoteComment = vi.fn(() => Promise.resolve({}));

      const threadId = 1;
      const commentId = 2;
      const voteType = 'downvote';

      await action.asyncToggleCommentVote(
        threadId,
        commentId,
        voteType,
      )(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TOGGLE_COMMENT_VOTE',
        payload: { commentId, userId: 1, voteType },
      });
      expect(api.toggleVoteComment).toHaveBeenCalledWith(
        threadId,
        commentId,
        voteType,
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when vote toggle failed', async () => {
      api.toggleVoteComment = vi.fn(() => Promise.reject(fakeErrorResponse));
      window.alert = vi.fn();

      const threadId = 1;
      const commentId = 2;
      const voteType = 'downvote';

      await action.asyncToggleCommentVote(
        threadId,
        commentId,
        voteType,
      )(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TOGGLE_COMMENT_VOTE',
        payload: { commentId, userId: 1, voteType },
      });
      expect(api.toggleVoteComment).toHaveBeenCalledWith(
        threadId,
        commentId,
        voteType,
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
  });

  describe('asyncReceiveThreadDetail thunk', () => {
    it('should dispatch action correctly when data fetching success', async () => {
      api.getDetailThread = vi.fn(() => Promise.resolve(fakeThreadDetailResponse));

      const threadId = 1;

      await action.asyncReceiveThreadDetail(threadId)(dispatch);

      expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: 'RECEIVE_THREAD_DETAIL',
        payload: { threadDetail: fakeThreadDetailResponse },
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, hideLoading());

      expect(api.getDetailThread).toHaveBeenCalledWith(threadId);
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
      api.getDetailThread = vi.fn(() => Promise.reject(fakeErrorResponse));
      window.alert = vi.fn();

      const threadId = 1;

      await action.asyncReceiveThreadDetail(threadId)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
  });

  describe('asyncAddCommentThread thunk', () => {
    it('should dispatch action correctly when adding comment success', async () => {
      api.createComment = vi.fn(() => Promise.resolve({ data: { comment: fakeCommentResponse } }));

      const threadId = 1;
      const content = 'New comment';

      await action.asyncAddCommentThread({ threadId, content })(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: 'ADD_THREAD_DETAIL_COMMENT',
        payload: { comment: fakeCommentResponse },
      });
      expect(api.createComment).toHaveBeenCalledWith({ threadId, content });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when adding comment failed', async () => {
      api.createComment = vi.fn(() => Promise.reject(fakeErrorResponse));
      window.alert = vi.fn();

      const threadId = 1;
      const content = 'New comment';

      await action.asyncAddCommentThread({ threadId, content })(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
  });
});
