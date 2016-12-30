import moment from 'moment';
import _ from 'lodash';
import Labor from "../Tasks/Labor";
const addDays = function(date, days) {
    var dat = date;
    dat.setDate(dat.getDate() + days);
    return dat;
}

function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push( new Date (currentDate) )
        currentDate = addDays(currentDate,1);
    }
    return dateArray;
}

export default class TableData {
  constructor(json, first, last) {
    const dataInfo = json.data.tasks;
    const dateArray = getDates(first, last).map(x=> {
      return moment(x).format('DD.MM');
    });
    const groups = dataInfo.reduce((sum, current) => {
      let timings = {};
      current.timings.forEach(x => {
        x.date=((new Date(x.date*1000)).setHours(0,0,0,0));
        x.date = moment(x.date).format('DD.MM');
        if(!timings[x.date]) {
          timings[x.date] = [];
        }
        x = new Labor(x);
        timings[x.date].push(x);
      });
      timings.id = current.id;
      sum[current.name] = timings;
      return sum;
    }, {});
    let data = {};
    data.headers = dateArray;
    data.data = groups;
    this.headers = data.headers;
    this.data = data.data;
  }
}