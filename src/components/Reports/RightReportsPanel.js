import React from "react";
import * as helpers from "../../helperFunctions";
import Icon from "../../Icons/Icon";
import Container from "../Container";
import moment from "moment";
import thelpers from "../Table/tableHelpers";


export default class RightTaskPanel extends React.Component {
  render() {
    const props = this.props;
    const currentWeek = props.currentWeek;
    let reportsTable = props.reportsTable;
    if(!reportsTable.user) {
        const range = thelpers.getDateRange(props.currentWeek);
        const dateRangeWords = "c " + moment(range.first).format("DD MMMM") + " по " + moment(range.last).format("DD MMMM");
        if(props.reportsTable.data.length) {
          let table = helpers.getTasksReportTable(reportsTable);
          const exportToExcel = helpers.exportReportToExcel;
          return (
          <Container vertical={true}>
            <div flex="1" className="reportHeaderContainer">
              <h4 className="reports-header"><span>{"Отчет за период " + dateRangeWords}</span> <Icon name="excel" onClick={exportToExcel.bind(this, table.data.data, [""].concat(table.data.headers))} className={`clickable-image excel-download-icon right-float`}/></h4>
            </div>
            <div flex="11">{table.element}</div>
          </Container>
          );
        } else {
          return <div className="noDisplay"/>
        }
    } else {
      if(props.reportsTable.user.days.length) {
        let table = thelpers.generateUserReportTable(props.reportsTable.user);
        return (
          <Container vertical={true}>
            <div flex="1" className="reportHeaderContainer">
              "Отчетный период"
            </div>
            <div flex="11">
              <table  id="reports-table"  className="tg">
                <tbody>
                  {table}
                </tbody>
              </table>
            </div>
          </Container>
        )
      } else {
        return <div className="noDisplay"/>
      }
    }
  }
}