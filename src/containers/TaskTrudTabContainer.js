import TaskTrudTab from "../components/Tasks/TaskTrudTab";
import { connect } from 'react-redux';
import {openLaborComment} from "../redux/actions/tasksActions";

const mapStateToProps = (state,ownProps) => {
  return {
    groups: state.groupedLabors
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openComments: (id) => {
      dispatch(openLaborComment({id}));
    }
  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskTrudTab)

export default Visible;