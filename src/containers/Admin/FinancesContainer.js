import FinancesList from "../../components/Admin/FinancesList";
import {
    setClientHeight
} from "../../redux/actions/layoutActions";
import {
    activateTask
} from "../../redux/actions/tasksActions";
  import {
    editFinance,
    createFinance
  } from "../../redux/actions/Admin/financesActions";

import {
    connect
} from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return {
        finances: state.finances,
        clientHeight: state.clientHeight,
        activeIndexes: state.activeIndexes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setClientHeight: (height) => {
        dispatch(setClientHeight({height}));
      },
      editFinance: (code)  => {
        dispatch(editFinance(code));
      },
      createFinance: (code) => {
        dispatch(createFinance(code));
      }
    }
}


const Visible = connect(
    mapStateToProps,
    mapDispatchToProps
)(FinancesList)

export default Visible;
