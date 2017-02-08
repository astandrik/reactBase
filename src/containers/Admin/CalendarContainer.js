import Calendar from "../../components/Admin/Calendar";
import {
  setDay
} from "../../redux/actions/Admin/calendarActions";
import { connect } from 'react-redux';

const mapStateToProps = (state,ownProps) => {
  return {
    calendar: state.Admin.calendar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDay:(day, status) => {
      dispatch(setDay(day, status));
    }
  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar)

export default Visible;