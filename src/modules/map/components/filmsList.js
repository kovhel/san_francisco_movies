import React from 'react';
import { browserHistory } from 'react-router';

const FilmsList = ({
    list,
  }) => (
  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
    {
      list.map((film, j) => (
        <div
          key={j}
          to={`/film-details/${film.title}`}
          style={{
            cursor: 'pointer',
            borderRadius: '2px',
          }}
          className="popup-film"
          onClick={() => { browserHistory.push(`/film-details/${film.title}`); }}
        >{film.title}</div>
      ))
    }
    <style>
      {
        `.popup-film:hover {
          background-color: rgba(66, 203, 244, 0.5);
        }`
      }
    </style>
  </div>
);

export default FilmsList;
