document.addEventListener("DOMContentLoaded", function(){
    const taskInput = document.getElementById("taskInput");
    const submitTask = document.getElementById("submitTask");
    const tasksContainer = document.getElementById("tasksContainer");
    const clearTask = document.getElementById("clearTask");
    const noTasks = document.getElementById("noTasks");

    loadTasks();

    function loadTasks(){
        const tasks = JSON.parse(localStorage.getItem("tasks"))||[];
        tasks.forEach(task =>{
            displayTasks(task);
        });
        }

    submitTask.addEventListener('click', function(){
        const taskTextValue = taskInput.value.trim();

        if(taskTextValue){
            addTask(taskTextValue);
            taskInput.value = '';
        }
    });

    function addTask(task){
        const tasks = JSON.parse(localStorage.getItem("tasks"))||[];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks(task);
        noTasksMessage(tasks);
        clearButton(tasks);
    }

    function displayTasks(task){
        const taskDiv = document.createElement("div");
        taskDiv.className = "listOfTasks"
        taskDiv.textContent = task;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function () {
        task.completed = this.checked;
        taskInStorage(task);
    });

    const taskText = document.createElement("span");
    // // taskText.textContent = task;

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskText);
    tasksContainer.appendChild(taskDiv);
}

    function taskInStorage(updatedTask) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const taskIndex = tasks.findIndex(task => task.text === updatedTask.text);
        if (taskIndex !== -1) {
          tasks[taskIndex] = updatedTask;
          localStorage.setItem('tasks', JSON.stringify(tasks));
        }
      }

    function noTasksMessage(tasks){
        if(tasks.length === 0){
            noTasks.style.display = "block";
            noTasks.innerHTML = "Нет задач";
        } else{
            noTasks.style.display = "none";
        }
    }

    function clearButton(tasks){
        clearTask.disabled = tasks.lenght === 0;
    }


    clearTask.addEventListener('click', function(){
        localStorage.removeItem("tasks");
        tasksContainer.innerHTML = '';
        noTasksMessage([]);
        clearButton([]);
    });
});