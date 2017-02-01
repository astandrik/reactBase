import UserInfo from "../../components/Admin/UserInfo";
import {
    connect
} from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return {
        user: ownProps.user,
        departments: state.Admin.flatDepartments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => {

        }
    }
}


const Visible = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfo)

export default Visible;
