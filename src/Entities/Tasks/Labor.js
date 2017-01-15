import moment from 'moment';
export default class Labor {
  constructor(json) {
    Object.assign(this, json);
    this.startDate= new Date(json.date*1000);
    this.comments = json.comments;
    if(this.comments) {
      this.comments.forEach(x=>{x.date = moment(new Date(x.created_dt * 1000)).format("LT, DD MMMM YYYY")});
    }
    this.commentsOpened = false;
  }
}