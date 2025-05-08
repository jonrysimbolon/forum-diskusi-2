import React from 'react';
import PropTypes from 'prop-types';

function ThreadDetailContent({ body }) {
  return (
    <div
      className="thread-detail-content"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}

ThreadDetailContent.propTypes = {
  body: PropTypes.string.isRequired,
};

export default ThreadDetailContent;
