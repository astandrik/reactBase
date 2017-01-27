import FilterModal from "../../components/Modals/FilterModal";
import {
    connect
} from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return {
      filterValues: ownProps.filterValues,
      isModalOpen: ownProps.isModalOpen,
      closeModal: ownProps.closeModal,
      anchorEl: ownProps.anchorEl,
      handleTouchTap: ownProps.handleTouchTap,
      currentTaskFilters: state.currentTaskFilters,
      executors: state.subordinates,
      applyFilters: ownProps.applyFilters,
      defaultFilters: state.defaultFilters
    }
}


const Visible = connect(
    mapStateToProps,
)(FilterModal)

export default Visible;
