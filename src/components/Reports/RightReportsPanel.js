import React from "react";
import * as helpers from "../../helperFunctions";
import Icon from "../../Icons/Icon";
import Container from "../Container";


export default class RightTaskPanel extends React.Component {
  render() {
    const props = this.props;
    if(props.reportsTable.data.length) {
      let reportsTable = props.reportsTable;
      let table = helpers.getTasksReportTable(reportsTable);
      const exportToExcel = helpers.exportReportToExcel;
      return (
      <Container vertical={true}>
        <div flex="2" > <Icon name="excel" onClick={exportToExcel.bind(this, table.data.data, table.data.headers)} className={`clickable-image clock filter-icon`}/></div>
        <div flex="11">{table.element}</div>
      </Container>
      );
    } else {
      return <div className="noDisplay"/>
    }
  }
}