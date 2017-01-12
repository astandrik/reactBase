const statusDict = {
  0: "Новая",
  1: "Подтверждена",
  2: "Отклонена"
}
export default class Labor {
  constructor(json) {
    Object.assign(this, json);
    this.startDate= new Date(json.date*1000);
    this.comments = [];
    this.commentsOpened = false;
    this.status = statusDict[json.status];
    this.status = this.status=== undefined ? "Вычисляется" : this.status;
  }
}