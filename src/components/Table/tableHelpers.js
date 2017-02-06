import React from "react";
import {getDateRange, getDateMonthRange} from "../../redux/actions/tableActions";
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
    if(elem.id === activeId) {
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
          if(val[k].rawstatus === 0) {
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
      const commentsNumber = val ? val.timings.reduce((sum, cur) => sum + cur.comments.length, 0) : 0;
      datedLabors[headers[j]] = val ? datedLabors[headers[j]].concat(val.timings.reduce((sum, cur) => sum.concat(cur), []).filter(x => x.rawstatus === 0)) :  datedLabors[headers[j]];
      let comments = <div className="noDisplay"/>;
      if(commentsNumber > 0) {
        comments = <div className="comments-number">{commentsNumber}</div>
      }
      td[j] = (
        <td key={j} className={`tableCell  ${hasUnaccepted ? 'has-unaccepted' : ''}
        ${elem.active && (headers[j] === props.currentDay || props.currentDay === false)? "active" : ''}`} width={tdWidth+"%"}
          onClick={clickHandler.bind(this, val, elem.id, headers[j])}>{val ? (val.myHours + "/" + val.hours) : 0}
        {comments}</td>
      )
    }
    const executors = taskHelpers.createExecutors(elem.executors);
    rows[i] = (
      <tr key={i}>
        <td width="30%" className={`tableCell ${elem.active? "active" : ''}`} onClick={rowClickHandler.bind(this, labors, elem.id)}>
          {Object.keys(elements)[i].split("|id|")[0]} {executors} </td>
        {td}
      </tr>
    )
  }
  let finalcell = [];
  for(let j = 0; j < headers.length; j++) {
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
  const finalRows = rows.concat(finalRow);
  return {rows: finalRows, datedLabors};
}


helpers.getWeek = function(date) {
    var onejan = new Date(date.getFullYear(),0,1);
    var today = new Date(date.getFullYear(),date.getMonth(),date.getDate());
    var dayOfYear = ((today - onejan +1)/86400000);
    return Math.ceil(dayOfYear/7)
};

const cellGenerator = (val, key) => {
  return (<td className="tableCell" key={key}>{val}</td>);
}
const rowGenerator = (tds, key) => {
  return (
    <tr key={key}>
      {tds}
    </tr>
  )
}

helpers.generateSimpleRows = function(table) {
  const headers = table.headers;
  const data = table.data;
  let rows = [];
  for(let i = 0; i < data.length; i++) {
    const currentTask = data[i].data;
    let currentTds = [cellGenerator(data[i].name,"name")];
    for(let j = 0; j < headers.length; j++) {
      if(currentTask[headers[j]]) {
        currentTds.push(cellGenerator(currentTask[headers[j]], j))
      } else {
        currentTds.push(cellGenerator(0, j));
      }
    }
    rows.push(rowGenerator(currentTds, i));
  }
  return rows;
}

helpers.generateSimpleHeaders = function(table)  {
 const headers = table.headers;
 let ths= [<th key="empty"></th>];
 for(let i = 0; i < headers.length; i++) {
   ths.push(<th  className="table-header" key={i}>{headers[i]}</th>)
 }
 return rowGenerator(ths, "head");
}

