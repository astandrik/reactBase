/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.0
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var XLSX = window.XLSX;

var saveAs = saveAs || (function (view) {
    "use strict";
    // IE <10 is explicitly unsupported
    if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
        return;
    }
    var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function () {
		    return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function (node) {
		    var event = new MouseEvent("click");
		    node.dispatchEvent(event);
		}
		, is_safari = /constructor/i.test(view.HTMLElement)
		, throw_outside = function (ex) {
		    (view.setImmediate || view.setTimeout)(function () {
		        throw ex;
		    }, 0);
		}
		, force_saveable_type = "application/octet-stream"
		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
		, arbitrary_revoke_timeout = 1000 * 40 // in ms
		, revoke = function (file) {
		    var revoker = function () {
		        if (typeof file === "string") { // file is an object URL
		            get_URL().revokeObjectURL(file);
		        } else { // file is a File
		            file.remove();
		        }
		    };
		    setTimeout(revoker, arbitrary_revoke_timeout);
		}
		, dispatch = function (filesaver, event_types, event) {
		    event_types = [].concat(event_types);
		    var i = event_types.length;
		    while (i--) {
		        var listener = filesaver["on" + event_types[i]];
		        if (typeof listener === "function") {
		            try {
		                listener.call(filesaver, event || filesaver);
		            } catch (ex) {
		                throw_outside(ex);
		            }
		        }
		    }
		}
		, auto_bom = function (blob) {
		    // prepend BOM for UTF-8 XML and text/* types (including HTML)
		    // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
		    if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
		        return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type });
		    }
		    return blob;
		}
		, FileSaver = function (blob, name, no_auto_bom) {
		    if (!no_auto_bom) {
		        blob = auto_bom(blob);
		    }
		    // First try a.download, then web filesystem, then object URLs
		    var
				  filesaver = this
				, type = blob.type
				, force = type === force_saveable_type
				, object_url
				, dispatch_all = function () {
				    dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function () {
				    if (force && is_safari && view.FileReader) {
				        // Safari doesn't allow downloading of blob urls
				        var reader = new FileReader();
				        reader.onloadend = function () {
				            var base64Data = reader.result;
				            view.location.href = "data:attachment/file" + base64Data.slice(base64Data.search(/[,;]/));
				            filesaver.readyState = filesaver.DONE;
				            dispatch_all();
				        };
				        reader.readAsDataURL(blob);
				        filesaver.readyState = filesaver.INIT;
				        return;
				    }
				    // don't create more object URLs than needed
				    if (!object_url) {
				        object_url = get_URL().createObjectURL(blob);
				    }
				    if (force) {
				        view.location.href = object_url;
				    } else {
				        var opened = view.open(object_url, "_blank");
				        if (!opened) {
				            // Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
				            view.location.href = object_url;
				        }
				    }
				    filesaver.readyState = filesaver.DONE;
				    dispatch_all();
				    revoke(object_url);
				}
		    ;
		    filesaver.readyState = filesaver.INIT;

		    if (can_use_save_link) {
		        object_url = get_URL().createObjectURL(blob);
		        setTimeout(function () {
		            save_link.href = object_url;
		            save_link.download = name;
		            click(save_link);
		            dispatch_all();
		            revoke(object_url);
		            filesaver.readyState = filesaver.DONE;
		        });
		        return;
		    }

		    fs_error();
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function (blob, name, no_auto_bom) {
		    return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
		}
    ;
    // IE 10+ (native saveAs)
    if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
        return function (blob, name, no_auto_bom) {
            name = name || blob.name || "download";

            if (!no_auto_bom) {
                blob = auto_bom(blob);
            }
            return navigator.msSaveOrOpenBlob(blob, name);
        };
    }

    FS_proto.abort = function () { };
    FS_proto.readyState = FS_proto.INIT = 0;
    FS_proto.WRITING = 1;
    FS_proto.DONE = 2;

    FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

    return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

function sheet_from_array_of_arrays(data, opts) {
    var ws = {};
    var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
    for (var R = 0; R != data.length; ++R) {
        for (var C = 0; C != data[R].length; ++C) {
            if (range.s.r > R) range.s.r = R;
            if (range.s.c > C) range.s.c = C;
            if (range.e.r < R) range.e.r = R;
            if (range.e.c < C) range.e.c = C;
            var cell = { v: data[R][C] };
            if (cell.v == null) continue;
            var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

            /* TEST: proper cell types and value handling */
            if (typeof cell.v === 'number') cell.t = 'n';
            else if (typeof cell.v === 'boolean') cell.t = 'b';
            else if (cell.v instanceof Date) {
                cell.t = 'n'; cell.z = XLSX.SSF._table[14];
                cell.v = datenum(cell.v);
                cell.s = {
                    patternType: 'solid',
                    fgColor: { theme: 8, tint: 0.3999755851924192, rgb: '9ED2E0' },
                    bgColor: { indexed: 64 }
                };
            }
            else cell.t = 's';
            if(!cell.s) {
              cell.s = {alignment: { wrapText: true}};
            }
            ws[cell_ref] = cell;
        }
    }

    /* TEST: proper range */
    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
    return ws;
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

function datenum(v, date1904) {
    if (date1904) v += 1462;
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function Workbook() {
    if (!(this instanceof Workbook)) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
}

export function downloadExcel(jsonObj, gridHeaders) {
    // Test script to generate a file from JavaScript such
    // that MS Excel will honor non-ASCII characters.

    // Simple type mapping; dates can be hard
    // and I would prefer to simply use `datevalue`
    // ... you could even add the formula in here.
    var data = typeof jsonObj != "object" ? JSON.parse(jsonObj) : jsonObj;
    var headers = [];
    var ws = [];
    if (data[0]) {
        data = data.slice(0, data.length);

        var wscols = [];
        for (var e in data[0]) {
            var flag = 0;
            gridHeaders.forEach(function (h, index) {
              headers[index] = h;
              wscols.push({ wch: 20 });
            })
        }
        var tableData = [headers];

        data.forEach(function (item) {
           var row = [];
           var hasName = false;
           if(item.name){
             hasName = true;
            row.push(item.name);
          }
          let startIndex = 0;
          if(hasName) {
            startIndex = 1;
          }
          for(let index = startIndex; index < gridHeaders.length; index++) {
              const h = gridHeaders[index];
              row[index] = item.data[h];
          }

            tableData.push(row);
        })
        var ws_name = "TableData";


        /* require XLSX */

        /* dummy workbook constructor */

        var wb = new Workbook();


        /* TODO: date1904 logic */

        /* convert an array of arrays in JS to a CSF spreadsheet */

        var ws = sheet_from_array_of_arrays(tableData);

        /* TEST: add worksheet to workbook */
        wb.SheetNames.push(ws_name);
        wb.Sheets[ws_name] = ws;

        /* TEST: column widths */
        ws['!cols'] = wscols;

        /* write file */
        /* bookType can be 'xlsx' or 'xlsm' or 'xlsb' */
        var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };

        var wbout = XLSX.write(wb, wopts);


        /* the saveAs call downloads a file on the local machine */
        saveAs(new Blob([s2ab(wbout)], { type: "" }), "Export.xlsx")
    }
}



function generateArray(table) {
    var out = [];
    var rows = table.querySelectorAll('tr');
    var ranges = [];
    var wscols = [

];


    for (var R = 0; R < rows.length; ++R) {
        var outRow = [];
        var row = rows[R];
        var columns = row.querySelectorAll('td');
        if(columns.length == 0) {
          columns = row.querySelectorAll('th');
        }
        for (var C = 0; C < columns.length; ++C) {
            var cell = columns[C];
            var colspan = cell.getAttribute('colspan');
            var rowspan = cell.getAttribute('rowspan');
            var cellValue = cell.innerText;
            if(cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

            //Skip ranges
            ranges.forEach(function(range) {
                if(R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
                    for(var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
                }
            });

            //Handle Row Span
            if (rowspan || colspan) {
                rowspan = rowspan || 1;
                colspan = colspan || 1;
                rowspan = parseInt(rowspan);
                colspan = parseInt(colspan);
                ranges.push({s:{r:R, c:outRow.length},e:{r:R+rowspan-1, c:outRow.length+colspan-1}});
            };
            if(R === 0) {
              if(colspan) {
                colspan = parseInt(colspan);
                for(let i = 0; i < colspan;i++) {
                  wscols.push({wpx : cellValue==="Числа месяца" ? 60: 45})
                }
              } else {
                  wscols.push({wpx : 45})
              }
            }
            //Handle Value
            outRow.push(cellValue !== "" ? cellValue : null);

            //Handle Colspan
            if (colspan) for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
        }
        out.push(outRow);
    }
    return [out, ranges,wscols];
};

export function htmlToExcel(tableSelector) {
  const type = "xlsx";
  var theTable = tableSelector;
  var oo = generateArray(theTable);
  var ranges = oo[1];
  var width = oo[2];
  /* original data */
  var data = oo[0];
  var ws_name = "SheetJS";
  console.log(data);

  var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);

  /* add ranges to worksheet */
  ws['!merges'] = ranges;
  ws['!cols'] = width;
  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, {bookType:type, bookSST:false, type: 'binary'});
  var fname = 'test.' + type;
  saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), fname);
}
