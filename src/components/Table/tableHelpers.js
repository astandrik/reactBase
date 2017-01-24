import React from "react";
import {getDateRange} from "../../redux/actions/tableActions";
let helpers = {};


helpers.generateHeaders = function (headers = []) {
  let th = [<th key="0">Название</th>];
  for(var i = 1; i <= headers.length; i++) {
    th[i] = (
      <th key={i}>
        {headers[i-1]}
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
  if(!data || data.length === 0) {
    return [];
  }
  for(var i = 0; i < Object.keys(elements).length;i++) {
    let elem = elements[Object.keys(elements)[i]];
    if(elem.id == activeId) {
      elem.active = true;
    } else {
      elem.active = false;
    }
    let td = [];
    const tdWidth = 70 / data.headers.length;
    let labors = [];
    for(var j = 0; j < headers.length; j++) {
      const val = elem[headers[j]];
      let hasUnaccepted = false;
      if(val) {
        for(var k = 0; k < val.length; k++) {
          if(val[k].rawstatus ==0) {
            hasUnaccepted = true;
            break;
          }
        }
        labors = labors.concat(val);
      }
      const commentsNumber = val ? val.reduce((sum, cur) => sum + cur.comments.length, 0) : 0;
      let comments = <div className="noDisplay"/>;
      if(commentsNumber > 0) {
        comments = <div className="comments-number">{commentsNumber}</div>
      }
      td[j] = (
        <td key={j} className={`tableCell ${hasUnaccepted ? 'has-unaccepted' : ''} ${elem.active && (headers[j] === props.currentDay || props.currentDay === false)? "active" : ''}`} width={tdWidth+"%"} onClick={clickHandler.bind(this, val, elem.id, headers[j])}>{val ? (val.myHours + "/" + val.hours) : 0}
        {comments}</td>
      )
    }
    rows[i] = (
      <tr key={i}>
        <td width="30%" className={`tableCell ${elem.active? "active" : ''}`} onClick={rowClickHandler.bind(this, labors, elem.id)}> {Object.keys(elements)[i]} </td>
        {td}
      </tr>
    )
  }
  return rows;
}


helpers.getWeek = function(date) {
    var onejan = new Date(date.getFullYear(),0,1);
    var today = new Date(date.getFullYear(),date.getMonth(),date.getDate());
    var dayOfYear = ((today - onejan +1)/86400000);
    return Math.ceil(dayOfYear/7)
};

helpers.getDateRange = getDateRange;

export default helpers;