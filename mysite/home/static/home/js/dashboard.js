// Get DOM elements
var toggleButton = document.getElementById('toggleButton');
var dashboardElements = document.getElementById('dashboardElements');
var draggable = document.querySelector('.draggable');
var elements = document.querySelectorAll('.element');
var placeholder = document.getElementById('placeholder');

// Initialize variables
var elementCounts = {};
var navbarAdded = false;
var footerAdded = false;





// Function to initialize the dashboard with items
function initializeDashboard(items) {
    items.forEach(function(item) {
        var elementName = item[0];
        var id = item[1];
        // Extract the number from the id
        var number = parseInt(id.replace(/\D/g, '')) || 0;

        // Update element counts
        if (!elementCounts[elementName]) {
            elementCounts[elementName] = number;
        } else {
            elementCounts[elementName] = Math.max(elementCounts[elementName], number);
        }

        // Create new elements
        var newElem = document.createElement('div');
        newElem.className = 'elem';
        var newDragger = document.createElement('div');
        newDragger.className = 'dragger';
        var newP = document.createElement('p');
        var idSpan = document.createElement('span');
        idSpan.className = 'id-name';
        var removeButton = document.createElement('div');
        removeButton.className = 'remove-button material-icons';
        removeButton.innerHTML = 'delete'; // Use the "delete" Material Icon

        // Set text content
        newP.textContent = elementName;
        idSpan.textContent = id;

        // Append elements
        newDragger.appendChild(newP);
        newDragger.appendChild(idSpan);
        newDragger.appendChild(removeButton);
        newElem.appendChild(newDragger);

        // Add new element to the DOM
        if (elementName === 'Navbar') {
            draggable.insertBefore(newElem, draggable.firstChild);
            navbarAdded = true;
            Array.from(document.querySelectorAll('.element')).find(el => el.textContent === 'Navbar').style.color = 'grey';
        } else if (elementName === 'Footer') {
            draggable.appendChild(newElem);
            footerAdded = true;
            Array.from(document.querySelectorAll('.element')).find(el => el.textContent === 'Footer').style.color = 'grey';
        } else {
            draggable.insertBefore(newElem, draggable.lastChild);
        }

        removeButton.addEventListener('click', function() {
            newElem.remove(); // Remove the dragger when the button is clicked

            // Show the placeholder if there are no draggable elements
            if (draggable.children.length === 0) {
                placeholder.style.display = 'block';
            }

            // Reset Navbar and Footer
            if (elementName === 'Navbar') {
                navbarAdded = false;
                Array.from(document.querySelectorAll('.element')).find(el => el.textContent === 'Navbar').style.color = 'var(--text)';
            } else if (elementName === 'Footer') {
                footerAdded = false;
                Array.from(document.querySelectorAll('.element')).find(el => el.textContent === 'Footer').style.color = 'var(--text)';
            }
            atOrderChange();
        });
    });
}

// Call the function to initialize the dashboard
initializeDashboard(items);

// Event listener for toggle button
toggleButton.addEventListener('click', function(event) {
    event.stopPropagation();
    dashboardElements.style.display = dashboardElements.style.display === 'none' ? 'block' : 'none';
});

// Event listener for document
document.addEventListener('click', function() {
    dashboardElements.style.display = 'none';
});

// Event listeners for each element
elements.forEach(function(element) {
    element.addEventListener('click', function() {
        var elementName = this.textContent;
        if ((elementName === 'Navbar' && navbarAdded) || (elementName === 'Footer' && footerAdded)) {
            return; // Don't add another Navbar or Footer
        }

        // Create new elements
        var newElem = document.createElement('div');
        newElem.className = 'elem';
        var newDragger = document.createElement('div');
        newDragger.className = 'dragger';
        var newP = document.createElement('p');
        var idSpan = document.createElement('span');
        idSpan.className = 'id-name';
        var removeButton = document.createElement('div');
        removeButton.className = 'remove-button material-icons';
        removeButton.innerHTML = 'delete'; // Use the "delete" Material Icon

        // Update element counts
        if (!elementCounts[elementName]) {
            elementCounts[elementName] = 1;
        } else {
            elementCounts[elementName]++;
        }

        // Set text content
        newP.textContent = elementName;
        idSpan.textContent = elementName.toLowerCase() + elementCounts[elementName];

        // Append elements
        newDragger.appendChild(newP);
        newDragger.appendChild(idSpan);
        newDragger.appendChild(removeButton);
        newElem.appendChild(newDragger);

        // Add new element to the DOM
        if (elementName === 'Navbar') {
            draggable.insertBefore(newElem, draggable.firstChild);
            navbarAdded = true;
            this.style.color = 'grey';
        } else if (elementName === 'Footer') {
            draggable.appendChild(newElem);
            footerAdded = true;
            this.style.color = 'grey';
        } else {
            draggable.insertBefore(newElem, draggable.lastChild);
        }

        // Hide the placeholder when a new element is added
        placeholder.style.display = 'none'; 

        // Event listener for remove button
        removeButton.addEventListener('click', function() {
            newElem.remove(); // Remove the dragger when the button is clicked

            // Show the placeholder if there are no draggable elements
            if (draggable.children.length === 0) {
                placeholder.style.display = 'block';
            }

            // Reset Navbar and Footer
            if (elementName === 'Navbar') {
                navbarAdded = false;
                Array.from(document.querySelectorAll('.element')).find(el => el.textContent === 'Navbar').style.color = 'var(--text)';
            } else if (elementName === 'Footer') {
                footerAdded = false;
                Array.from(document.querySelectorAll('.element')).find(el => el.textContent === 'Footer').style.color = 'var(--text)';
            }
            atOrderChange();
        });

        atOrderChange();
    });
});

// Show the placeholder if there are no draggable elements
if (draggable.children.length === 0) {
    placeholder.style.display = 'block';
}

$(function() {
    $(".draggable").sortable({
        axis: 'y',
        handle: '.dragger',
        containment: "parent",
        update: function(event, ui) {
            atOrderChange();
        }
    });
    $(".draggable").disableSelection();
});

// Event listener for dragger click
$(".draggable .dragger").click(function() {
    $(".draggable .dragger").removeClass("dragger-selected"); // Remove the class from all draggers
    $(this).addClass("dragger-selected"); // Add the class to the clicked dragger
});