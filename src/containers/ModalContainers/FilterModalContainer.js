import FilterModal from "../../components/Modals/FilterModal";
import {
      setFilters
} from "../../redux/actions/layoutActions";
import {
  loadTasks
} from "../../redux/actions/tasksActions";
import {loadTableData} from "../../redux/actions/tableActions";
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
      executors: state.User.subordinates,
      defaultFilters: state.defaultFilters,
      currentLocation: state.currentLocation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      applyFilters:(filters, currentLocation) => {
        const filt = {sub_ids: filters.subs, statuses: filters.statuses, all_subs: filters.allSubs};
        dispatch(setFilters({filters: filt}));
        if(~currentLocation.indexOf("table") || ~currentLocation.indexOf("subordinates")) {
          dispatch(loadTableData());
        } else if (~currentLocation.indexOf("list")) {
          dispatch(loadTasks());
        }
      }
    }
}


const Visible = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterModal)

export default Visible;
