import { connect } from 'react-redux';
import { compose } from 'redux';
import WithSpinner from '../../../shared/components/WithSpinner/WithSpinner';
import Board from './Board';

const mapStateToProps = state => ({
  isLoading: !state.auth.checkUserCredentials
});

const BoardContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(Board);

export default BoardContainer;
