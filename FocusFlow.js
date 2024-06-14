document.addEventListener('DOMContentLoaded', function() {
    const mainTitle = document.getElementById('title');
    const loadingScreen = document.getElementById('loading-screen');
    const loadingScreenGlow = document.getElementById('middle-glow');

    loadingScreenGlow.style.opacity = '0';
    loadingScreenGlow.style.transition = 'opacity 0.4s ease-in';
    
    // Hide the title and loading screen initially
    mainTitle.style.opacity = '0';
    mainTitle.style.transform = 'translateY(40vw)';
    mainTitle.style.transition = 'opacity 1s ease, transform 2s cubic-bezier(0.25, 0.1, 0.25, 1)';
    
    loadingScreen.style.opacity = '1';
    loadingScreen.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    
    // Fade in the title after the loading animation completes
    setTimeout(() => {
        mainTitle.style.opacity = '1';
        mainTitle.style.transform = 'translateY(20vw) scale(2)';
        setTimeout(() => {
            loadingScreenGlow.style.opacity = '0.4';
        }, 400)
    });
    
    setTimeout(() => {
        mainTitle.style.transition = 'transform 2s cubic-bezier(1, 0.5, 1.4, 0.25)';
        mainTitle.style.transform = 'translateY(0) scale(1)';
        setTimeout(() => {
            loadingScreenGlow.style.opacity = '0';
        },)
    }, 1500);

    // Start the loading animation
    setTimeout(() => {
        loadingScreen.style.transition = 'opacity 0.5s ease-out, transform 1s ease-out';
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transform = 'translateX(0)';
        setTimeout(() => {
            loadingScreen.style.visibility = 'hidden'; // Hide the element after the transition completes
            loadingScreenGlow.style.visibility = 'hidden'; // Hide the element after the transition completes
        }, 500)
    }, 2500);



    const focusList = document.querySelector('.focus-list');
    const focusNameInput = document.getElementById('focus-name');
    const alertScreen = document.getElementById('alert-screen');
    const alertPopup = document.getElementById('alert-popup');
    const cancelDeleteButton = document.querySelector('.cancel-delete-button');
    const confirmDeleteButton = document.querySelector('.confirm-delete-button');

    let itemToDelete = null;

    const resetFocusNameInput = () => {
        focusNameInput.style.border = '0px solid rgb(0, 0, 0)';
    };

    focusNameInput.addEventListener('click', resetFocusNameInput);

    function createFocusItem(title, date, time, location, extraInfo) {
        if (title === '') {
            focusNameInput.style.border = '3px solid rgb(255, 0, 0)';
            return;
        }

        if (date === '') {date = 'Today'};

        // Create the focus container
        const focus = document.createElement('div');
        focus.classList.add('focus');
        focus.setAttribute('id', title);

        // Create and append the focus title
        const focusTitle = document.createElement('div');
        focusTitle.classList.add('focus-title');
        focusTitle.textContent = title;
        focus.appendChild(focusTitle);

        // Create and append the focus items bar
        const focusItemsBar = document.createElement('div');
        focusItemsBar.classList.add('focus-items-bar');

        // Create and append the date-time-location bar
        const dateTimeLocationBar = document.createElement('div');
        dateTimeLocationBar.classList.add('date-time-location-bar');

        // Create and append the date-time bar
        const dateTimeBar = document.createElement('div');
        dateTimeBar.classList.add('date-time-bar');
        const dateDiv = document.createElement('div');
        dateDiv.classList.add('date');
        dateDiv.textContent = date
        const timeDiv = document.createElement('div');
        timeDiv.classList.add('time');
        timeDiv.textContent = time;
        dateTimeBar.appendChild(dateDiv);
        dateTimeBar.appendChild(timeDiv);
        dateTimeLocationBar.appendChild(dateTimeBar);

        // Create and append the location
        const locationDiv = document.createElement('div');
        locationDiv.classList.add('location');
        locationDiv.textContent = location;
        dateTimeLocationBar.appendChild(locationDiv);

        // Append the date-time-location bar to the focus items bar
        focusItemsBar.appendChild(dateTimeLocationBar);

        // Create and append the buttons bar
        const buttonsBar = document.createElement('div');
        buttonsBar.classList.add('buttons-bar');

        const doneButton = document.createElement('div');
        doneButton.classList.add('done-button');
        doneButton.textContent = 'done';

        doneButton.addEventListener('click', () => {
            const focusCompleted = document.getElementById(title);
            focusCompleted.style.transition = 'opacity 1s, background 1s, transform 1s ease'; // Set the transition property for both opacity and transform
            focusCompleted.style.opacity = '0'; // Fade out the div
            focusCompleted.style.transform = 'scale(1.1)'; // Scale up the div
            focusCompleted.style.background = 'rgb(29, 196, 57, 0.4)';

            // Remove the div after the transition completes
            setTimeout(() => {
                focusCompleted.remove();
                saveData();
            }, 1000); // Wait for 1 second (the same duration as the transition)
        });

        const binButton = document.createElement('div');
        binButton.classList.add('bin-button');
        binButton.textContent = 'bin';
        binButton.addEventListener('click', () => {
            const focusTitle = focus.querySelector('.focus-title').textContent;
            document.getElementById('alert-name').textContent = focusTitle;
            alertScreen.style.visibility = 'visible';
            itemToDelete = focus;
        });

        buttonsBar.appendChild(doneButton);
        buttonsBar.appendChild(binButton);
        focusItemsBar.appendChild(buttonsBar);

        // Append the focus items bar to the focus container
        focus.appendChild(focusItemsBar);

        // Create and append the extra info
        const extraInfoDiv = document.createElement('div');
        extraInfoDiv.classList.add('extra-info');
        extraInfoDiv.textContent = extraInfo;
        focus.appendChild(extraInfoDiv);

        // Append the focus container to the focus container element
        focusList.prepend(focus);

        // Save data
        saveData();
    }

    function addFocus() {
        const title = document.getElementById('focus-name').value;
        const date = document.getElementById('focus-date').value;
        const time = document.getElementById('focus-time').value;
        const location = document.getElementById('focus-location').value;
        const extraInfo = document.getElementById('focus-info').value;

        createFocusItem(title, date, time, location, extraInfo);

        // Clear input fields
        document.getElementById('focus-name').value = '';
        document.getElementById('focus-date').value = '';
        document.getElementById('focus-time').value = '';
        document.getElementById('focus-location').value = '';
        document.getElementById('focus-info').value = '';

        saveData();
    }

    const addNewFocusButton = document.querySelector('.add-new-focus-button');

    addNewFocusButton.addEventListener('click', addFocus);

    const saveData = () => {
        localStorage.setItem("data", focusList.innerHTML);
    }

    const showFocuses = () => {
        focusList.innerHTML = localStorage.getItem('data');
        attachDoneButtonListeners();
        attachBinButtonListeners();
    }

    const attachDoneButtonListeners = () => {
        const doneButtons = document.querySelectorAll('.done-button');
        doneButtons.forEach(button => {
            button.addEventListener('click', () => {
                const focusCompleted = button.parentNode.parentNode.parentNode;
                focusCompleted.style.transition = 'opacity 1s, background 1s, transform 1s ease'; // Set the transition property for both opacity and transform
                focusCompleted.style.opacity = '0'; // Fade out the div
                focusCompleted.style.transform = 'scale(1.1)'; // Scale up the div
                focusCompleted.style.background = 'rgb(29, 196, 57, 0.4)';

                // Remove the div after the transition completes
                setTimeout(() => {
                    focusCompleted.remove();
                    saveData();
                }, 1000); // Wait for 1 second (the same duration as the transition)
            });
        });
    }

    const attachBinButtonListeners = () => {
        const binButtons = document.querySelectorAll('.bin-button');
        binButtons.forEach(button => {
            button.addEventListener('click', () => {
                const focus = button.parentNode.parentNode.parentNode;
                const focusTitle = focus.querySelector('.focus-title').textContent;
                document.getElementById('alert-name').textContent = focusTitle;

                alertPopup.style.transition = 'transform 0.5s ease'
                alertPopup.style.transform = 'scale(1.1)'

                alertScreen.style.opacity = '0';
                alertScreen.style.visibility = 'visible';
                alertScreen.style.transition = 'opacity 0.5s';
                alertScreen.style.opacity = '1';

                itemToDelete = focus;
            });
        });
    }

    cancelDeleteButton.addEventListener('click', () => {
        alertScreen.style.visibility = 'hidden';
        itemToDelete = null;

        alertPopup.style.transition = 'transform 0.5s ease';
        alertPopup.style.transform = 'scale(1)';
        
        alertScreen.style.transition = 'opacity 0.5s ease-out';
        alertScreen.style.opacity = '0';
    });

    confirmDeleteButton.addEventListener('click', () => {
        if (itemToDelete) {
            itemToDelete.style.transition = 'opacity 1s, background 1s, transform 1s ease-in';
            itemToDelete.style.background = 'rgb(213, 60, 26, 0.8)';
            itemToDelete.style.opacity = '0';
            itemToDelete.style.transform = 'scale(0.9)';
    
            alertPopup.style.transition = 'transform 0.5s ease';
            alertPopup.style.transform = 'scale(0.9)';
    
            alertScreen.style.transition = 'opacity 0.5s ease-out';
            alertScreen.style.opacity = '0';
    
            // Remove the element after the transition completes
            setTimeout(() => {
                itemToDelete.remove();
                saveData();
    
                // Reset the alertScreen properties
                alertScreen.style.opacity = '1';
                alertScreen.style.visibility = 'hidden';
                alertPopup.style.transform = 'scale(1)';
            }, 1000); // Wait for 1 second (the same duration as the transition)
        }
    });

    showFocuses();
});
