import { connect } from 'react-redux';
import FilmsMap from '../components/filmsMap';
import { getFilmLocations, getLocation, setSearchQuery } from '../redux/actionCreators';

const mapStateToProps = (state) => ({
  films: state.filmsData.films,
  locations: state.locations,
  filter: state.filmsData.searchQuery,
});

const mapDispatchToProps = (dispatch) => ({
  getLocation: (name, query) => dispatch(getLocation(name, query)),
  getFilmLocations: (title) => dispatch(getFilmLocations(title)),
  setSearchQuery: (query) => dispatch(setSearchQuery(query)),
});

const FilmsMapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmsMap);

export default FilmsMapContainer;
