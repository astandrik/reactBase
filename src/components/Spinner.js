import React from "react";
import MDSpinner from "react-md-spinner";

var spinnerStyles = {
  top: "50vh",
  position: "absolute"
}

export default (props) => {
  if(props.isFetching) {
    spinnerStyles.visibility = "visible";
  } else {
    spinnerStyles.visibility = "hidden";
  }
  return <MDSpinner style={spinnerStyles} size={60}/>;
}