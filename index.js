document.addEventListener('DOMContentLoaded', function() {

    var dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    document.getElementById('favicon').addEventListener('click', function() {
        window.location.href = '../index.html';  // Redirect to home page
    });

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parentItem = this.closest('.sidebar-item');
            parentItem.classList.toggle('active');

            // Toggle rotation class
            this.classList.toggle('rotated');

            // Explicitly toggle the display of subtopics
            const subtopicsContainer = parentItem.querySelector('.subtopics-container');
            if (subtopicsContainer) {
                subtopicsContainer.style.display = parentItem.classList.contains('active') ? 'block' : 'none';
            }
        });
    });

    // Open the dropdown for the current page
    const currentPage = window.location.pathname.split('/').pop();
    var currentMenuItem;
    if (currentPage == 'subtopic_welcome.html') {
        
        currentMenuItem = document.querySelectorAll(`a[href="./${currentPage}"]`)[1]
    }
    else {
        currentMenuItem = document.querySelector(`a[href="./${currentPage}"]`);
    }


    if (currentMenuItem) {

        const parentItem = currentMenuItem.closest('.sidebar-item');
        parentItem.classList.add('active');
        const subtopicsContainer = parentItem.querySelector('.subtopics-container');

        if (subtopicsContainer) {
            subtopicsContainer.style.display = 'block';
        }
        const dropdownToggle = parentItem.querySelector('.dropdown-toggle');
        
        if (dropdownToggle) {
            dropdownToggle.classList.add('rotated');
        }
    }

});