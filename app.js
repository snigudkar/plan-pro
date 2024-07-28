document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const tasksList = document.getElementById('tasks-list');

    // Function to add a task
    function addTask(task) {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <span>${task}</span>
            <button class="delete-task-button">Delete</button>
        `;
        tasksList.appendChild(taskItem);
        
        // Add event listener for the delete button
        taskItem.querySelector('.delete-task-button').addEventListener('click', function() {
            taskItem.remove();
        });
    }

    // Add task on button click
    addTaskButton.addEventListener('click', function() {
        const task = taskInput.value;
        if (task) {
            addTask(task);
            taskInput.value = '';
        }
    });

    // Add task on Enter key press
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const task = taskInput.value;
            if (task) {
                addTask(task);
                taskInput.value = '';
            }
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        const taskInput = document.getElementById('task-input');
        const addTaskButton = document.getElementById('add-task-button');
        const tasksList = document.getElementById('tasks-list');
    
        // Load tasks from local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
        // Function to render tasks
        function renderTasks() {
            tasksList.innerHTML = '';
            tasks.forEach(task => addTask(task));
        }
    
        // Function to add a task
        function addTask(task) {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <span>${task}</span>
                <button class="delete-task-button">Delete</button>
            `;
            tasksList.appendChild(taskItem);
    
            // Add event listener for the delete button
            taskItem.querySelector('.delete-task-button').addEventListener('click', function() {
                tasks.splice(tasks.indexOf(task), 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                taskItem.remove();
            });
        }
    
        // Add task on button click
        addTaskButton.addEventListener('click', function() {
            const task = taskInput.value;
            if (task) {
                tasks.push(task);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                addTask(task);
                taskInput.value = '';
            }
        });
    
        // Add task on Enter key press
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const task = taskInput.value;
                if (task) {
                    tasks.push(task);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    addTask(task);
                    taskInput.value = '';
                }
            }
        });
    
        // Initial render
        renderTasks();
    });
    
});
