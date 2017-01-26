import SubordinatesTable from "../components/Subordinates/SubordinatesTable";
import { connect } from 'react-redux';

const mapStateToProps = (state,ownProps) => {
  return {
    tasks: state.tasks,
    rightPanelStatus: state.rightPanelStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hmm: () => "mmm"
  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubordinatesTable)

export default Visible