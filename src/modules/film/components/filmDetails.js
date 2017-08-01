import React from 'react';

import { tdbKey, tdbImageUrl } from '../../../constants/accessAttributes';
import { markersIcons } from '../../../constants/markersIcons';

class FilmDetails extends React.Component {
  componentDidMount() {
    if (!this.props.filmScenes.length) {
      this.props.getFilms();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.title && (nextProps.title !== this.props.title || !this.props.filmDetails)) {
      nextProps.searchFilm(nextProps.title);
    }
  }
  render() {
    const { filmDetails, filmScenes, title } = this.props;

    if (!title || !filmScenes.length) {
      return null;
    }

    return (
      <div
        style={{
          width: '70%',
          marginLeft: '15%',
        }}
      >
        <h2>{title}</h2>
        <div>
        {
          filmDetails && filmDetails.poster_path ?
            <img
              src={`${tdbImageUrl}/w185/${filmDetails.poster_path}?api_key=${tdbKey}`}
              alt="poster"
              style={{ float: 'left', paddingRight: '15px', paddingBottom: '15px' }}
            /> : null
        }
        {
          filmDetails ? <p>{filmDetails.overview}</p> : null
        }
        {
          filmScenes[0].production_company ?
            <p>Production company: {filmScenes[0].production_company}</p> : null
        }
        {
          filmScenes[0].distributor ?
            <p>Distributor: {filmScenes[0].distributor}</p> : null
        }
        {
          filmScenes[0].director ?
            <p>Director: {filmScenes[0].director}</p> : null
        }
        {
          filmScenes[0].writer ?
            <p>Writer: {filmScenes[0].writer}</p> : null
        }
        {
          filmDetails && filmDetails.vote_average ?
            <p>Rating: {filmDetails.vote_average} ({filmDetails.vote_count} votes)</p> : null
        }
        {
          filmScenes[0].release_year ? <p>Year: {filmScenes[0].release_year}</p> : null
        }
        </div>
        <div style={{ clear: 'both' }}>
          <h4>Locations:</h4>
          {
            filmScenes.map((film, i) => (
              film.locations ?
                <div key={i}>
                  <img
                    style={{
                      height: '14px',
                      float: 'left',
                      paddingRight: '3px',
                      clear: 'both',
                    }}
                    src={markersIcons[3]} alt="-"
                  />
                  {film.locations}
                </div> : null
            ))
          }
          <div>
          {
            filmScenes.map(film => (
              film.fun_facts ?
                <div
                  style={{
                    paddingTop: '5px',
                    borderRadius: '5px',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  }}
                >{film.fun_facts}</div> : null
            ))
          }
          </div>
        </div>
      </div>
    );
  }
}
export default FilmDetails;
