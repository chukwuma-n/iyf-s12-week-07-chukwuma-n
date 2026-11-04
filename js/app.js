
import { state } from "./state.js";

import {
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    clearCompleted
} from "./todo-logic.js";

import {
    saveTodos,
    loadTodos
} from "./storage.js";

import {
    elements,
    render
} from "./ui.js";

// Load previously saved application data
const savedState = loadTodos();

if (savedState) {
    Object.assign(state, savedState);
}

// Display the application
function updateApp() {
    render(state);
    saveTodos(state);
}

// Add a new task
elements.form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = elements.input.value.trim();

    if (taskText === "") {
        elements.input.focus();
        return;
    }

    const result = addTodo(
        state.todos,
        taskText,
        state.nextId
    );

    state.todos = result.todos;
    state.nextId = result.nextId;

    elements.input.value = "";

    updateApp();
    elements.input.focus();
});

// Delete a task
elements.todoList.addEventListener("click", function (event) {
    if (!event.target.matches(".delete-task")) {
        return;
    }

    const li = event.target.closest("li");
    const taskId = Number(li.dataset.id);

    state.todos = deleteTodo(state.todos, taskId);

    updateApp();
});

// Complete or uncomplete a task
elements.todoList.addEventListener("change", function (event) {
    if (!event.target.matches(".complete-task")) {
        return;
    }

    const li = event.target.closest("li");
    const taskId = Number(li.dataset.id);

    state.todos = toggleTodo(state.todos, taskId);

    updateApp();
});

// Change task filter
elements.todoFilters.addEventListener("click", function (event) {
    if (!event.target.matches("button[data-filter]")) {
        return;
    }

    state.currentFilter = event.target.dataset.filter;

    updateApp();
});

// Clear completed tasks
elements.clearCompletedButton.addEventListener("click", function () {
    state.todos = clearCompleted(state.todos);

    updateApp();
});

// Edit a task by double-clicking its text
elements.todoList.addEventListener("dblclick", function (event) {
    if (!event.target.matches(".task-text")) {
        return;
    }

    const span = event.target;
    const li = span.closest("li");
    const taskId = Number(li.dataset.id);

    const task = state.todos.find(function (todo) {
        return todo.id === taskId;
    });

    if (!task) {
        return;
    }

    const editInput = document.createElement("input");

    editInput.type = "text";
    editInput.value = task.text;
    editInput.classList.add("edit-task-input");
    editInput.setAttribute("aria-label", "Edit task");

    span.replaceWith(editInput);

    editInput.focus();
    editInput.select();

    let editingFinished = false;

    function finishEditing(saveChanges) {
        if (editingFinished) {
            return;
        }

        editingFinished = true;

        if (saveChanges) {
            state.todos = editTodo(
                state.todos,
                taskId,
                editInput.value
            );
        }

        updateApp();
    }

    editInput.addEventListener("keydown", function (keyEvent) {
        if (keyEvent.key === "Enter") {
            keyEvent.preventDefault();
            finishEditing(true);
        }

        if (keyEvent.key === "Escape") {
            finishEditing(false);
        }
    });

    editInput.addEventListener("blur", function () {
        finishEditing(true);
    });
});

// Start the application
updateApp();
