import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import filmsReducer from './modules/map/redux/filmsReducer';
import locationsReducer from './modules/map/redux/locationsReducer';
import loaderReducer from './modules/loader/redux/loaderReduser';

const mainReducer = combineReducers({
  routing,

  loader: loaderReducer,
  filmsData: filmsReducer,
  locations: locationsReducer,
});

export default mainReducer;
