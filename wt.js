// script.js

document.addEventListener('DOMContentLoaded', function() {
    const waterCount = document.getElementById('water-count');
    const addWaterButton = document.getElementById('add-water-button');
    const resetWaterButton = document.getElementById('reset-water-button');
    const logWaterButton = document.getElementById('log-water-button');
    const dateInput = document.getElementById('date-input');
    const waterLog = document.getElementById('water-log');
    const kudosMessage = document.getElementById('kudos-message');

    // Load saved water count and logs from localStorage
    const savedWaterCount = localStorage.getItem('waterCount');
    if (savedWaterCount) {
        waterCount.textContent = savedWaterCount;
        checkKudosMessage();
    }

    const savedWaterLogs = JSON.parse(localStorage.getItem('waterLogs')) || [];
    savedWaterLogs.forEach(log => addLogEntry(log.date, log.count));

    addWaterButton.addEventListener('click', function() {
        let count = parseInt(waterCount.textContent);
        count++;
        waterCount.textContent = count;
        localStorage.setItem('waterCount', count);
        checkKudosMessage();
    });

    resetWaterButton.addEventListener('click', function() {
        waterCount.textContent = '0';
        localStorage.setItem('waterCount', '0');
        checkKudosMessage();
    });

    logWaterButton.addEventListener('click', function() {
        const date = dateInput.value;
        if (!date) {
            alert('Please select a date.');
            return;
        }
        const count = parseInt(waterCount.textContent);
        addLogEntry(date, count);
        saveLogEntry(date, count);
        waterCount.textContent = '0';
        localStorage.setItem('waterCount', '0');
        checkKudosMessage();
    });

    function addLogEntry(date, count) {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `<span>${date} - ${count} glasses</span><button class="delete-log">Delete</button>`;
        waterLog.appendChild(logEntry);

        logEntry.querySelector('.delete-log').addEventListener('click', function() {
            waterLog.removeChild(logEntry);
            deleteLogEntry(date);
        });
    }

    function saveLogEntry(date, count) {
        const logs = JSON.parse(localStorage.getItem('waterLogs')) || [];
        logs.push({ date, count });
        localStorage.setItem('waterLogs', JSON.stringify(logs));
    }

    function deleteLogEntry(date) {
        let logs = JSON.parse(localStorage.getItem('waterLogs')) || [];
        logs = logs.filter(log => log.date !== date);
        localStorage.setItem('waterLogs', JSON.stringify(logs));
    }

    function checkKudosMessage() {
        const count = parseInt(waterCount.textContent);
        if (count > 8) {
            kudosMessage.textContent = 'Kudos! You have consumed more than 8 glasses today!';
        } else {
            kudosMessage.textContent = '';
        }
    }
});
