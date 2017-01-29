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
    let datedLabors = {};
    const dateArray = getDates(first, last).map(x=> {
      const date =  moment(x).format('DD.MM');
      datedLabors[date] = [];
      datedLabors[date].overallMy = 0;
      datedLabors[date].overallTotal = 0;
      return date;
    });
    let datedTaskLabors = {};
    for(let i = 0; i < dataInfo.length; i++) {
      let timings = dataInfo[i].timings.map(x => new Labor(x));
      const taskName = dataInfo[i].name + "|id|" + dataInfo[i].id;
      datedTaskLabors[taskName] = {
        timings: timings,
        executors: dataInfo[i].executors,
        id: dataInfo[i].id,
        dates: {}
      };
      for(let j = 0; j < dateArray.length; j++) {
        datedTaskLabors[taskName].dates[dateArray[j]] = {
          val: 0,
          timings:  [],
          id: dataInfo[i].id,
          executors: dataInfo[i].executors
        };
      }

      for(let j = 0; j < dateArray.length; j++) {
        let currentTimings = timings.filter(x => x.date === dateArray[j]);
        let overallMy = 0;
        let overallTotal = 0;
        for(let k = 0; k < currentTimings.length; k++) {
            datedLabors[dateArray[j]].push(currentTimings[k]);
            let hours = 0;
            let myHours = 0;
            let val = currentTimings[k].value;
            if(!isNaN(parseFloat(val))) {
              hours += parseFloat(val);
              overallTotal += parseFloat(val);
              if(currentTimings[k].author.id === currentUser.id) {
                myHours += parseFloat(val);
                overallMy += parseFloat(val);
              }
            }
          datedTaskLabors[taskName].dates[currentTimings[k].date].val = `${myHours}/${hours}`;
          datedTaskLabors[taskName].dates[currentTimings[k].date].timings = currentTimings;
          datedTaskLabors[taskName].dates[currentTimings[k].date].hasUnaccepted = currentTimings.some(x => x.rawstatus === 0);
          datedTaskLabors[taskName].dates[currentTimings[k].date].commentsNumber = currentTimings.reduce((s,c) => s+c.comments.length,0);
        }
        datedLabors[dateArray[j]].overallMy += overallMy;
        datedLabors[dateArray[j]].overallTotal += overallTotal;
      }
    }
    for(let i = 0; i < dateArray.length; i++) {
      datedLabors[dateArray[i]].overall = `${datedLabors[dateArray[i]].overallMy}/${datedLabors[dateArray[i]].overallTotal}`;
    }
    let data = {};
    data.headers = dateArray;
    data.data = datedTaskLabors;
    this.headers = data.headers;
    this.data = data.data;
    this.datedLabors = datedLabors;
  }
}