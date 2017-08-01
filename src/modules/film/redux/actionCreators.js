import { CALL_API } from 'redux-api-middleware';
import * as L from 'leaflet';

import * as actionTypes from '../../../constants/actionTypes';
import { tdbKey, tdbUrl } from '../../../constants/accessAttributes';

export const searchFilm = (title) => (dispatch) => dispatch({
  [CALL_API]: {
    endpoint: `${tdbUrl}/search/movie${L.Util.getParamString({ query: title, api_key: tdbKey })}`,
    method: 'GET',
    types: [
      actionTypes.FILM_DETAILS_GET_REQUEST,
      {
        type: actionTypes.FILM_DETAILS_GET_SUCCESS,
        payload: (state, action, result) => result.json().then(json => ({
          title,
          details: json.results.length ? json.results[0] : {},
        })),
      },
      actionTypes.FILM_DETAILS_GET_FAILURE,
    ],
  },
});
