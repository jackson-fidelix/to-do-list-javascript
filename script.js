const localStorageKey = 'to-do-list-jack';

function validateNewTask(day) {
    let values = JSON.parse(localStorage.getItem(`to-do-list-${day}`) || "[]");
    let inputValue = document.getElementById(`input-new-task-${day}`).value;
    let exists = values.find(x => x.name == inputValue);
    return !exists ? false : true;
}

function newTask(day) {
    const taskInput = document.getElementById(`input-new-task-${day}`);
    const taskList = document.getElementById(`to-do-list-${day}`);

    if (taskInput.value.trim() !== "") {
        // Recupera a lista de tarefas do localStorage
        let tasks = JSON.parse(localStorage.getItem(`to-do-list-${day}`) || "[]");

        // Verifica se existe a tarefa para aquele dia
        let taskExists = tasks.find(task => task.name.toLowerCase() === taskInput.value.toLowerCase());

        if (!taskExists) {
            // Adiciona a nova tarefa ao array
            let newTask = { name: taskInput.value };
            tasks.push(newTask);

            // Atualiza o localStorage com a nova tarefa
            localStorage.setItem(`to-do-list-${day}`, JSON.stringify(tasks));

            // Exibe a nova tarefa na lista visual
            const newTaskItem = document.createElement("li");
            newTaskItem.textContent = taskInput.value;
            taskList.appendChild(newTaskItem);

            // Limpa o campo de input
            taskInput.value = "";
        } else {
            alert('Essa tarefa já existe!');
        }
    } else {
        alert("Por favor, insira uma tarefa!");
    }
}

function showValues(day) {
    let values = JSON.parse(localStorage.getItem(`to-do-list-${day}`) || "[]");
    let list = document.getElementById(`to-do-list-${day}`);
    list.innerHTML = ''; // Limpa a lista antes de adicionar os itens

    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `
            <li>
                ${values[i]['name']}
                <button id="btn-ok" onclick="moveTask(${i}, '${day}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16">
                        <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/>
                    </svg>
                </button>
            </li>
        `;
    }
}

function moveTask(index, day) {
    let tasks = JSON.parse(localStorage.getItem(`to-do-list-${day}`) || "[]");
    let completedTasks = JSON.parse(localStorage.getItem('completed-tasks') || "[]");

    let task = tasks.splice(index, 1)[0];
    completedTasks.push(task);

    localStorage.setItem(`to-do-list-${day}`, JSON.stringify(tasks));
    localStorage.setItem('completed-tasks', JSON.stringify(completedTasks));

    console.log(localStorage.getItem('completed-tasks'));


    showValues(day);
    showCompletedTasks(); // Atualiza a exibição das tarefas completadas
}

function showCompletedTasks() {
    let completedTasks = JSON.parse(localStorage.getItem('completed-tasks') || "[]");
    let completedList = document.getElementById('completed-tasks'); 
    completedList.innerHTML = ''; // Limpa a lista antes de adicionar os itens

    for (let i = 0; i < completedTasks.length; i++) {
        completedList.innerHTML += `
            <li>
                ${completedTasks[i]['name']}
                <button id="btn-remove" onclick="removeCompletedTask(${i})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/> <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </button>
            </li>
        `;
    }
}

function removeCompletedTask(index) {
    let completedTasks = JSON.parse(localStorage.getItem('completed-tasks') || "[]");
    completedTasks.splice(index, 1);
    localStorage.setItem('completed-tasks', JSON.stringify(completedTasks));
    showCompletedTasks(); // Atualiza a exibição das tarefas completadas
}

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'weekend'];

daysOfWeek.forEach(day => {
    showValues(day);
});

// Mostra as tarefas completadas ao carregar a página
showCompletedTasks();
