import React, { useState } from 'react';
import axios from 'axios';
import './search.css';

// `onSearchResults` prop
const Search = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = async () => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:5001/car', {
        params: { query },
      });
      onSearchResults(response.data);  // Pass the data to parent component
    } catch (err) {
      setError('Error fetching data from backend');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="search">
        <input
          type="text"
          className="search__input"
          placeholder="Type car details"
          value={query}
          onChange={handleInputChange}
        />
        <button className="search__button" onClick={handleSearchClick}>
        <svg class="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
            </svg>
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Search;
