import * as R from 'ramda';
import * as L from 'leaflet';
import fetchJsonp from 'fetch-jsonp';
import { CALL_API } from 'redux-api-middleware';

import { CITY_NAME } from '../../../constants/titles';
import * as actionTypes from '../../../constants/actionTypes';
import { BingKey } from '../../../constants/accessAttributes';

export const getFilms = () => ({
  [CALL_API]: {
    endpoint: 'https://data.sfgov.org/resource/wwmu-gmzc.json',
    method: 'GET',
    types: [
      actionTypes.FILMS_DATA_GET_REQUEST,
      actionTypes.FILMS_DATA_GET_SUCCESS,
      actionTypes.FILMS_DATA_GET_FAILURE,
    ],
  },
});

export const getLocation = (name, query) => (dispatch, getState) => {
  if (getState().locations[name]) {
    return new Promise((resolve) => resolve());
  }
  const url = `http://dev.virtualearth.net/REST/v1/Locations${
    L.Util.getParamString({ query, key: BingKey, maxResults: 1 })}`;

  return fetchJsonp(url, {
    timeout: 5000,
    jsonpCallback: 'jsonp',
  })
    .then(response => response.json())
    .then(json => {
      dispatch({
        type: actionTypes.PLACE_LOCATION_SUCCESS,
        payload: {
          name,
          point: json.resourceSets[0].resources[0].point.coordinates,
        },
      });
    })
    .catch(() => {
      dispatch({
        type: actionTypes.PLACE_LOCATION_FAILURE,
      });
    });
};

const triggerLoad = (dispatch, actionCreator, array, i) => {
  if (array.length === i) {
    return new Promise((resolve) => resolve());
  }
  return dispatch(actionCreator(array, i))
    .then(() => triggerLoad(dispatch, actionCreator, array, i + 1));
};

export const getFilmLocations = (title) => (dispatch, getState) => {
  const films =
    getState().filmsData.films
    .filter(film => film.title === title);

  return triggerLoad(
    dispatch,
    (array, i) =>
      getLocation(films[i].locations, `${CITY_NAME}, ${films[i].locations}`),
    films, 0);
};

export const loadFilmData = (title) => (dispatch) => (
  dispatch(getFilmLocations(title)).then(() => {
    dispatch({
      type: actionTypes.CURRENT_LOADING_FILM_CHANGED,
      payload: { title },
    });
  })
);

export const loadAllFilmsData = () => (dispatch, getState) => {
  dispatch(getFilms()).then(() => {
    const films = R.uniqWith(R.eqProps('title'))(getState().filmsData.films);
    triggerLoad(dispatch, (array, i) => loadFilmData(array[i].title), films, 0);
  });
};

export const setSearchQuery = (query) => ({
  type: actionTypes.SEARCH_QUERY_UPDATE,
  payload: {
    query,
  },
});
