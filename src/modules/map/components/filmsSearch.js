import React from 'react';

const FilmsSearch = ({
   setSearchQuery,
 }) => (
  <div
    style={{
      position: 'absolute',
      zIndex: '1000',
      top: '5%',
      left: '20%',
      width: '60%',
      textAlign: 'center',
      color: 'white',
    }}
  >
    <h1>Find Your Favourite Film in San Francisco!</h1>
    <input
      type="text"
      style={{
        width: '80%',
        border: 'none',
        borderRadius: '4px',
        height: '25px',
      }}
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          setSearchQuery(event.target.value);
        }
      }}
    />
  </div>
);

export default FilmsSearch;
