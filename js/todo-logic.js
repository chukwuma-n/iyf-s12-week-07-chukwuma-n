
export function addTodo(todos, text, nextId) {
    const newTodo = {
        id: nextId,
        text: text.trim(),
        completed: false
    };

    return {
        todos: [...todos, newTodo],
        nextId: nextId + 1
    };
}

export function deleteTodo(todos, id) {
    return todos.filter(function (todo) {
        return todo.id !== id;
    });
}

export function toggleTodo(todos, id) {
    return todos.map(function (todo) {
        if (todo.id === id) {
            return {
                ...todo,
                completed: !todo.completed
            };
        }

        return todo;
    });
}

export function editTodo(todos, id, newText) {
    const text = newText.trim();

    if (text === "") {
        return todos;
    }

    return todos.map(function (todo) {
        if (todo.id === id) {
            return {
                ...todo,
                text: text
            };
        }

        return todo;
    });
}

export function clearCompleted(todos) {
    return todos.filter(function (todo) {
        return !todo.completed;
    });
}

export function filterTodos(todos, filter) {
    if (filter === "active") {
        return todos.filter(function (todo) {
            return !todo.completed;
        });
    }

    if (filter === "completed") {
        return todos.filter(function (todo) {
            return todo.completed;
        });
    }

    return todos;
}
