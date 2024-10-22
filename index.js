document.addEventListener('DOMContentLoaded', function() {

    var subtopicLinks = document.querySelectorAll('.sidebar-link.subtopic');
    var sections = document.querySelectorAll('section[id]');
    var dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    var sidebarLinks = document.querySelectorAll('.sidebar-link');
    document.getElementById('favicon').addEventListener('click', function() {
        window.location.href = '../index.html';  // Redirect to home page
    });

    setActiveSubtopic();
    window.addEventListener('scroll', setActiveSubtopic);

    subtopicLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
              history.pushState(null, null, href);
            }
          }
        });
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

    if (window.location.hash) {
        const initialTargetId = window.location.hash.substring(1);
        const initialTargetElement = document.getElementById(initialTargetId);
        if (initialTargetElement) {
          setTimeout(() => {
            initialTargetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 100);
        }
    }

    function setActiveSubtopic() {
        let currentSectionId = '';
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (window.scrollY >= sectionTop - 50 && window.scrollY < sectionTop + sectionHeight - 50) {
            currentSectionId = section.getAttribute('id');
          }
        });
    
        subtopicLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
          }
        });
    }

});
