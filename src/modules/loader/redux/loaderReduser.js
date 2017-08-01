import { CURRENT_LOADING_FILM_CHANGED } from '../../../constants/actionTypes';

export const initialState = { progress: 0, latest: '' };

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_LOADING_FILM_CHANGED:
      return { latest: action.payload.title, progress: state.progress + 1 };
    default:
      return state;
  }
};

export default loaderReducer;
