import * as actionTypes from '../../../constants/actionTypes';

const initialState = { films: [], filmsDetails: {}, searchQuery: '' };

const filmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FILMS_DATA_GET_SUCCESS:
      return { ...state, films: action.payload };
    case actionTypes.FILM_DETAILS_GET_SUCCESS:
      return { ...state, filmsDetails: { ...state.filmsDetails, [action.payload.title]: action.payload.details } };
    case actionTypes.SEARCH_QUERY_UPDATE:
      return { ...state, searchQuery: action.payload.query };
    default:
      return state;
  }
};

export default filmsReducer;
