import React from "react";
import "../styles/taskTable.css";
import AddTrudModal from "../Modals/AddTrudModal";

const generateHeaders = function (headers) {
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

const generateRows = function(data) {
  let rows = [];
  const elements = data.data;
  for(var i = 0; i < Object.keys(elements).length;i++) {
    const elem = elements[Object.keys(elements)[i]];
    let td = [];
    let names = [];
    const tdWidth = 70 / data.headers.length;
    for(var j = 0; j < elem.length; j++) {
      const val = elem[j];
      td[j] = (
        <td key={j} width={tdWidth+"%"}>{val.timings ? val.timings.length : 0}</td>
      )
    }
    for(var j = elem.length; j < data.headers.length; j++) {
      td[j] = (
        <td key={j} width={tdWidth+"%"}>{0}</td>
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

const createTable = (tableData, props) => {
  const headers = generateHeaders(tableData.headers);
  const rows = generateRows(tableData);
  return (
    <div className="taskTable">
      <table className="taskTable" cellSpacing="0">
        <thead>
          <tr>
            {headers}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      <AddTrudModal isModalOpen={props.isTrudModalOpen} closeModal={props.closeModal.bind(this)} onSubmit={props.handleTrudSubmit} containerStyle={{maxHeight: '0'}}/>
    </div>
  )
}

export default (props) => {
  if(props.tableData && props.tableData.data && Object.keys(props.tableData.data).length > 0) {
    return createTable(props.tableData, props);
  } else {
    return <div></div>
  }
}