import * as actionTypes from '../../../constants/actionTypes';

const initialState = { };

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLACE_LOCATION_SUCCESS:
      return { ...state, [action.payload.name]: action.payload.point, latest: action.payload.point };
    default:
      return state;
  }
};

export default locationsReducer;
