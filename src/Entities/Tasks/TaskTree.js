import Task from "./Task";
function parseTree(tree) {
  let container = [];
  tree.forEach((item, index) => {
    const children = parseTree(item.children);
    container[index] = {name:item.name, children: children, type: item.type};
    if(item.type === "TASK") {
      Object.assign(container[index], new Task(item.task));
    }
  });
  return container;
}
export default class TaskTree {
  constructor(json) {
    const tree = json;
    this.tree = parseTree(tree);
  }
}