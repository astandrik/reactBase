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
  constructor(json, first, last, currentUser) {
    const dataInfo = json.data.tasks;
    const dateArray = getDates(first, last).map(x=> {
      return moment(x).format('DD.MM');
    });
    const groups = dataInfo.reduce((sum, current) => {
      let timings = {};
      current.timings.forEach(x => {
        x = new Labor(x);
        x.dateHeader = moment((new Date(x.startDate)).setHours(0,0,0,0)).format('DD.MM');
        if(!timings[x.dateHeader]) {
          timings[x.dateHeader] = [];
          timings[x.dateHeader].hours = 0;
          timings[x.dateHeader].myHours = 0;
        }
        timings[x.dateHeader].push(x);
        if(!isNaN(parseFloat(x.value))) {
          timings[x.dateHeader].hours += parseFloat(x.value);
          if(x.author.id == currentUser.id) {
            timings[x.dateHeader].myHours += parseFloat(x.value);
          }
        }
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