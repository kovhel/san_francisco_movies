import React from 'react';

import FilmDetailsContainer from '../modules/film/containers/filmDetailsContainer';

const Film = (props) => (
  <div>
    <FilmDetailsContainer title={props.params.title} />
  </div>
);

export default Film;
