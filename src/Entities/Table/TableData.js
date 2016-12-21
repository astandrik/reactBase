import moment from 'moment';
import _ from 'lodash';
export default class TableData {
  constructor(json) {
    json.forEach(x => {
      x.startDate = moment(x.startDate.split(' ')[0]).format('DD.MM');
    });
    const groups = _.groupBy(json, function (task) {
      return task.startDate;
    });
    const taskGroups = _.groupBy(json, function (task) {
      return task.code;
    });
    let data = {};
    data.headers = [];
    data.data = taskGroups;
    Object.keys(groups).forEach((x,i) => {
        data.headers[i] = x;
    });
    this.headers = data.headers;
    this.data = data.data;
  }
}