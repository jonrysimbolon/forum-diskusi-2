import React from 'react';
import PropTypes from 'prop-types';

function ThreadCommentInput({ value, onChange, onSubmit }) {
  return (
    <div className="comment-input">
      <textarea placeholder="Beri komentar" value={value} onChange={onChange} />
      <button type="button" onClick={onSubmit}>Kirim</button>
    </div>
  );
}

ThreadCommentInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ThreadCommentInput;
