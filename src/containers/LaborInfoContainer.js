import TaskInfo from "../components/Tasks/TaskInfo";
import {
    connect
} from 'react-redux';
import {
    setLaborView
} from "../redux/actions/tasksActions";
import {
    openTrudModal,
    closeTrudModal,
    toggleRightPanel
} from "../redux/actions/layoutActions";

const mapStateToProps = (state, ownProps) => {
    return {
        labor: ownProps.labor,
        codes: state.codes,
        finances: state.finances,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendComment: (task, comment) => {
          let obj = {};
          obj.comment = comment;
          obj.task_id = task.id;
        }
    }
}


const Visible = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskInfo)

export default Visible;
