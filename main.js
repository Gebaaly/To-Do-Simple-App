let input = document.querySelector(".add-task");
let btn = document.querySelector(".btn");
let taskDiv = document.querySelector(".task-div");

let arrayOfTasks = [];
if (localStorage.getItem("Tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("Tasks"));
}
getDataFromLocalStorage();
btn.onclick = function () {
  if (input.value != "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};
taskDiv.addEventListener("click", (e) => {
  deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
  }
});
taskDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("task")) {
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});
function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    compeleted: false,
  };
  arrayOfTasks.push(task);
  console.log(arrayOfTasks);
  addElementsToPageFrom(arrayOfTasks);
  addDataToLocalStorageFrom(arrayOfTasks);
}
function addElementsToPageFrom(arrayOfTasks) {
  taskDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.compeleted) {
      div.className("task done");
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    taskDiv.appendChild(div);

    console.log(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("Tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage(params) {
  let data = window.localStorage.getItem("Tasks");
  if (data) {
    let = tasks = JSON.parse(data);
    addElementsToPageFrom(arrayOfTasks);
  }
}
function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].compeleted = !arrayOfTasks[i].compeleted;
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}
