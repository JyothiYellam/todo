async function getTodos() {

    try {

        const response = await fetch(config.API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch todos");
        }

        const todos = await response.json();

        const list = document.getElementById("todoList");

        list.innerHTML = "";

        todos.forEach(todo => {

            const li = document.createElement("li");

            li.innerHTML = `
                <span class="${todo.completed ? "completed" : ""}">
                    ${todo.title}
                </span>

                <div>

                    <button
                        onclick="updateTodo('${todo._id}', ${todo.completed})">
                        ${todo.completed ? "Undo" : "Complete"}
                    </button>

                    <button
                        onclick="deleteTodo('${todo._id}')">
                        Delete
                    </button>

                </div>
            `;

            list.appendChild(li);

        });

    } catch (error) {

        console.error("Error fetching todos:", error);

    }
}


async function addTodo() {

    const input = document.getElementById("todoInput");

    const title = input.value.trim();

    if (!title) {
        return;
    }

    try {

        const response = await fetch(config.API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: title
            })

        });

        if (!response.ok) {
            throw new Error("Failed to create todo");
        }

        input.value = "";

        await getTodos();

    } catch (error) {

        console.error("Error adding todo:", error);

    }
}


async function updateTodo(id, completed) {

    try {

        const response = await fetch(
            `${config.API_URL}/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    completed: !completed
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update todo");
        }

        await getTodos();

    } catch (error) {

        console.error("Error updating todo:", error);

    }
}


async function deleteTodo(id) {

    try {

        const response = await fetch(
            `${config.API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete todo");
        }

        await getTodos();

    } catch (error) {

        console.error("Error deleting todo:", error);

    }
}


getTodos();