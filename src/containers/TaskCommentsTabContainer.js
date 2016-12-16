import TaskCommentsTab from "../components/Tasks/TaskCommentsTab";
import { connect } from 'react-redux';
import {setCurrentTaskComment} from "../redux/actions/tasksActions";

const mapStateToProps = (state,ownProps) => {
  return {
    comments: ownProps.task.comments,
    task: ownProps.task
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskCommentsTab)

export default Visible;