import React, { useState } from 'react';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes } from '../utils/local-data';
import { useSearchParams } from 'react-router-dom';

function ArchivesPage() {
  const archivedNotes = getArchivedNotes();
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('title');

  const [keyword, setKeyword] = useState(title || '');

  const filteredNotes = archivedNotes.filter((note) =>
    new RegExp(keyword, 'i').test(note.title)
  );

  function onSearch(searchKeyword) {
    setKeyword(searchKeyword);
    setSearchParams({ title: searchKeyword });
  }

  return (
    <section className="archives-page">
      <h2>Archived Notes</h2>
      <SearchBar keyword={keyword} onSearch={onSearch} />
      <NoteList notes={filteredNotes} />
    </section>
  );
}

export default ArchivesPage;
