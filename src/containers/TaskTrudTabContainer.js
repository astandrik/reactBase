import TaskTrudTab from "../components/Tasks/TaskTrudTab";
import { connect } from 'react-redux';
import {openLaborComment, loadLabor,editLabor} from "../redux/actions/tasksActions";
import LaborToSend from "../Entities/Tasks/LaborToSend";

const mapStateToProps = (state,ownProps) => {
  return {
    groups: state.groupedLabors,
    groupsTable:  state.groupedTableLabors,
    type: ownProps.type
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openComments: (id) => {
      dispatch(openLaborComment({id}));
    },
    openTrud: (labor) => {
      dispatch(loadLabor(labor));
    },
    acceptTrud: (trud) => {
      let labor = LaborToSend(trud);
      labor.status = 1;
      dispatch(editLabor(labor));
    },
    declineTrud: (trud) => {
      let labor = LaborToSend(trud);
      labor.status = 2;
      dispatch(editLabor(labor));
    }
  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskTrudTab);

export default Visible;