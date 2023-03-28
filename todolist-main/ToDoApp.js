const AddTaskButton = document.getElementById('AddTaskButton')
const inputField = document.getElementById('inputField')
const taskcontainer = document.getElementById('taskcontainer')




AddTaskButton.onclick = function () {
    if (inputField.value != ""){
        var contenu = document.createElement('div')
        var task = document.createElement('p')
        var btn_supp = document.createElement('button')
        contenu.append(task, btn_supp)
        
    }

    task.innerText = inputField.value
    task.classList.add('task_style')
    btn_supp.classList.add('btn-supp-style')
    contenu.classList.add('contenu')
    taskcontainer.appendChild(contenu)
    inputField.value = ""

    task.onclick = function () {
        task.classList.add('task_supp')
    }

    btn_supp.onclick = function () {
        contenu.remove()
    }

    
}

