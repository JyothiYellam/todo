const API_URL = "http://100.54.107.33:3000/api/todos";

async function getTodos() {

    const response = await fetch(API_URL);

    const todos = await response.json();

    const list = document.getElementById("todoList");

    list.innerHTML = "";

    todos.forEach(todo => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>
                ${todo.title}
                ${todo.completed ? " ✅" : ""}
            </span>

            <button onclick="updateTodo('${todo._id}', ${todo.completed})">
                Complete
            </button>

            <button onclick="deleteTodo('${todo._id}')">
                Delete
            </button>
        `;

        list.appendChild(li);
    });
}


async function addTodo() {

    const input = document.getElementById("todoInput");

    const title = input.value;

    if (!title) {
        return;
    }

    await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: title
        })
    });

    input.value = "";

    getTodos();
}


async function updateTodo(id, completed) {

    await fetch(`${API_URL}/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            completed: !completed
        })
    });

    getTodos();
}


async function deleteTodo(id) {

    await fetch(`${API_URL}/${id}`, {

        method: "DELETE"
    });

    getTodos();
}


getTodos();