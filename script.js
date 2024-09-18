const localStorageKey = 'to-do-list-jack'

function validateNewTask() {
    let values      = JSON.parse(localStorage.getItem('localStorageKey') || "[]")
    let inputValue  = document.getElementById('input-new-task').value
    let exists      = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

function newTask() {
    let input = document.getElementById('input-new-task')
    input.style.border = ''

    // validation
    if(!input.value) 
    {
        input.style.border = '2px dashed red'
        input.focus()
        alert('Type something for add in your list!')   
        return;
    }
    else if (validateNewTask())
    {
        alert('Já existe uma task com essa descrição!')
    }
    else {
        // increment to localStorage
        let values = JSON.parse(localStorage.getItem('localStorageKey') || "[]")
        values.push({
            name: input.value
        })
         localStorage.setItem('localStorageKey',JSON.stringify(values))
         showValues()
    }
    input.value = ''
}

function showValues(){
    let values = JSON.parse(localStorage.getItem('localStorageKey') || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''
    for(let i = 0; i < values.length; i++){
        list.innerHTML += `<li>${values[i]['name']}<buttonv id='btn-ok' onclick='removeItem("${values[i]['name']}")'> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16">
  <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/>
</svg> </button></li>`
    }
}

function removeItem(data){
    let values = JSON.parse(localStorage.getItem('localStorageKey') || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem('localStorageKey',JSON.stringify(values))
    showValues()
}

showValues()