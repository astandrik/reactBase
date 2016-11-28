import Counter from "../components/Counter";
import {changeCounter} from "../redux/actions/counterActions";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleButtonPress: (val) => {
      if(val == "-") {
        dispatch(changeCounter("dec"));
      } else {
        dispatch(changeCounter("inc"));
      }
    }
  }
}

const VisibleCounter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

export default VisibleCounter