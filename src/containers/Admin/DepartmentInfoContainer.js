import DepartmentInfo from "../../components/Admin/DepartmentInfo";
import {
    connect
} from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return {
        department: ownProps.department,
        departments: state.flatDepartments
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
)(DepartmentInfo)

export default Visible;