helpers.generateUserReportTable = function(user) {
  let rows = [];
  const daysNumber = user.days.length;
  let tick = true;
  rows = [(
    <tr key="first-row">
      <th className="tg-yw4l" colSpan="2" rowSpan="4"  key="fio-header">
        Фамилия, имя, отчество
      </th>
      <th  className="tg-yw4l" colSpan="2" rowSpan="4" key="number-header">
        Учетный номер
      </th>
      <th className="tg-yw4l" colSpan="2" rowSpan="4"  key="position-header">
        Должность (профессия)
      </th>
      <th className="tg-yw4l" rowSpan="2" colSpan={daysNumber+3}  key="monthDates">
        Числа месяца
      </th>
    </tr>),
    <tr key="3422">
    </tr>];
  let rownumbers = [<td className="tg-yw4l" colSpan="2" key="1" >1</td>,<td className="tg-yw4l" colSpan="2" key="2">2</td>,<td className="tg-yw4l" colSpan="2" key="3">3</td>];
  let daysArr = [];
  let dayTypesInfo = [];
  let financeRows = [];
  for(let i = 0; i < user.days.length; i++) {
    daysArr.push(<td rowSpan="2" className="tg-yw4l" key={`days${i}`}>{i+1}</td>)
    dayTypesInfo.push(<td className="tg-yw4l" key={i+88}>{user.days[i].dayType}</td>);
    rownumbers.push(<td className="tg-yw4l" key={i+3488}>{i+4}</td>)
  };
  let i = 0;
  let totalFinanceCells = [];
  let firstRows = [];
  let secondRows = [];
  for(; i < user.longestFinance; i++) {
      let firstRow = [];
      let secondRow = [];
      for(let j = 0; j < user.days.length; j++) {
        if(user.days[i].finance && user.days[j].finance[i]) {
          firstRow.push(<td className="tg-yw4l" rowSpan="3" key={j + i+15228}>{user.days[j].finance[i].hours}</td>)
          secondRow.push(<td className="tg-yw4l" rowSpan="3" key={j+ i +323458}>{user.days[j].finance[i].name}</td>)
        } else {
          firstRow.push(<td className="tg-yw4l" rowSpan="3" key={j+ i +158123}></td>)
          secondRow.push(<td className="tg-yw4l" rowSpan="3" key={j+ i + 35128}></td>)
        }
      }
      firstRows.push(firstRow
      )
      secondRows.push(secondRow
      )
  }
  let globalCounter = 0;
  for(let i = 0; i < user.totalFinance.length; i++) {
    if(!firstRows[globalCounter]) {
      let firstRow = [];
      let secondRow = [];
      for(let j = 0; j < user.days.length; j++) {
        firstRow.push(<td className="tg-yw4l" rowSpan="3" key={j+ i +158123}></td>)
        secondRow.push(<td className="tg-yw4l" rowSpan="3" key={j+ i + 35128}></td>)
      }
      firstRows.push(firstRow
      )
      secondRows.push(secondRow
      )
    }
    if(tick) {
      tick = false;
      if(user.totalFinance[i]) {
        firstRows[globalCounter].push(<td className="tg-yw4l" rowSpan="3" colSpan="3" key={ i-128}>{user.totalFinance[i].value} - {`${user.totalFinance[i].days}/${user.totalFinance[i].hours}`}</td>)
      } else {
        break;
      }
    } else {
      tick = true;
      if(user.totalFinance[i]) {
        secondRows[globalCounter].push(<td className="tg-yw4l" rowSpan="3" colSpan="3" key={ i-15228}>{user.totalFinance[i].value} - {`${user.totalFinance[i].days}/${user.totalFinance[i].hours}`}</td>)
      } else {
        break;
      }
      globalCounter++;
    }
  }
  let totalRowCounter = firstRows.length*3 + secondRows.length*3 + 2;
  const userInfo = [
    <td className="tg-yw4l" rowSpan={totalRowCounter} colSpan="2" key="fio"> {user.name} </td>,
    <td className="tg-yw4l" rowSpan={totalRowCounter} colSpan="2" key="number"> {user.number} </td>,
    <td className="tg-yw4l" rowSpan={totalRowCounter} colSpan="2" key="position"> {user.position} </td>
  ]
  for(let i = 0; i < user.days.length; i++) {
    userInfo.push(
      <td className="tg-yw4l"  key={i+43}>{user.days[i].hours}</td>
     )
  }
  for(let i = 0; i < firstRows.length; i++) {
    financeRows.push(<tr key ={i+13*76}>{firstRows[i]}</tr>);
    financeRows.push(<tr key={i-115}></tr>)
    financeRows.push(<tr key={i-2415}></tr>)
    financeRows.push(<tr key ={i*13}>{secondRows[i]}</tr>);
    financeRows.push(<tr key={i+123215}></tr>)
    financeRows.push(<tr key={i+1232}></tr>)
  }
  rows.push(
    <tr key="second-row">
      {daysArr}
      <td rowSpan="2" colSpan="3" className="tg-yw4l"> Всего дней (часов) явок (неявок) </td>
    </tr>
  )
  rows.push(  <tr key="mmm"></tr>)
  rownumbers.push(<td key="hm" className="tg-yw4l" colSpan="3" >{daysNumber+4}</td>);
  rows.push(<tr key="numbers-row" >{rownumbers}</tr>);
  dayTypesInfo.push(<td className="tg-yw4l" key="empty"></td>)

  userInfo.push(<td className="tg-yw4l" colSpan="3" key="itogo">{`Ф - ${user.totalDays}/${user.totalHours}`}</td>);
  rows.push(<tr key="row-four">{userInfo}</tr>);
  rows.push(<tr key="row-five">{dayTypesInfo}</tr>);
  rows = rows.concat(financeRows);
  return rows;
}

helpers.getDateRange = getDateRange;
helpers.getDateMonthRange = getDateMonthRange;

export default helpers;