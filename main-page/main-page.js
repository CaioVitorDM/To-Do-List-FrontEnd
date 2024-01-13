let tasks = [];

function completeTask(checkbox) {
    const task = checkbox.closest('.task');
    const separator = task.nextElementSibling;

    if (checkbox.checked) {
        setTimeout(() => {
            task.remove();
            separator.remove();
            sessionStorage.removeItem(task.id)
        }, 150);
    }
}

function createTask() {
    window.location.href = '../create-task/create-task.html';
}

function getAllTasks() {
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);

        if (key !== 'lastUsedID' && key !== 'users') {
            const value = sessionStorage.getItem(key);

            tasks.push(JSON.parse(value));
        }
    }
}

function redirectEdit(id){
    window.location.href = '../create-task/create-task.html?id=' + id;
}

function loadTasksIntoTable() {
    const tasksContainer = document.querySelector('.tasks-container');

    if (tasks.length === 0) {
        return;
    }

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        if (!task || !task.id || !task.dueDate || !task.urgencyLevel) {
            console.error('Invalid task: ', task);
            continue;
        }

        tasksContainer.innerHTML += `
                <div class="task" id="${tasks[i].id}">
                    <div class="task-info">
                        <input type="checkbox" onchange="completeTask(this)">
                        <p>${tasks[i].title}</p>

                        <div class="button-container">
                            <button onclick="redirectEdit(${tasks[i].id})"> <i class="fa-regular fa-pen-to-square"> </i></button>
                        </div>
                    </div>

                    <div class="task-date">
                        <p id="due-date">Due Date: ${tasks[i].dueDate}</p>
                        <div class="urgencia">
                            <p>${tasks[i].urgencyLevel}</p>
                        </div>
                    </div>
                </div>
                <div class="separator"></div>
                `;
    }
}


window.onload = function () {

    getAllTasks();
    loadTasksIntoTable();
}