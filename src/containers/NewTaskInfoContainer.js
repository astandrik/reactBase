import NewTaskInfo from "../components/Tasks/NewTaskInfo";
import { connect } from 'react-redux';

const mapStateToProps = (state,ownProps) => {
  return {
    codes: state.codes,
    finances: state.finances,
    executors: state.subordinates
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTaskInfo)

export default Visible;