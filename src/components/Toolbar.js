import React from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import "./styles/Link.css";
import "./styles/Toolbar.css";
import hamburger from "../Icons/menu.svg";

const namePositionStyles = {
      minHeight: "35px",
      display: "flex",
      flexDirection: "column"
}

const ToolbarStyles = {
  justifyContent: "space-between",
  backgroundColor: "white",
  borderBottom: "2px solid",
  height: "42px"
}

export default class ToolbarExamplesSimple extends React.Component {

  render() {
    return (
      <Toolbar style={ToolbarStyles}>
        <img className="clickable-image burger" onClick={this.props.handleClick.bind(this)}  src={hamburger} alt="logo" />
        <ToolbarGroup>
          <div style={namePositionStyles}>
            <span style={{marginTop:5}}>{this.props.name}</span>
            <span style={{marginTop:"2px"}}>{this.props.position}</span>
          </div>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}