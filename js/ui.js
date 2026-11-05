import { filterTodos } from "./todo-logic.js";

export const elements = {
    form: document.querySelector("#todo-form"),
    input: document.querySelector("#todo-input"),
    todoList: document.querySelector("#todo-list"),
    itemsLeft: document.querySelector("#items-left"),
    todoFilters: document.querySelector("#todo-filters"),
    clearCompletedButton: document.querySelector("#clear-completed"),
};

export function render(state) {
    const { todos, currentFilter } = state;

    const { todoList, itemsLeft, todoFilters } = elements;

    todoList.textContent = "";

    const remaining = todos.filter(function (todo) {
        return !todo.completed;
    }).length;

    itemsLeft.textContent = `${remaining} ${remaining === 1 ? "item" : "items"} left`;

    const visibleTodos = filterTodos(todos, currentFilter);

    visibleTodos.forEach(function (todo) {
        const li = document.createElement("li");
        li.dataset.id = todo.id;

        if (todo.completed) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.classList.add("complete-task");
        checkbox.setAttribute("aria-label", "Mark task complete");

        const span = document.createElement("span");
        span.textContent = todo.text;
        span.title = "Double-click to edit";
        span.classList.add("task-text");

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-task");

        li.append(checkbox, span, deleteButton);
        todoList.appendChild(li);
    });

    const buttons = todoFilters.querySelectorAll("button[data-filter]");

    buttons.forEach(function (button) {
        const isSelected = button.dataset.filter === currentFilter;

        button.classList.toggle("active-filter", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
    });
}
