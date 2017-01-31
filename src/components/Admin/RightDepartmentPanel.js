import React from "react";
import {RightPanelContainer} from "../../containers/Containers";
import DepartmentInfoContainer from "../../containers/Admin/DepartmentInfoContainer";

const fullSize = {
  width:"100%",
  height: "100%"
}


export default class RightDepartmentPanel extends React.Component {
  render() {
    let rightPanel = <div/>;
    const props = this.props;
      if(this.props.department) {
        rightPanel = (
          <div className={"rightPanelContainer " + (props.rightPanelStatus ? "opened" : "closed")} style={fullSize}>
            <RightPanelContainer>
              <DepartmentInfoContainer department={props.department}/>
            </RightPanelContainer>
          </div>
        )
      }
    return rightPanel;
  }
}