import React, { useState, useEffect } from 'react';
import parser from 'html-react-parser';
import DeleteButton from '../components/DeleteButton';
import ToggleArchiveButton from '../components/ToggleArchiveButton';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate } from '../utils/index';
import { showToast } from '../utils/index';
import { confirmAlert } from 'react-confirm-alert';

function DetailPage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { error, data } = await getNote(id);

      if (!error) setNote(data);

      setLoading(false);
    }

    fetchData();

    return () => {
      setLoading(true);
    };
  }, []);

  const navigate = useNavigate();

  function onDeleteNoteHandler(id) {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to delete this note?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const { error } = deleteNote(id);

            if (!error) {
              navigate('/');
              showToast('Note deleted successfully.');
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  }

  async function onToggleArchiveNoteHandler(id, archived) {
    let data = null;

    if (!archived) {
      data = await archiveNote(id);
    } else {
      data = await unarchiveNote(id);
    }

    if (!data.error) {
      navigate('/');
      showToast(`Note ${archived ? 'activated' : 'archived'} successfully.`);
    }
  }

  if (loading) return <p>Loading...</p>;

  if (!loading && note === null) return <p>Your are not allowed to access this note.</p>;

  return (
    <section className="detail-page" id={id}>
      <h3 className="detail-page__title">{note.title}</h3>
      <p className="detail-page__createdAt">
        {showFormattedDate(note.createdAt)}
      </p>
      <div className="detail-page__body">{parser(note.body)}</div>
      <div className="detail-page__action"></div>
      <div className="detail-page__action">
        <ToggleArchiveButton
          id={id}
          archived={note.archived}
          toggleArchiveNote={onToggleArchiveNoteHandler}
        />
        <DeleteButton id={id} deleteNote={onDeleteNoteHandler} />
      </div>
    </section>
  );
}

export default DetailPage;
