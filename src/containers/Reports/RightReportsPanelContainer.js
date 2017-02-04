import RightReportsPanel from "../../components/Reports/RightReportsPanel";
import { connect } from 'react-redux';


const mapStateToProps = (state,ownProps) => {
  return {
    reportsTable: state.Reports.reportsTableData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hmm: () => "mm"
  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(RightReportsPanel)

export default Visible;