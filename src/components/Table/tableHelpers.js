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


helpers.generateRows = function(data = [], clickHandler) {
  let rows = [];
  const elements = data.data;
  const headers = data.headers;
  if(!data || data.length === 0) {
    return [];
  }
  for(var i = 0; i < Object.keys(elements).length;i++) {
    const elem = elements[Object.keys(elements)[i]];
    let td = [];
    const tdWidth = 70 / data.headers.length;
    for(var j = 0; j < headers.length; j++) {
      const val = elem[headers[j]];
      td[j] = (
        <td key={j} className="tableCell" width={tdWidth+"%"} onClick={clickHandler.bind(this, val, elem.id)}>{val ? (val.myHours + "/" + val.hours) : 0}</td>
      )
    }
    rows[i] = (
      <tr key={i}>
        <td width="30%"> {Object.keys(elements)[i]} </td>
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