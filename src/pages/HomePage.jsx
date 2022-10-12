import React, { useState, useEffect } from 'react';
import AddButton from '../components/AddButton';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getActiveNotes } from '../utils/network-data';
import { useSearchParams } from 'react-router-dom';

function HomePage() {
  const [activeNotes, setActiveNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get('title') || '';
  });

  useEffect(() => {
    async function fetchData() {
      const { error, data } = await getActiveNotes();

      if (!error) setActiveNotes(data);

      setLoading(false);

      return () => {
        setLoading(true);
      };
    }

    fetchData();
  }, []);

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
      {loading ? <p>Loading...</p> : <NoteList notes={filteredNotes} />}
      <div className="homepage__action">
        <AddButton />
      </div>
    </section>
  );
}

export default HomePage;
