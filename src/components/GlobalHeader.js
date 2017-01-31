import React from 'react';
import { Link } from 'react-router';
import "./styles/GlobalHeader.css";
import FilterModalContainer from "../containers/ModalContainers/FilterModalContainer";
import Icon from "../Icons/Icon";


const headerStyles = {
  display: "flex",
  flexDirection: "column"
}

const tabStyles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center"
}

const checkBoxValues=[
  {value: "all", label:"Все задачи"},
  {value: "current", label:"Подтвержденные задачи"},
  {value: "unaccepted", label:"Неподтвержденные задачи"},
  {value: "completes", label:"Завершенные задачи"},
];

const filterContainerStyle = {
  display: "flex",
  flexDirection: "row"
}

const createTabs = function(tabs) {
  let tabElements = [];
  for(var i = 0; i < tabs.length; i++) {
    tabElements[i] = (
       <Link className="header-link" activeClassName="underlinedLink" to={tabs[i].to} key={tabs[i].to}>{tabs[i].title}</Link>
    )
  }
  return tabElements;
}

export default class GlobalHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFilterModalOpen: false
    }
  }
  handleTouchTap (event) {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      isFilterModalOpen: true,
      anchorEl: event.currentTarget,
    })
  }
  getFilterParent() {
    return document.querySelector('.tasksContainer');
  }
  closeFilter() {
    this.setState({isFilterModalOpen: false})
  }
  render() {
    let tabs = "";
    if(this.props.tabs) {
      tabs = (
        <div style={tabStyles}>
          {createTabs(this.props.tabs)}
        </div>
      )
    }
    if(!this.props.currentTitle) {
      return (
        <div style={{display: "none"}}/>
      )
    } else {
      return (
        <div style={headerStyles}>
          <div className="header-filter-container">
            <h2 style={{textAlign: "center", marginBottom:"0px", marginTop: "5px"}}>{this.props.currentTitle}</h2>
            <div>
              <Icon name="filter" onClick={this.handleTouchTap.bind(this)} className="clickable-image clock filter-icon"/>
            </div>
          </div>
          {tabs}
          <FilterModalContainer isModalOpen={this.state.isFilterModalOpen} check={()=>{}}
          anchorEl={this.state.anchorEl} applyFilters={this.props.applyFilters}
          filterValues={checkBoxValues} closeModal={this.closeFilter.bind(this)} containerStyle={{maxWidth: '0'}}/>
        </div>
      );
    }
  }
}