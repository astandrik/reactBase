import moment from "moment";

export default class User {
  constructor(json) {
    Object.assign(this, json);
    this.department_name = this.department.name;
    this.department = this.department.id;
  }
}