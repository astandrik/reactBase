import TaskInfo from "../components/Tasks/TaskInfo";
import {
    connect
} from 'react-redux';
import {
    setActiveTaskTab,
    openDescription,
    setAddingTrudTask,
    createLabor,
    createComment,
    setTaskView
} from "../redux/actions/tasksActions";
import {
    openTrudModal,
    closeTrudModal,
    toggleRightPanel
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
        codes: state.codes,
        executors: state.subordinates
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
        handleTrudSubmit: (task, json) => {
            json.task_id = task.id;
            json.code_id = json.code;
            json.value = json.hours;
            json.date = (new Date(json.startDate)).getTime() / 1000;
            json.status = 0;
            dispatch(createLabor(json, task));
        },
        handleAddNewSubTask: (task) => {
          dispatch(setTaskView({
              task: {
                  type: "new"
              },
              parent_id: task.id
          }));
          dispatch(toggleRightPanel({
              status: 1
          }));
        },
        closeModal: () => {
            dispatch(closeTrudModal({}));
        },
        sendComment: (task, comment) => {
          let obj = {};
          obj.comment = comment;
          obj.task_id = task.id;
          dispatch(createComment(obj,task));
        }
    }
}


const Visible = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskInfo)

export default Visible;
