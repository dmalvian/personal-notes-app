import React, { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { addNote } from '../utils/local-data';
import { useNavigate } from 'react-router-dom';

function AddPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const navigate = useNavigate();

  function onSaveHandler(event) {
    event.preventDefault();
    addNote({ title, body });
    navigate('/');
  }

  return (
    <section className="add-new-page">
      <div className="add-new-page__input">
        <input
          className="add-new-page__input__title"
          placeholder="Title"
          value={title}
          onChange={(event) => {setTitle(event.target.value)}}
        />
        <div
          className="add-new-page__input__body"
          contentEditable="true"
          data-placeholder="Body"
          onInput={(event) => {setBody(event.target.innerHTML)}}
        />
      </div>
      <div className="add-new-page__action">
        <button className="action" type="button" title="Simpan" onClick={onSaveHandler}><FiSave /></button>
      </div>
    </section>
  );
}

export default AddPage;
