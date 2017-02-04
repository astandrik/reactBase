import React from "react";
import helpers from "./components/Table/tableHelpers";

export const debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};


export const testExportData = {
	"Задача 1": {
		"Иваныч":5,
		"Петрович": 7,
		"Михалыч": 9
	},
	"Задача 2": {
		"Иваныч":5,
		"Саныч": 7,
	},
	"Задача 3": {
		"Татьяныч":5,
		"Саныч": 7,
	}
}

export const parseReportTable = (data) => {
	let table = {};
	table.data = [];
	table.headers = [];
	let headersDict = {};
	for(let e in data) {
		table.data.push({name: e, data: data[e]});
		for(let k in data[e]) {
			headersDict[k] = true;
		}
	}
	for(let e in headersDict) {
		table.headers.push(e);
	}
	return table;
}

export const getTasksReportTable = (table) => {
	const rows = helpers.generateSimpleRows(table);
	const headers = helpers.generateSimpleHeaders(table);
	return {data: table, element: (
		  <table id="reports-table" className="reports-table" cellSpacing="0">
				<thead>
					{headers}
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
	)}
}

import excelDownloader from "./filesaver";

export const exportReportToExcel = function(json, headers) {
	excelDownloader(json, headers)
}