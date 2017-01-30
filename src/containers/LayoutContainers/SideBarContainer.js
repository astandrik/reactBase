import SideBar from "../../components/SideBar";
import { connect } from 'react-redux';
import {setSearchQuery} from "../../redux/actions/layoutActions";
import { browserHistory } from 'react-router';

const mapStateToProps = (state,ownProps) => {
  return {
    menuItems: ownProps.children,
    showNav: state.showNav
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeSearchQuery: (query) => {
      setSearchQuery({query});
    }
  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar)

export default Visible;