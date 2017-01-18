import LaborInfoTable from "../components/Table/LaborInfoTable";
import {
    connect
} from 'react-redux';
import {
    setLaborView,
    closeLabor,
    loadTask,
    createComment,
    loadLabor
} from "../redux/actions/tasksActions";
import {
    openTrudModal,
    closeTrudModal,
    toggleRightPanel
} from "../redux/actions/layoutActions";
import {editLabor} from "../redux/actions/tasksActions";
import LaborToSend from "../Entities/Tasks/LaborToSend";

const mapStateToProps = (state, ownProps) => {
    return {
        labor: ownProps.labor,
        codes: state.codes,
        finances: state.finances
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendComment: (labor, comment) => {
          let obj = {};
          obj.comment = comment;
          obj.time_id = labor.id;
          dispatch(createComment(obj,{id: labor.task_id}, true));
        },
        acceptTrud: (trud) => {
          let labor = LaborToSend(trud);
          labor.status = 1;
          dispatch(editLabor(labor, false, true));
        },
        returnToTask: (trud) => {
          const task_id = trud.task_id;
          dispatch(closeLabor());
          dispatch(loadTask({id:task_id}));
        }
    }
}


const Visible = connect(
    mapStateToProps,
    mapDispatchToProps
)(LaborInfoTable)

export default Visible;
