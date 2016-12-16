import GlobalHeader from "../../components/GlobalHeader";
import { connect } from 'react-redux';

const mapStateToProps = (state,ownProps) => {
  return {
    title: "Мои задачи",
    style: ownProps.style,
    tabs: state.tabs
  }
}


const Visible = connect(
  mapStateToProps
)(GlobalHeader)

export default Visible