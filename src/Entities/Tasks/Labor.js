export default class Labor {
  constructor(json) {
    Object.assign(this, json);
    this.startDate= new Date(json.date*1000);
    this.comments = [];
    this.commentsOpened = false;
  }
}