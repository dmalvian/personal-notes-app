import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

function AddButton() {
  const navigate = useNavigate();

  return (
    <button className="action" title="Tambah" onClick={() => navigate('/add')}>
      <FiPlus />
    </button>
  );
}

export default AddButton;
