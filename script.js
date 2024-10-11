document.addEventListener('DOMContentLoaded', loadEventsFromStorage);

document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventLocation = document.getElementById('eventLocation').value;

    // Simple validation
    if (!eventName || !eventDate || !eventTime || !eventLocation) {
        alert('Please fill out all fields!');
        return;
    }

    // Create and display event
    createEvent(eventName, eventDate, eventTime, eventLocation);

    // Save event to localStorage
    saveEventToStorage(eventName, eventDate, eventTime, eventLocation);

    // Clear the form
    document.getElementById('eventForm').reset();
});

// Create event function
function createEvent(name, date, time, location) {
    const eventList = document.getElementById('eventList');
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item show';

    listItem.innerHTML = `
        <div>
            <h5>${name}</h5>
            <p>${date} at ${time}</p>
            <p>${location}</p>
        </div>
        <button class="btn btn-danger btn-sm delete">Delete</button>
    `;

    eventList.appendChild(listItem);

    // Add delete functionality with animation
    listItem.querySelector('.delete').addEventListener('click', function() {
        listItem.classList.add('remove');
        setTimeout(() => {
            removeEventFromStorage(name, date, time, location);
            eventList.removeChild(listItem);
        }, 500);  // Wait for the fadeOut animation to complete
    });
}

// Save event to localStorage
function saveEventToStorage(name, date, time, location) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push({ name, date, time, location });
    localStorage.setItem('events', JSON.stringify(events));
}

// Load events from localStorage on page load
function loadEventsFromStorage() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.forEach(event => {
        createEvent(event.name, event.date, event.time, event.location);
    });
}

// Remove event from localStorage
function removeEventFromStorage(name, date, time, location) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events = events.filter(event => event.name !== name || event.date !== date || event.time !== time || event.location !== location);
    localStorage.setItem('events', JSON.stringify(events));
}
