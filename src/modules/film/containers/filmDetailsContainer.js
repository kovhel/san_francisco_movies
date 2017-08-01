import { connect } from 'react-redux';
import FilmDetails from '../components/filmDetails';
import { searchFilm } from '../redux/actionCreators';
import { getFilms } from '../../map/redux/actionCreators';

const mapStateToProps = (state, ownProps) => ({
  filmScenes: (state.filmsData.films || [])
    .filter(film => film.title === ownProps.title),
  filmDetails: state.filmsData.filmsDetails[ownProps.title],
  title: ownProps.title,
});

const mapDispatchToProps = (dispatch) => ({
  searchFilm: (title) => dispatch(searchFilm(title)),
  getFilms: () => dispatch(getFilms()),
});

const FilmDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmDetails);

export default FilmDetailsContainer;
