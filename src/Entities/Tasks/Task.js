const statusDict = {
  0: "Активна",
  1: "Завершена",
  2: "Удалена"
}

export default class Task {
    constructor(json) {
        const task = json;
        this.title = task.name;
        this.name = task.name;
        this.id = task.id;
        this.description = task.description;
        this.shortDescription = task.description.slice(0, 400);
        this.descriptionOpen = false;
        this.status = statusDict[task.status];
        this.status = this.status=== undefined ? "Неопознанный" : this.status;
        this.children = task.children;
        this.opened = false;
        this.active = false;
        this.author = task.author.name
        this.finance = task.finance;
        this.comments = task.comments;
        this.executors = task.executors;
        this.startDate = new Date(task.start_dt * 1000);
        this.code = {
            label: task.code.value,
            value: task.code.id
        };
    }
}
