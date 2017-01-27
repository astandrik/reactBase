import React from "react";
import {getDateRange} from "../../redux/actions/tableActions";
let helpers = {};
import Icon from "../../Icons/Icon";
import taskHelpers from "../Tasks/taskHelpers";


helpers.generateHeaders = function (headers = [], datedLabors, onAccept) {
  let th = [<th key="0">Название</th>];
  for(var i = 1; i <= headers.length; i++) {
    const newLabors = datedLabors[headers[i-1]] ? datedLabors[headers[i-1]].filter(x=> x.rawstatus===0) : [];
    const canAcceptAll = (newLabors.length > 0) && newLabors.every(x => x.rights.accept);
    th[i] = (
      <th key={i} className="table-header">
        <div>
          <span>{headers[i-1]}</span>
          <Icon name="acceptTrud" className={`clickable-image openTrud small ` + ( canAcceptAll ?  "" : "noDisplay")} onClick={onAccept.bind(this, headers[i-1], newLabors)}/>
        </div>
      </th>
    );
  }
  return th;
}


helpers.generateRows = function(data = [], clickHandler, rowClickHandler, props) {
  let rows = [];
  const elements = data.data;
  const headers = data.headers;
  const activeId = props.activeIndexes.taskId;
  let finalTimes = {};
  const tdWidth = data.headers ? 70 / data.headers.length : 0;
  if(!data || data.length === 0) {
    return [];
  }
  let datedLabors = {};
  for(var i = 0; i < Object.keys(elements).length;i++) {
    let elem = elements[Object.keys(elements)[i]];
    if(elem.id == activeId) {
      elem.active = true;
    } else {
      elem.active = false;
    }
    let td = [];
    let labors = [];
    for(var j = 0; j < headers.length; j++) {
      const val = elem[headers[j]];
      if(!datedLabors[headers[j]]) {
          datedLabors[headers[j]] = [];
      }
      let hasUnaccepted = false;
      if(val) {
        for(var k = 0; k < val.length; k++) {
          if(val[k].rawstatus ==0) {
            hasUnaccepted = true;
            break;
          }
        }
        labors = labors.concat(val);
        if(!finalTimes[headers[j]]) {
          finalTimes[headers[j]] = {my: val.myHours, all: val.hours};
        } else {
          finalTimes[headers[j]].my += val.myHours;
          finalTimes[headers[j]].all += val.hours;
        }
      }
      const commentsNumber = val ? val.reduce((sum, cur) => sum + cur.comments.length, 0) : 0;
      datedLabors[headers[j]] = val ? datedLabors[headers[j]].concat(val.reduce((sum, cur) => sum.concat(cur), []).filter(x => x.rawstatus == 0)) :  datedLabors[headers[j]];
      let comments = <div className="noDisplay"/>;
      if(commentsNumber > 0) {
        comments = <div className="comments-number">{commentsNumber}</div>
      }
      td[j] = (
        <td key={j} className={`tableCell ${hasUnaccepted ? 'has-unaccepted' : ''} ${elem.active && (headers[j] === props.currentDay || props.currentDay === false)? "active" : ''}`} width={tdWidth+"%"} onClick={clickHandler.bind(this, val, elem.id, headers[j])}>{val ? (val.myHours + "/" + val.hours) : 0}
        {comments}</td>
      )
    }
    const executors = taskHelpers.createExecutors(elem.executors);
    rows[i] = (
      <tr key={i}>
        <td width="30%" className={`tableCell ${elem.active? "active" : ''}`} onClick={rowClickHandler.bind(this, labors, elem.id)}> {Object.keys(elements)[i]} {executors} </td>
        {td}
      </tr>
    )
  }
  let finalcell = [];
  for(var j = 0; j < headers.length; j++) {
    const val = finalTimes[headers[j]];
    finalcell[j] = (
      <td key={98765+j} className="tableCell" width={tdWidth+"%"}>{val ? (val.my + "/" + val.all) : 0}</td>
    )
  }
  let finalRow = (
    <tr key={1234567} className="overall-row">
      <td width="30%" className="tableCell"> Итого </td>
      {finalcell}
    </tr>
  )
  return {rows: rows.concat(finalRow), datedLabors};
}


helpers.getWeek = function(date) {
    var onejan = new Date(date.getFullYear(),0,1);
    var today = new Date(date.getFullYear(),date.getMonth(),date.getDate());
    var dayOfYear = ((today - onejan +1)/86400000);
    return Math.ceil(dayOfYear/7)
};

helpers.getDateRange = getDateRange;

export default helpers;