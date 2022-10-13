import React, { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { addNote } from '../utils/network-data';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../utils/index';
import { useLocale } from '../hooks/locale';

function AddPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const navigate = useNavigate();
  const { translate: __ } = useLocale();

  async function onSubmit(event) {
    event.preventDefault();

    const { error } = await addNote({ title, body });

    if (!error) {
      navigate('/');
      showToast(__('Catatan berhasil ditambahkan'));
    }
  }

  return (
    <section className="add-new-page">
      <form onSubmit={onSubmit}>
        <div className="add-new-page__input">
          <input
            className="add-new-page__input__title"
            placeholder={__('Judul')}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <div
            className="add-new-page__input__body"
            contentEditable="true"
            data-placeholder={__('Isi catatan')}
            onInput={(event) => {
              setBody(event.target.innerHTML);
            }}
          />
        </div>
        <div className="add-new-page__action">
          <button className="action" title="Simpan">
            <FiSave />
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddPage;
