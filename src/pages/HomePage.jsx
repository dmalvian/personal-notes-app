import React, { useState } from 'react';
import AddButton from '../components/AddButton';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getActiveNotes } from '../utils/local-data';
import { useSearchParams } from 'react-router-dom';

function HomePage() {
  const activeNotes = getActiveNotes();
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('title');

  const [keyword, setKeyword] = useState(title || '');

  const filteredNotes = activeNotes.filter((note) =>
    new RegExp(keyword, 'i').test(note.title)
  );

  function onSearch(searchKeyword) {
    setKeyword(searchKeyword);
    setSearchParams({ title: searchKeyword });
  }

  return (
    <section className="homepage">
      <h2>Active Notes</h2>
      <SearchBar keyword={keyword} onSearch={onSearch} />
      <NoteList notes={filteredNotes} />
      <div className="homepage__action">
        <AddButton />
      </div>
    </section>
  );
}

export default HomePage;