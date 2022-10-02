import React from 'react';
import parser from 'html-react-parser';
import DeleteButton from '../components/DeleteButton';
import ToggleArchiveButton from '../components/ToggleArchiveButton';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/local-data';
import { showFormattedDate } from '../utils/index';

function DetailPage() {
  const { id } = useParams();
  const { title, createdAt, body, archived } = getNote(id);

  const navigate = useNavigate();

  function onDeleteNoteHandler(id) {
    deleteNote(id);
    navigate('/');
  }

  function onToggleArchiveNoteHandler(id, archived) {
    if (!archived) {
      archiveNote(id);
    } else {
      unarchiveNote(id);
    }

    navigate('/');
  }

  return (
    <section className="detail-page" id={id}>
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
      <div className="detail-page__body">{parser(body)}</div>
      <div className="detail-page__action"></div>
      <div className="detail-page__action">
        <ToggleArchiveButton id={id} archived={archived} toggleArchiveNote={onToggleArchiveNoteHandler}  />
        <DeleteButton id={id} deleteNote={onDeleteNoteHandler} />
      </div>
    </section>
  );
}

export default DetailPage;
