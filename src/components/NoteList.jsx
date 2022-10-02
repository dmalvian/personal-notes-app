import React from 'react';
import NoteItem from '../components/NoteItem';
import PropTypes from 'prop-types';

function NoteList({ notes }) {
  return (
    <>
      {notes.length > 0 ? (
        <section className="notes-list">
          {notes.map((note) => (
            <NoteItem key={note.id} {...note} />
          ))}
        </section>
      ) : (
        <section className="notes-list-empty">
          <p className="notes-list__empty">No items available</p>
        </section>
      )}
    </>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default NoteList;
