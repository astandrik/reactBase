import React from 'react';
import { Link } from 'react-router';
import "./styles/GlobalHeader.css";


const headerStyles = {
  display: "flex",
  flexDirection: "column"
}

const tabStyles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center"
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
          <h2 style={{textAlign: "center", marginBottom:"0px"}}>{this.props.currentTitle}</h2>
          {tabs}
        </div>
      );
    }
  }
}