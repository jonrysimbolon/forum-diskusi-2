import React from 'react';
import PropTypes from 'prop-types';

function VoteItem({
  type, count, event, isVoted, icon,
}) {
  return (
    <div className={`vote-item ${type}`}>
      <button
        type="button"
        onClick={event}
        aria-label={type === 'upVote' ? 'Vote up' : 'Vote down'}
        className={`vote-button ${isVoted ? 'voted' : ''}`}
      >
        {icon}
      </button>
      <p>{count}</p>
    </div>
  );
}

VoteItem.propTypes = {
  type: PropTypes.oneOf(['upVote', 'downVote']).isRequired,
  count: PropTypes.number.isRequired,
  event: PropTypes.func.isRequired,
  isVoted: PropTypes.bool.isRequired,
  icon: PropTypes.node.isRequired,
};

export default VoteItem;
