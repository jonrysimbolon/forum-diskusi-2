import React from 'react';
import PropTypes from 'prop-types';
import postedAt from '../utils';

function ThreadDetailHeader({
  owner,
  createdAt,
  category,
  title,
}) {
  return (
    <div className="thread-detail-header">
      <div className="thread-detail-header__category">
        #
        {category}
      </div>
      <h1 className="thread-detail-header__title">{title}</h1>
      <div className="thread-detail-header__owner">
        <div className="thread-detail-header__info">
          <span className="thread-detail-header__name">{owner.name}</span>
          <span className="thread-detail-header__date">
            {postedAt(createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

ThreadDetailHeader.propTypes = {
  owner: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ThreadDetailHeader;
