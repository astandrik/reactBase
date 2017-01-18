import SideBar from "../../components/SideBar";
import { connect } from 'react-redux';

const mapStateToProps = (state,ownProps) => {
  return {
    menuItems: ownProps.children,
    showNav: state.showNav
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar)

export default Visible;