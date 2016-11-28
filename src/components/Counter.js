import React from "react"
import RaisedButton from 'material-ui/RaisedButton';

var buttonContainerStyle = {
  display: "flex",
  flexDirection: "row",
  width: 400,
  justifyContent: "space-between"
}

var containerStyle = {
  display: "flex",
  flexDirection: "column",
  height: 500
}

const Counter = (props) => {
  return(
    <div style={containerStyle}>
      <h1 style={{textAlign:"center"}}>{props.counter}</h1>
       <div style={buttonContainerStyle}>
        <RaisedButton label="-" onClick={props.handleButtonPress.bind(this, "-")} primary={true} />
        <RaisedButton label="+" onClick={props.handleButtonPress.bind(this, "+")} primary={true} />
       </div>
    </div>
  )
}

export default Counter;