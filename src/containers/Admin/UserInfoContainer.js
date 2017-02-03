import UserInfo from "../../components/Admin/UserInfo";
import {
    connect
} from 'react-redux';
import {
  deleteUser
} from "../../redux/actions/Admin/usersActions";
import {
    toggleRightPanel
} from "../../redux/actions/layoutActions";

const mapStateToProps = (state, ownProps) => {
    return {
        user: ownProps.user,
        departments: state.Admin.flatDepartments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => {

        },
        deleteUser: (user) => {
          dispatch(deleteUser(user));
          dispatch(toggleRightPanel({
            status: 0
          }));
        }
    }
}


const Visible = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfo)

export default Visible;
