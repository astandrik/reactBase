import Task from "./Task";
const dict = {
  "Мои задачи": 1,
  "Задачи подчинённых": 2,
  "Нераспределённые задачи": 3
}
function parseTree(tree, pInd) {
  let container = [];
  tree.forEach((item, index) => {
    let parentIndex = -1;
    if(item.type == "NODE") {
      parentIndex = dict[item.name];
    } else if(pInd) {
      parentIndex = pInd;
    }
    const children = parseTree(item.children, parentIndex);
    container[index] = {name:item.name, children: children, type: item.type};
    if(item.type === "TASK") {
      let obj = new Task(item.task);
      Object.assign(obj,container[index]);
      container[index] = obj;
    }
    container[index].globalIndex = parentIndex + "_" + container[index].id;
  });
  return container;
}

export default class TaskTree {
  constructor(json) {
    const tree = json;
    this.tree = parseTree(tree);
  }
}