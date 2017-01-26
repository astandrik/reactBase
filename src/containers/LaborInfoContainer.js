import LaborInfo from "../components/Tasks/LaborInfo";
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
          dispatch(editLabor(labor, true));
        },
        declineTrud: (trud) => {
          let labor = LaborToSend(trud);
          labor.status = 2;
          dispatch(editLabor(labor, true));
        },
        returnToTask: (trud) => {
          dispatch(closeLabor());
          dispatch(loadTask({id: trud.task_id}));
        }
    }
}


const Visible = connect(
    mapStateToProps,
    mapDispatchToProps
)(LaborInfo)

export default Visible;
