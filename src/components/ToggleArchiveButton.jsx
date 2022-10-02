import React from 'react';
import PropTypes from 'prop-types';
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi';

function ToggleArchiveButton({ id, archived, toggleArchiveNote }) {
  return (
    <button
      className="action"
      title={!archived ? 'Arsipkan' : 'Aktifkan'}
      onClick={() => toggleArchiveNote(id, archived)}
    >
      {!archived ? <BiArchiveIn /> : <BiArchiveOut />}
    </button>
  );
}

ToggleArchiveButton.propTypes = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  toggleArchiveNote: PropTypes.func.isRequired,
}

export default ToggleArchiveButton;
