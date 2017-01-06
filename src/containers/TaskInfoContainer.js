import TaskInfo from "../components/Tasks/TaskInfo";
import {
    connect
} from 'react-redux';
import {
    setActiveTaskTab,
    openDescription,
    setAddingTrudTask,
    createLabor
} from "../redux/actions/tasksActions";
import {
    openTrudModal,
    closeTrudModal
} from "../redux/actions/layoutActions";
import {
    reset
} from 'redux-form';

const mapStateToProps = (state, ownProps) => {
    return {
        task: ownProps.task,
        trudTask: state.currentAddingTrudTask,
        activeTab: state.activeTaskTab,
        isTrudModalOpen: state.isTrudModalOpen,
        codes: state.codes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        chooseCurrentTaskTab: (tab) => {
            dispatch(setActiveTaskTab({
                value: tab
            }));
        },
        openDescription: (task) => {
            dispatch(openDescription({
                task: task
            }));
        },
        openTrudModal: (task) => {
            dispatch(openTrudModal());
            dispatch(setAddingTrudTask({
                task
            }))
        },
        handleSubmit: (json) => {
            debugger;
        },
        handleTrudSubmit: (task, json) => {
            json.task_id = task.id;
            json.code_id = json.code;
            json.status = 0;
            dispatch(createLabor(json));
        },
        closeModal: () => {
            dispatch(closeTrudModal({}));
        }
    }
}


const Visible = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskInfo)

export default Visible;
