import moment from "moment";
const statusDict = {
  0: "Новая",
  1: "Подтверждена",
  2: "Отклонена"
}
export default class Labor {
  constructor(json) {
    Object.assign(this, json);
    this.startDate= new Date(json.date*1000);
    this.comments = json.comments;
    if(this.comments) {
      this.comments.forEach(x=>{x.date = moment(new Date(x.created_dt * 1000)).format("LT, DD MMMM YYYY")});
    }
    this.commentsOpened = false;
    this.rawstatus = json.status;
    this.comment = json.description;
    this.hours = json.value;
    this.status = statusDict[json.status];
    this.status = this.status=== undefined ? "Вычисляется" : this.status;
    this.code = {
        label: json.code.value,
        value: json.code.id
    };
    this.finance = {
      label: json.finance.value,
      value: json.finance.id
    }
  }
}