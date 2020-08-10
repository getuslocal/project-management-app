import { connect } from 'react-redux';
import { compose } from 'redux';
import WithSpinner from '../../shared/components/WithSpinner/WithSpinner';
import PrivateRoutes from './PrivateRoutes';

const mapStateToProps = state => ({
  isLoading: state.auth.loading
});

const PrivateRoutesContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(PrivateRoutes);

export default PrivateRoutesContainer;
