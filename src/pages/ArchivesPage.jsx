import React, { useState, useEffect } from 'react';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes } from '../utils/network-data';
import { useSearchParams } from 'react-router-dom';

function ArchivesPage() {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get('title') || '';
  });

  useEffect(() => {
    async function fetchData() {
      const { error, data } = await getArchivedNotes();

      if (!error) setArchivedNotes(data);

      setLoading(false);

      return () => {
        setLoading(true);
      };
    }

    fetchData();
  }, []);

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
      {loading ? <p>Loading...</p> : <NoteList notes={filteredNotes} />}
    </section>
  );
}

export default ArchivesPage;
