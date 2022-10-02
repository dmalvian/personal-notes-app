import React from 'react';
import PropTypes from 'prop-types';
import { FiTrash2 } from 'react-icons/fi';

function DeleteButton({ id, deleteNote }) {
  return (
    <button className="action" title="Hapus" onClick={() => deleteNote(id)}>
      <FiTrash2 />
    </button>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

export default DeleteButton;
