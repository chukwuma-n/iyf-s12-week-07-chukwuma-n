
const STORAGE_KEY = "week7-todo-app";

export function saveTodos(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.error("Unable to save tasks:", error);
    }
}

export function loadTodos() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (!savedData) {
            return null;
        }

        const parsedData = JSON.parse(savedData);

        if (
            !parsedData ||
            !Array.isArray(parsedData.todos) ||
            !Number.isInteger(parsedData.nextId) ||
            parsedData.nextId < 1 ||
            !["all", "active", "completed"].includes(
                parsedData.currentFilter
            )
        ) {
            return null;
        }

        const validTodos = parsedData.todos.every(function (todo) {
            return (
                todo &&
                Number.isInteger(todo.id) &&
                typeof todo.text === "string" &&
                typeof todo.completed === "boolean"
            );
        });

        if (!validTodos) {
            return null;
        }

        return parsedData;
    } catch (error) {
        console.error("Unable to load saved tasks:", error);
        return null;
    }
}
