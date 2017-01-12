import TaskTrudTab from "../components/Tasks/TaskTrudTab";
import { connect } from 'react-redux';
import {openLaborComment, editLabor} from "../redux/actions/tasksActions";

const mapStateToProps = (state,ownProps) => {
  return {
    groups: state.groupedLabors
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openComments: (id) => {
      dispatch(openLaborComment({id}));
    },
    acceptTrud: (trud) => {
      let newJson = Object.assign({}, trud);
      newJson.status = 1;
      dispatch(editLabor(newJson));
    }
  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskTrudTab)

export default Visible;