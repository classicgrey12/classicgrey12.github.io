document.addEventListener('DOMContentLoaded', function() {
    const allLinks = document.querySelectorAll('.sidebar-link');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default only for main topics to allow subtopic links to work
            if (this.classList.contains('main-topic')) {
                e.preventDefault();
            }
            
            // Remove active class from all links
            allLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // If it's a subtopic, also highlight its parent main topic
            if (this.classList.contains('subtopic')) {
                this.closest('.subtopics-container').previousElementSibling.classList.add('active');
            }
        });
    });
});