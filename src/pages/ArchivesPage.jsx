import React, { useState } from 'react';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes } from '../utils/network-data';
import { useSearchParams } from 'react-router-dom';
import { useLocale } from '../hooks/locale';
import { useFetching } from '../hooks/fetching';

function ArchivesPage() {
  const [archivedNotes, loading] = useFetching(() => getArchivedNotes(), []);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get('title') || '';
  });

  const { translate: __ } = useLocale();

  const filteredNotes = archivedNotes.filter((note) =>
    new RegExp(keyword, 'i').test(note.title)
  );

  function onSearch(searchKeyword) {
    setKeyword(searchKeyword);
    setSearchParams({ title: searchKeyword });
  }

  return (
    <section className="archives-page">
      <h2>{__('Arsip')}</h2>
      <SearchBar keyword={keyword} onSearch={onSearch} />
      {loading ? (
        <section className="loading">
          <p>{__('Memuat')}...</p>
        </section>
      ) : (
        <NoteList notes={filteredNotes} />
      )}
    </section>
  );
}

export default ArchivesPage;
