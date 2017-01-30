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
    setTaskView,
    acceptTask,
    declineTask,
    completeTask
} from "../redux/actions/tasksActions";
import {
    openTrudModal,
    closeTrudModal,
    toggleRightPanel
} from "../redux/actions/layoutActions";

const mapStateToProps = (state, ownProps) => {
    return {
        task: ownProps.task,
        trudTask: state.currentAddingTrudTask,
        activeTab: state.activeTaskTab,
        isTrudModalOpen: state.isTrudModalOpen,
        codes: state.codes,
        finances: state.finances,
        executors: state.subordinates
    }
}
import LaborToSend from "../Entities/Tasks/LaborToSend";

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
            let labor = LaborToSend(json);
            labor.task_id = task.id;
            dispatch(createLabor(labor, task));
        },
        handleAddNewSubTask: (task) => {
          dispatch(setTaskView({
              task: {
                  type: "new"
              },
              parent_id: task.id,
              parent_task: task
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
        },
        acceptTask:(task)=> {
          dispatch(acceptTask(task));
        },
        declineTask:(task) => {
          dispatch(declineTask(task));
        },
        completeTask:(task) => {
          dispatch(completeTask(task));
        },
        copyTask: () => {

        }
    }
}


const Visible = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskInfo)

export default Visible;
