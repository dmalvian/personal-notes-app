import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import path from '../utils/path';

function AddButton() {
  const navigate = useNavigate();

  return (
    <button className="action" title="Tambah" onClick={() => navigate(path.ADD_NOTE)}>
      <FiPlus />
    </button>
  );
}

export default AddButton;
