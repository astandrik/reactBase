import React from "react";
import MDSpinner from "react-md-spinner";

var spinnerStyles = {
  top: "50vh",
  position: "absolute"
}

export default (props) => {
  if(props.isFetching) {
    spinnerStyles.display = "inline-block";
  } else {
    spinnerStyles.display = "none";
  }
  return <MDSpinner style={spinnerStyles} size={60}/>;
}