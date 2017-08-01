import { connect } from 'react-redux';
import * as R from 'ramda';

import Loader from '../components/loader';
import { loadAllFilmsData } from '../../map/redux/actionCreators';

const mapStateToProps = (state) => ({
  progressPerCent: state.filmsData.films.length ?
    state.loader.progress / R.uniqWith(R.eqProps('title'))(state.filmsData.films).length : 0,
});

const mapDispatchToProps = (dispatch) => ({
  loadAllFilmsData: () => dispatch(loadAllFilmsData()),
});

const LoaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader);

export default LoaderContainer;
