import NewTaskInfo from "../components/Tasks/NewTaskInfo";
import { connect } from 'react-redux';
import {setActiveTaskTab, openDescription,setAddingTrudTask} from "../redux/actions/tasksActions";
import {openTrudModal,closeTrudModal} from "../redux/actions/layoutActions";
import {reset} from 'redux-form';

const mapStateToProps = (state,ownProps) => {
  return {
    codes: state.codes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  
  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTaskInfo)

export default Visible;