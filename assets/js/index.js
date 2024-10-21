document.getElementById('fetchTodos').addEventListener('click', obtenerTodos);
document.getElementById('createTodo').addEventListener('click', crearTodo);

const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

function obtenerTodos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const todosTable = document.getElementById('todosTable').getElementsByTagName('tbody')[0];
            todosTable.innerHTML = '';
            data.forEach(todo => {
                const row = todosTable.insertRow();
                row.innerHTML = `
                    <td>${todo.id}</td>
                    <td>${todo.title}</td>
                    <td>${todo.completed ? 'Sí' : 'No'}</td>
                    <td>
                        <button onclick="editarTodo(${todo.id})">Editar</button>
                        <button onclick="eliminarTodo(${todo.id})">Eliminar</button>
                    </td>
                `;
            });
        })
        .catch(error => console.error('Error al obtener TODOs:', error));
}

function crearTodo() {
    const title = document.getElementById('newTodoTitle').value;
    const nuevoTodo = {
        title: title,
        completed: false,
        userId: 1
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoTodo)
    })
    .then(response => response.json())
    .then(todo => {
        console.log('TODO creado:', todo);
        obtenerTodos();
    })
    .catch(error => console.error('Error al crear el TODO:', error));
}

function editarTodo(id) {
    const nuevoTitulo = prompt('Nuevo título del TODO:', 'TODO actualizado');
    const todoActualizado = {
        title: nuevoTitulo,
        completed: true,
        userId: 1
    };

    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoActualizado)
    })
    .then(response => response.json())
    .then(todo => {
        console.log('TODO actualizado:', todo);
        obtenerTodos();
    })
    .catch(error => console.error(`Error al editar el TODO con id ${id}:`, error));
}

function eliminarTodo(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        console.log('TODO eliminado:', id);
        obtenerTodos();
    })
    .catch(error => console.error(`Error al eliminar el TODO con id ${id}:`, error));
}
