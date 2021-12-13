"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

const toDoData = [];

const render = function () {
  localStorage.setItem("toDoData", JSON.stringify(toDoData));
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";
  toDoData.forEach(function (item, index) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons"><button class="todo-remove"></button><button class="todo-complete"></button></div>';
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });
    li.querySelector(".todo-remove").addEventListener("click", function () {
      toDoData.splice(index, 1);
      render();
    });
  });
};

if (localStorage.getItem("toDoData") !== null) {
  JSON.parse(localStorage.getItem("toDoData")).forEach(function (item) {
    toDoData.push(item);
  });
  render();
}

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();
  if (headerInput.value.trim().length > 0) {
    const newToDo = { text: headerInput.value, completed: false };
    toDoData.push(newToDo);
    headerInput.value = "";
    render();
  }
});
