import { ActionType } from './action';

function threadDetailReducer(detailThread = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;

    case ActionType.TOGGLE_DETAIL_THREAD_VOTE: {
      const { userId, voteType } = action.payload;

      let updatedUpVotesBy = [...detailThread.upVotesBy];
      let updatedDownVotesBy = [...detailThread.downVotesBy];

      switch (voteType) {
        case 'up-vote':
          if (!updatedUpVotesBy.includes(userId)) {
            updatedUpVotesBy.push(userId);
          }
          updatedDownVotesBy = updatedDownVotesBy.filter((id) => id !== userId);
          break;

        case 'down-vote':
          if (!updatedDownVotesBy.includes(userId)) {
            updatedDownVotesBy.push(userId);
          }
          updatedUpVotesBy = updatedUpVotesBy.filter((id) => id !== userId);
          break;

        case 'neutral-vote':
          updatedUpVotesBy = updatedUpVotesBy.filter((id) => id !== userId);
          updatedDownVotesBy = updatedDownVotesBy.filter((id) => id !== userId);
          break;

        default:
          return detailThread;
      }

      return {
        ...detailThread,
        upVotesBy: updatedUpVotesBy,
        downVotesBy: updatedDownVotesBy,
      };
    }

    case ActionType.TOGGLE_COMMENT_VOTE: {
      const { commentId, userId, voteType } = action.payload;

      const updatedComments = detailThread.comments.map((comment) => {
        if (comment.id !== commentId) return comment;

        let updatedUpVotesBy = [...comment.upVotesBy];
        let updatedDownVotesBy = [...comment.downVotesBy];

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
            return comment;
        }

        return {
          ...comment,
          upVotesBy: updatedUpVotesBy,
          downVotesBy: updatedDownVotesBy,
        };
      });

      return {
        ...detailThread,
        comments: updatedComments,
      };
    }

    case ActionType.ADD_THREAD_DETAIL_COMMENT:
      return {
        ...detailThread,
        comments: [action.payload.comment, ...detailThread.comments],
      };

    default:
      return detailThread;
  }
}

export default threadDetailReducer;
