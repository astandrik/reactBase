export default class Task {
  constructor(json) {
    const task = json;
    this.title = task.name;
    this.id = task.id;
    this.description = task.description;
    this.shortDescription = task.description.slice(0,400);
    this.descriptionOpen = false;
    this.status = task.status;
    this.children = task.childTasks;
    this.opened = false;
    this.active = false;
    this.manager = task.author.name
    this.finance = task.finance;
    this.comments = task.comments;
    this.startDate = new Date(task.start_dt*1000);
    this.code = task.code.value;
  }
}