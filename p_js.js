document.addEventListener('DOMContentLoaded', function() {
    // Notes
    const notesInput = document.getElementById('notes-input');
    const notesList = document.getElementById('notes-list');
    const addNoteButton = document.getElementById('add-note-button');

    // To-Do List
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const addTodoButton = document.getElementById('add-todo-button');

    // Water Tracker
    const waterCount = document.getElementById('water-count');
    const addWaterButton = document.getElementById('add-water-button');
    const resetWaterButton = document.getElementById('reset-water-button');

    // Mood Tracker
    const moodInput = document.getElementById('mood-input');
    const setMoodButton = document.getElementById('set-mood-button');
    const moodDisplay = document.getElementById('mood-display');

    // Load saved data from localStorage
    loadSavedData();

    // Notes functionality
    addNoteButton.addEventListener('click', function() {
        const note = notesInput.value.trim();
        if (note) {
            addNoteToList(note);
            notesInput.value = '';
            saveNotes();
        }
    });

    notesList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            event.target.remove();
            saveNotes();
        }
    });

    // To-Do List functionality
    addTodoButton.addEventListener('click', function() {
        const todo = todoInput.value.trim();
        if (todo) {
            addTodoToList(todo);
            todoInput.value = '';
            saveTodos();
        }
    });

    todoList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('completed');
            saveTodos();
        }
    });

    // Water Tracker functionality
    addWaterButton.addEventListener('click', function() {
        let count = parseInt(waterCount.textContent);
        count++;
        waterCount.textContent = count;
        saveWaterCount();
    });

    resetWaterButton.addEventListener('click', function() {
        waterCount.textContent = '0';
        saveWaterCount();
    });

    // Mood Tracker functionality
    setMoodButton.addEventListener('click', function() {
        const mood = moodInput.value.trim();
        if (mood) {
            moodDisplay.textContent = mood;
            moodInput.value = '';
            saveMood();
        }
    });

    function addNoteToList(note) {
        const li = document.createElement('li');
        li.textContent = note;
        notesList.appendChild(li);
    }

    function addTodoToList(todo) {
        const li = document.createElement('li');
        li.textContent = todo;
        todoList.appendChild(li);
    }

    function saveNotes() {
        const notes = [];
        notesList.querySelectorAll('li').forEach(li => notes.push(li.textContent));
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => todos.push({
            text: li.textContent,
            completed: li.classList.contains('completed')
        }));
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function saveWaterCount() {
        localStorage.setItem('waterCount', waterCount.textContent);
    }

    function saveMood() {
        localStorage.setItem('mood', moodDisplay.textContent);
    }

    function loadSavedData() {
        const savedNotes = JSON.parse(localStorage.getItem('notes'));
        if (savedNotes) {
            savedNotes.forEach(note => addNoteToList(note));
        }

        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        if (savedTodos) {
            savedTodos.forEach(todo => {
                const li = document.createElement('li');
                li.textContent = todo.text;
                if (todo.completed) {
                    li.classList.add('completed');
                }
                todoList.appendChild(li);
            });
        }

        const savedWaterCount = localStorage.getItem('waterCount');
        if (savedWaterCount) {
            waterCount.textContent = savedWaterCount;
        }

        const savedMood = localStorage.getItem('mood');
        if (savedMood) {
            moodDisplay.textContent = savedMood;
        }
    }
});
