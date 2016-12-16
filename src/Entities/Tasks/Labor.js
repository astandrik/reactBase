export default class Labor {
  constructor(json) {
    Object.assign(this, json);
    this.startDate = new Date(json.startDate.split(' ')[0]);
    this.commentsOpened = false;
  }
}