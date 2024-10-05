const localStorageKey = 'to-do-list-jack'

function validateNewTask(day) {
    let values      = JSON.parse(localStorage.getItem(`to-do-list-${day}`) || "[]")
    let inputValue  = document.getElementById(`input-new-task-${day}`).value
    let exists      = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

function newTask(day) {
    const taskInput = document.getElementById(`input-new-task-${day}`);
    const taskList = document.getElementById(`to-do-list-${day}`);
    
    if (taskInput.value.trim() !== "") {
        // Recupera a lista de tarefas do localStorage
        let tasks = JSON.parse(localStorage.getItem(`to-do-list-${day}`) || "[]");

        //vamos verificar se existe a tarefa para aquele dia
        let taskExists = tasks.find(task => task.name.toLowerCase() === taskInput.value.toLowerCase());

        if (!taskExists){
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
        }else {
            alert('Essa tarefa já existe!')
        }
    } else {
        alert("Por favor, insira uma tarefa.");
        
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
                <button id="btn-ok" onclick="removeTask(${i}, '${day}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16">
                        <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/>
                    </svg>
                </button>
            </li>
        `;
    }
    console.log(list.innerHTML);
}

function removeTask(index, day) {
    let values = JSON.parse(localStorage.getItem(`to-do-list-${day}`) || "[]")
    values.splice(index, 1)
    localStorage.setItem(`to-do-list-${day}`,JSON.stringify(values))
    showValues(day)
}

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

daysOfWeek.forEach(day => {
    showValues(day)
});

showValues(day);