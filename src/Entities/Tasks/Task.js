export default class Task {
  constructor(json) {
    this.id = json.id;
    this.title = json.title;
    this.description = json.description;
    this.shortDescription = json.description.slice(0,400);
    this.descriptionOpen = false;
    this.status = json.status;
    this.type = json.type;
    this.children = json.children;
    this.opened = false;
    this.active = false;
    this.manager = "Арнольдович И.С."//json.manager;
    this.finance = json.finance;
    this.comments = json.comments;
    this.startDate = new Date(json.startDate.split(' ')[0]);
    this.code = json.code;
  }
}