import CodesList from "../../components/Admin/CodesList";
import {
    setClientHeight
} from "../../redux/actions/layoutActions";
import {
    activateTask
} from "../../redux/actions/tasksActions";
  import {
    editCode,
    createCode
  } from "../../redux/actions/Admin/codesActions";

import {
    connect
} from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return {
        codes: state.codes,
        clientHeight: state.clientHeight,
        activeIndexes: state.activeIndexes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setClientHeight: (height) => {
        dispatch(setClientHeight({height}));
      },
      editCode: (code)  => {
        dispatch(editCode(code));
      },
      createCode: (code) => {
        dispatch(createCode(code));
      }
    }
}


const Visible = connect(
    mapStateToProps,
    mapDispatchToProps
)(CodesList)

export default Visible;
