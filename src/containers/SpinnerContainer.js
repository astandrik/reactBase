import Spinner from "../components/Spinner"

import {changeFetchingStatus} from "../redux/actions/layoutActions";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching
  }
}

const VisibleSpinner = connect(
  mapStateToProps
)(Spinner)

export default VisibleSpinner