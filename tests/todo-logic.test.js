import test from "node:test";
import assert from "node:assert/strict";

import {
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    clearCompleted,
    filterTodos,
} from "../js/todo-logic.js";

// TEST 1: Add a new todo
test("addTodo adds a new task", () => {
    const todos = [];

    const result = addTodo(todos, "Learn JavaScript", 1);

    assert.equal(result.todos.length, 1);
    assert.equal(result.todos[0].text, "Learn JavaScript");
    assert.equal(result.todos[0].completed, false);
    assert.equal(result.nextId, 2);
});

// TEST 2: Delete a todo
test("deleteTodo removes the selected task", () => {
    const todos = [
        { id: 1, text: "Learn HTML", completed: false },
        { id: 2, text: "Learn CSS", completed: false },
    ];

    const result = deleteTodo(todos, 1);

    assert.equal(result.length, 1);
    assert.equal(result[0].id, 2);
});

// TEST 3: Toggle a todo
test("toggleTodo changes a task's completion status", () => {
    const todos = [{ id: 1, text: "Learn JavaScript", completed: false }];

    const result = toggleTodo(todos, 1);

    assert.equal(result[0].completed, true);
});

// TEST 4: Edge case - reject empty edited text
test("editTodo ignores empty text", () => {
    const todos = [{ id: 1, text: "Learn JavaScript", completed: false }];

    const result = editTodo(todos, 1, "   ");

    assert.equal(result[0].text, "Learn JavaScript");
});

// TEST 5: Clear completed tasks
test("clearCompleted removes completed tasks", () => {
    const todos = [
        { id: 1, text: "Learn HTML", completed: true },
        { id: 2, text: "Learn CSS", completed: false },
    ];

    const result = clearCompleted(todos);

    assert.equal(result.length, 1);
    assert.equal(result[0].id, 2);
});

// TEST 6: Original array must not be modified
test("deleteTodo does not modify the original array", () => {
    const todos = [
        { id: 1, text: "Learn HTML", completed: false },
        { id: 2, text: "Learn CSS", completed: false },
    ];

    const originalTodos = structuredClone(todos);

    deleteTodo(todos, 1);

    assert.deepEqual(todos, originalTodos);
});

// TEST 7: Filter completed tasks
test("filterTodos returns only completed tasks", () => {
    const todos = [
        { id: 1, text: "Learn HTML", completed: true },
        { id: 2, text: "Learn CSS", completed: false },
    ];

    const result = filterTodos(todos, "completed");

    assert.equal(result.length, 1);
    assert.equal(result[0].id, 1);
});
