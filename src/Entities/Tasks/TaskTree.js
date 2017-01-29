import Task from "./Task";
const dict = {
  "Мои задачи": 1,
  "Задачи подчинённых": 2,
  "Нераспределённые задачи": 3
}
let tasks = {
  byId: {},
  byGlobalId: {}
};

function parseTree(tree, pInd, level) {
  let container = [];
  container.globalIndexes = [];
  tree.forEach((item, index) => {
    let parentIndex = -1;
    if(item.type === "NODE") {
      parentIndex = dict[item.name];
    } else if(pInd) {
      parentIndex = pInd;
    }
    const children = parseTree(item.children, parentIndex, level+1);
    container[index] = {name:item.name, children: children, type: item.type,
      childrenGlobalIndexes: children.globalIndexes,
      level: level};
    if(item.type === "TASK") {
      let obj = new Task(item.task);
      Object.assign(obj,container[index]);
      container[index] = obj;
      if(!tasks.byId[container[index].id]) {
        tasks.byId[container[index].id] = [];
      }
      tasks.byId[container[index].id] = tasks.byId[container[index].id].concat(container[index]);
        container[index].type = "task";
    } else {
        container[index].type = "node";
    }
    container[index].globalIndex = parentIndex + "_" + container[index].id;
    tasks.byGlobalId[parentIndex + "_" + container[index].id] =   container[index];
    container.globalIndexes[index] = container[index].globalIndex;
  });
  return container;
}

export default class TaskTree {
  constructor(json) {
    tasks = {
      byId: {},
      byGlobalId: {},
      allIds: []
    };
    const tree = json;
    this.tree = parseTree(tree, 0,0);
    this.treeNormalized = tasks;
  }
}