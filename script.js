const localStorageKey = 'to-do-list-jack'

function newTask() {
    let input = document.getElementById('input-new-task')

    // validation
    if(!input.value) {
        alert('Type something for add in your list!')   
    }
    // else if () {}
    else {
        // increment to localStorage
        let values = JSON.parse(localStorage.getItem('localStorageKey') || "[]")
    }
}