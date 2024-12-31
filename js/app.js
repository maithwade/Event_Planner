document.addEventListener('DOMContentLoaded', function() {
    const eventList = document.getElementById('event-list');

    const createEventBtn = document.getElementById('create-event-btn');
    const eventModal = document.getElementById('event-modal');
    const closeModal = document.getElementById('close-modal');
    const eventForm = document.getElementById('event-form');

    //Open the modal when "Create New Event" is clicked
    createEventBtn.addEventListener('click', () => {
        eventModal.classList.remove('hidden');
    });

    // Close the modal when the "x" is clicked
    closeModal.addEventListener('click', function() {
        eventModal.classList.add('hidden');
    });

    // Close the modal when clicking outside of the modal content
    window.addEventListener('click', function(e) {
        if (e.target === eventModal) {
            eventModal.classList.add('hidden');
        }
    });

    // Save event and add to list on form submission
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission behavior

        // Get the form data
        const eventName = document.getElementById('event-name').value;
        const eventDate = document.getElementById('event-date').value;
        const eventTime = document.getElementById('event-time').value;
        const eventLocation = document.getElementById('event-location').value;
        const eventDescription = document.getElementById('event-description').value;

        // Create a new event card
        const newEvent = {
            name: eventName,
            date: eventDate,
            time: eventTime,
            location: eventLocation,
            description: eventDescription,
            state: 'upcoming'
        };

        // Append the event card to the event list
        addEvents(eventList.children.length, newEvent, eventList);

        // Close the modal after saving the event
        eventModal.classList.add('hidden');

        // Clear the form fields
        eventForm.reset();
    });

    //The event cards in the event list on the main 
    const addEvents = (index, event, parent) => {
        const eventCard = document.createElement('div');
        const eventInfo = document.createElement('div');
        const eventName = document.createElement('h3');
        const eventDescription = document.createElement('p');
        const eventDate = document.createElement('p');
        const eventLocation = document.createElement('p');
        const state = document.createElement('p');
        const editBtn = document.createElement('button');
        const expandButton = document.createElement('button');

        //Creating elements for creation date and time
        const creationDateElement = document.createElement('p');
        const creationTimeElement = document.createElement('p');

        //Generating creation date and time
        const creationDate = new Date().toLocaleDateString();
        const creationTime = new Date().toLocaleTimeString();

        //Helper function to create bold label with normal text 
        const createBoldLabel = (labelText, valueText) => {
            const container = document.createElement('span');
            const label = document.createElement('strong');
            const value = document.createElement('span');

            label.textContent = `${labelText}: `;
            value.textContent = valueText;

            container.appendChild(label);
            container.appendChild(value);

            return container;
        };

        //Function to truncate text to 10 words 
        const truncateText = (text, wordLimit) => {
            const words = text.split(' ');
            if (words.length > wordLimit){
                return words.slice(0, wordLimit).join(' ') + '...';
            }
            return text;
        };

        //Creating checkbox  elements for event's state
        const upcomingCheckbox = document.createElement('input');
        upcomingCheckbox.type = 'checkbox';
        upcomingCheckbox.id = `upcoming-${index}`;
        upcomingCheckbox.checked = event.state === 'upcoming';
        const upcomingLabel = document.createElement('label');
        upcomingLabel.textContent = 'Upcoming';
        upcomingLabel.setAttribute('for', `upcoming-${index}`);

        const completedCheckbox = document.createElement('input');
        completedCheckbox.type = 'checkbox';
        completedCheckbox.id = `completed-${index}`;
        completedCheckbox.checked = event.state === 'completed';
        const completedLabel = document.createElement('label');
        completedLabel.textContent = 'Completed';
        completedLabel.setAttribute('for', `completed-${index}`);

        //Adding the event listeners to the checkboxes
        upcomingCheckbox.addEventListener('change', () => {
            if (upcomingCheckbox.checked) {
                completedCheckbox.checked = false;
                eventCard.classList.remove('completed-event');
                eventCard.classList.add('upcoming-event');
                state.textContent = 'State: upcoming';
            } else {
                completedCheckbox.checked = true;
                eventCard.classList.remove('upcoming-event');
                eventCard.classList.add('completed-event');
                state.textContent = 'State: none';
            }
        });

        completedCheckbox.addEventListener('change', () => {
            if (completedCheckbox.checked) {
                upcomingCheckbox.checked = false;
                eventCard.classList.remove('upcoming-event');
                eventCard.classList.add('completed-event');
                state.textContent = 'State: completed';
            } else {
                upcomingCheckbox.checked = true;
                eventCard.classList.remove('completed-event');
                eventCard.classList.add('upcoming-event');
                state.textContent = 'State: none';
            }
        });

        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('checkbox-container');

        checkboxContainer.appendChild(upcomingCheckbox);
        checkboxContainer.appendChild(upcomingLabel);
        checkboxContainer.appendChild(completedCheckbox);
        checkboxContainer.appendChild(completedLabel);

        //Creating input fields for editing
        const nameInput = document.createElement('input');
        const dateInput = document.createElement('input');
        const locationInput = document.createElement('input');
        const descriptionInput = document.createElement('textarea');
        const saveBtn = document.createElement('button');

        //Initializing input fields with the current event data 
        nameInput.value = event.name;
        dateInput.value = event.date;
        locationInput.value = event.location;
        descriptionInput.value = event.description;

        saveBtn.textContent = 'Save';
        //Appending elements to the parent 
        eventCard.appendChild(eventInfo);
        eventInfo.appendChild(eventName);
        eventInfo.appendChild(eventDescription);
        eventInfo.appendChild(eventDate);
        eventInfo.appendChild(eventLocation);
        // eventInfo.appendChild(state);
        eventInfo.appendChild(creationDateElement);
        eventInfo.appendChild(creationTimeElement);
        eventInfo.appendChild(checkboxContainer);
        eventInfo.appendChild(editBtn);
        eventInfo.appendChild(expandButton);
        parent.appendChild(eventCard);

        //Adding content to the elements
        eventName.textContent = event.name;

        //Storing full description
        const fullDescription = event.description;
        const truncatedDescription = truncateText(fullDescription, 10);

        //Initially showing the truncated description
        const descriptionText = document.createElement('span');
        descriptionText.textContent = truncatedDescription;

        eventDescription.appendChild(createBoldLabel('Description', ''));
        eventDescription.appendChild(descriptionText);

        //Hiding the details initially
        eventDescription.style.display = 'none';
        eventDate.style.display = 'none';
        eventLocation.style.display = 'none';
        state.style.display = 'none';
        creationDateElement.style.display = 'none';
        creationTimeElement.style.display = 'none';
        upcomingCheckbox.style.display = 'none';
        upcomingLabel.style.display = 'none';
        completedCheckbox.style.display = 'none';
        completedLabel.style.display = 'none';
        editBtn.style.display = 'none';

        eventDate.appendChild(createBoldLabel('Date', event.date));
        eventLocation.appendChild(createBoldLabel('Location', event.location));
        state.appendChild(createBoldLabel('State', event.state));
        editBtn.textContent = 'Edit';
        expandButton.innerHTML = '&#43;';

        //Adding content to creation date and time
        creationDateElement.appendChild(createBoldLabel('Creation Date: ', creationDate));
        creationTimeElement.appendChild(createBoldLabel('Creation Time: ', creationTime));

        //Adding id 
        eventName.id = `event-name-${index}`;
        //Adding classes
        eventCard.classList.add('event-card');
        eventInfo.classList.add('event-info');
        eventName.classList.add('event-name');
        eventDescription.classList.add('event-description');
        eventDate.classList.add('event-date');
        eventLocation.classList.add('event-location');
        state.classList.add('state');
        creationDateElement.classList.add('creation-date');
        creationTimeElement.classList.add('creation-time');
        editBtn.classList.add('edit-btn');
        expandButton.classList.add('expand-btn');
        saveBtn.classList.add('save-btn');
        eventCard.setAttribute('data-index', index)

        //Expand/Collapse logic 
        let isExpanded = false;

        expandButton.addEventListener('click', () => {
            if (isExpanded){
                eventDescription.style.display = 'block';
                eventDate.style.display = 'none';
                eventLocation.style.display = 'none';
                state.style.display = 'none';
                creationDateElement.style.display = 'none';
                creationTimeElement.style.display = 'none';
                upcomingCheckbox.style.display = 'none';
                editBtn.style.display = 'none';
                upcomingLabel.style.display = 'none';
                completedCheckbox.style.display = 'none';
                completedLabel.style.display = 'none';
                expandButton.innerHTML = '&#43;';
                descriptionText.textContent = truncatedDescription;
            } else {
                eventDescription.style.display = "block";
                eventDate.style.display = 'block';
                eventLocation.style.display = 'block';
                state.style.display = 'block';
                creationDateElement.style.display = 'block';
                creationTimeElement.style.display = 'block';
                upcomingCheckbox.style.display = 'block';
                editBtn.style.display = 'block';
                upcomingLabel.style.display = 'block';
                completedCheckbox.style.display = 'block';
                completedLabel.style.display = 'block';
                expandButton.innerHTML = '&#8722;';
                descriptionText.textContent = fullDescription;
            }
            isExpanded = !isExpanded;
        });

        //Edit button Functionality
        

        //Save button logic
        saveBtn.addEventListener('click', () =>{
            event.name = nameInput.value;
            event.date = dateInput.value;
            event.location = locationInput.value;
            event.description = descriptionInput.value;

            eventName.textContent = '';
            eventName.appendChild(createBoldLabel( event.name));
            eventDate.textContent = '';
            eventDate.appendChild(createBoldLabel('Date', event.date));
            eventLocation.textContent = '';
            eventLocation.appendChild(createBoldLabel('Location', event.location));
            // Update the full and truncated descriptions
            const fullDescription = event.description;
            const truncatedDescription = truncateText(fullDescription, 10);
            //updating the description text to show truncated version

            descriptionText.textContent = fullDescription;

            //Hiding the input fields
            nameInput.style.display = 'none';
            dateInput.style.display = 'none';
            locationInput.style.display = 'none';
            descriptionInput.style.display = 'none';
            saveBtn.style.display = 'none';

            // Optionally, re-display the event details
            eventName.style.display = 'block';
            eventDate.style.display = 'block';
            eventLocation.style.display = 'block';
            eventDescription.style.display = 'block';
        });

        //Edit button logic
        editBtn.addEventListener('click', () => {

            //appending the input fields 
            if (!eventCard.contains(nameInput)) {
                eventCard.appendChild(nameInput);
                eventCard.appendChild(dateInput);
                eventCard.appendChild(locationInput);
                eventCard.appendChild(descriptionInput);
                eventCard.appendChild(saveBtn);
            }

            nameInput.value = event.name;
            dateInput.value = event.date;
            locationInput.value = event.location;
            descriptionInput.value = event.description;

            nameInput.style.display = 'block';
            dateInput.style.display = 'block';
            locationInput.style.display = 'block';
            descriptionInput.style.display = 'block';
            saveBtn.style.display = 'block';
        });

        eventDescription.style.display = 'block';
        eventDate.style.display = 'none';
        eventLocation.style.display = 'none';
        creationDateElement.style.display = 'none';
        creationTimeElement.style.display = 'none';
        upcomingCheckbox.style.display = 'none';
        upcomingLabel.style.display = 'none';
        completedCheckbox.style.display = 'none';
        completedLabel.style.display = 'none';
        editBtn.style.display = 'none';
        descriptionText.textContent = truncatedDescription;

        //Visual distinction based on the state of the events
        if (event.state === 'completed') {
            eventCard.classList.add('completed-event');
        } else {
            eventCard.classList.add('upcoming-event');
        }
    };

    const loadEvents = (url) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onload= (e) => {
            if  (e.currentTarget.status === 200) {
                const events = JSON.parse(e.currentTarget.responseText);
                events.forEach((item, i) => addEvents(i, item, eventList));
            }
        };
        xhr.send();
    };

    loadEvents('data/events-list.json');
});