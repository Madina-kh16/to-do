let tasks = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

const input = document.querySelector(".todo__text");
const btnAdd = document.querySelector(".todo__add");
const todoItems = document.querySelector(".todo__items");
const select = document.querySelector(".todo__options");

const createTask = (event) => {
  event.preventDefault();
  if (
    input.value.trim() !== "" &&
    tasks.every((task) => task.value !== input.value)
  ) {
    const task = {
      value: input.value,
      isCompleted: false,
      time: new Date().toLocaleString(),
    };
    tasks.push(task);
    renderTasks(tasks);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
};

const renderTasks = (tasks) => {
  todoItems.innerHTML = "";
  for (let task of tasks) {
    const li = document.createElement("li");
    li.classList.add("todo__item");
    const todoTask = document.createElement("span");
    const todoValue = document.createElement("span");
    todoValue.innerText = task.value;
    todoValue.classList.add("todo__value");
    todoTask.classList.add(
      "todo__task",
      task.isCompleted ? "completed" : "no-completed"
    );
    todoTask.append(todoValue);
    todoTask.innerHTML += `<span class="todo__date">${task.time}</span>`;
    li.append(todoTask);
    li.innerHTML += `<span class="todo__action todo__action_complete"></span>
  <span class="todo__action todo__action_delete"></span>`;
    todoItems.append(li);
  }
};

const checkedTasks = (event) => {
  const tag = event.target;
  if (tag.classList.contains("todo__action_complete")) {
    tasks = tasks.map((task) =>
      task.value === tag.parentNode.querySelector(".todo__value").innerText
        ? {
            ...task,
            isCompleted: !task.isCompleted,
          }
        : task
    );
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(tasks);
};

const removeTasks = (event) => {
  const tag = event.target;
  if (tag.classList.contains("todo__action_delete")) {
    const newTasks = tasks.filter(
      (task) =>
        tag.parentNode.querySelector(".todo__value").innerText !== task.value
    );
    tasks = newTasks;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);
  }
};

const activeTasks = () => {
  const newActiveTasks = tasks.filter((task) => !task.isCompleted);
  renderTasks(newActiveTasks);
};

const completedTasks = () => {
  const newCompletedTasks = tasks.filter((task) => task.isCompleted);
  renderTasks(newCompletedTasks);
};

const selectTasks = (event) => {
  if (event.target.value === "all") {
    renderTasks(tasks);
  } else if (event.target.value === "active") {
    activeTasks();
  } else if (event.target.value === "completed") {
    completedTasks();
  }
};

localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

btnAdd.addEventListener("click", createTask);
todoItems.addEventListener("click", removeTasks);
todoItems.addEventListener("click", checkedTasks);
select.addEventListener("click", selectTasks);
renderTasks(tasks);
