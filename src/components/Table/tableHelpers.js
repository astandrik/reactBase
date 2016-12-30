import React from "react";
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
  if(!data || data.length == 0) {
    return [];
  }
  for(var i = 0; i < Object.keys(elements).length;i++) {
    const elem = elements[Object.keys(elements)[i]];
    let td = [];
    let names = [];
    const tdWidth = 70 / data.headers.length;
    for(var j = 0; j < headers.length; j++) {
      const val = elem[headers[j]];
      td[j] = (
        <td key={j} className="tableCell" width={tdWidth+"%"} onClick={clickHandler.bind(this, val, elem.id)}>{val ? val.length : 0}</td>
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

helpers.getDateRange = function(day) {
  var curr = new Date(day); // get current date
  var curr2 = new Date(day); // get current date
  var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
  var last = first + 6; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first));
  var lastday = new Date(curr2.setDate(last));
  return {first: firstday, last: lastday};
}

export default helpers;