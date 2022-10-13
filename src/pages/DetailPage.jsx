import React from 'react';
import parser from 'html-react-parser';
import DeleteButton from '../components/DeleteButton';
import ToggleArchiveButton from '../components/ToggleArchiveButton';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from '../utils/network-data';
import { showFormattedDate } from '../utils/index';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { useLocale } from '../hooks/locale';
import { useFetching } from '../hooks/fetching';

function DetailPage() {
  const { id } = useParams();
  const [note, loading] = useFetching(() => getNote(id), null);

  const { translate: __ } = useLocale();

  const navigate = useNavigate();

  function onDeleteNoteHandler(id) {
    confirmAlert({
      title: __('Konfirmasi'),
      message: __('Apakah anda yakin ingin menghapus catatan ini?'),
      buttons: [
        {
          label: __('Ya'),
          onClick: async () => {
            const { error } = await deleteNote(id);

            if (!error) {
              navigate('/');
              toast.success(__('Catatan berhasil dihapus'));
            }
          },
        },
        {
          label: __('Batal'),
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
      toast.success(
        archived
          ? __('Catatan berhasil diaktifkan')
          : __('Catatan berhasil diarsipkan')
      );
    }
  }

  if (loading)
    return (
      <section className="loading">
        <p>{__('Memuat')}...</p>
      </section>
    );

  if (!loading && note === null)
    return (
      <section className="loading">
        <p>{__('Anda tidak diperkenankan untuk mengakses catatan ini')}</p>
      </section>
    );

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
