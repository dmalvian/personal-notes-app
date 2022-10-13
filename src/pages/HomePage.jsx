import React, { useState } from 'react';
import AddButton from '../components/AddButton';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getActiveNotes } from '../utils/network-data';
import { useSearchParams } from 'react-router-dom';
import { useLocale } from '../hooks/locale';
import { useFetching } from '../hooks/fetching';

function HomePage() {
  const [activeNotes, loading] = useFetching(() => getActiveNotes(), []);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get('title') || '';
  });

  const { translate: __ } = useLocale();

  const filteredNotes = activeNotes.filter((note) =>
    new RegExp(keyword, 'i').test(note.title)
  );

  function onSearch(searchKeyword) {
    setKeyword(searchKeyword);
    setSearchParams({ title: searchKeyword });
  }

  return (
    <section className="homepage">
      <h2>{__('Catatan Aktif')}</h2>
      <SearchBar keyword={keyword} onSearch={onSearch} />
      {loading ? (
        <section className="loading">
          <p>{__('Memuat')}...</p>
        </section>
      ) : (
        <NoteList notes={filteredNotes} />
      )}
      <div className="homepage__action">
        <AddButton />
      </div>
    </section>
  );
}

export default HomePage;
