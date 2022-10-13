import React from 'react';
import PropTypes from 'prop-types';
import { useLocale } from '../hooks/locale';

function SearchBar({ keyword, onSearch }) {
  const { translate: __ } = useLocale();

  function onKeywordChangeHandler(event) {
    onSearch(event.target.value);
  }

  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder={`${__('Cari berdasarkan judul')}...`}
        value={keyword}
        onChange={onKeywordChangeHandler}
      />
    </section>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
