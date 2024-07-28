document.addEventListener('DOMContentLoaded', function() {
    const reminderForm = document.getElementById('reminder-form');
    const reminderList = document.getElementById('reminder-list');
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];

    // Request Notification permission
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    reminderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const text = document.getElementById('reminder-text').value;
        const time = document.getElementById('reminder-time').value;

        if (!text || !time) {
            alert('Please enter both a reminder and a time.');
            return;
        }

        const reminder = { text, time };
        reminders.push(reminder);
        localStorage.setItem('reminders', JSON.stringify(reminders));
        displayReminder(reminder);
        scheduleReminder(reminder);
    });

    reminders.forEach(reminder => {
        displayReminder(reminder);
        scheduleReminder(reminder);
    });

    function displayReminder(reminder) {
        const div = document.createElement('div');
        div.className = 'reminder';
        div.textContent = `${reminder.text} at ${new Date(reminder.time).toLocaleString()}`;
        reminderList.appendChild(div);
    }

    function scheduleReminder(reminder) {
        const time = new Date(reminder.time).getTime();
        const now = new Date().getTime();
        const delay = time - now;

        if (delay <= 0) {
            showNotification(reminder.text);
        } else {
            setTimeout(() => showNotification(reminder.text), delay);
        }
    }

    function showNotification(text) {
        if (Notification.permission === 'granted') {
            new Notification('Reminder', { body: text });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('Reminder', { body: text });
                }
            });
        }
    }
});
