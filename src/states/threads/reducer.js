import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;

    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];

    case ActionType.TOGGLE_THREAD_VOTE:
      return threads.map((thread) => {
        if (thread.id !== action.payload.threadId) return thread;

        const { userId, voteType } = action.payload;

        let updatedUpVotesBy = [...thread.upVotesBy];
        let updatedDownVotesBy = [...thread.downVotesBy];

        switch (voteType) {
          case 'up-vote':
            if (!updatedUpVotesBy.includes(userId)) {
              updatedUpVotesBy.push(userId);
            }
            updatedDownVotesBy = updatedDownVotesBy.filter(
              (id) => id !== userId,
            );
            break;

          case 'down-vote':
            if (!updatedDownVotesBy.includes(userId)) {
              updatedDownVotesBy.push(userId);
            }
            updatedUpVotesBy = updatedUpVotesBy.filter((id) => id !== userId);
            break;

          case 'neutral-vote':
            updatedUpVotesBy = updatedUpVotesBy.filter((id) => id !== userId);
            updatedDownVotesBy = updatedDownVotesBy.filter(
              (id) => id !== userId,
            );
            break;

          default:
            return thread;
        }

        return {
          ...thread,
          upVotesBy: updatedUpVotesBy,
          downVotesBy: updatedDownVotesBy,
        };
      });

    default:
      return threads;
  }
}

export default threadsReducer;
