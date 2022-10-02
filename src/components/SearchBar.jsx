import React from 'react';
import PropTypes from 'prop-types';

function SearchBar({ keyword, onSearch }) {

  function onKeywordChangeHandler(event) {
    onSearch(event.target.value);
  }

  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder="Search by title..."
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
