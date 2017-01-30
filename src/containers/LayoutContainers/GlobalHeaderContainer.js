import GlobalHeader from "../../components/GlobalHeader";
import {
    connect
} from 'react-redux';
import {
      setFilters
} from "../../redux/actions/layoutActions";

const mapStateToProps = (state, ownProps) => {
    return {
        currentTitle: state.currentTitle,
        style: ownProps.style,
        tabs: state.tabs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      applyFilters:(filters) => {
        const filt = {sub_ids: filters.subs, types: filters.types, all_subs: filters.allSubs};
        dispatch(setFilters({filters: filt}));
      }
    }
}

const Visible = connect(
    mapStateToProps,
    mapDispatchToProps
)(GlobalHeader)

export default Visible
