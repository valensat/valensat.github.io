document.addEventListener('DOMContentLoaded', function() {
    // Function to show a section
    window.showSection = function(sectionId) {
        // Remove 'active' class from all menu items
        document.querySelectorAll('.menu-item_product_page').forEach(function(menuItem) {
            menuItem.classList.remove('active');
        });

        // Hide all sections
        document.querySelectorAll('.content-section_product_page').forEach(function(section) {
            section.style.opacity = '0';
            section.style.visibility = 'hidden';
        });
    
        // Use a timeout to allow the hide transition to play
        setTimeout(function() {
            // Show the selected section
            var selectedSection = document.getElementById(sectionId);
            selectedSection.style.opacity = '1';
            selectedSection.style.visibility = 'visible';
            document.querySelector('.menu-item_product_page[onclick="showSection(\'' + sectionId + '\')"]').classList.add('active');
        }, 300); // Should match the duration of the CSS transition
    };
  
    // Show 'ciencia' section by default on page load
    showSection('ciencia_product_page');
});


var sectionHeight = document.getElementById('ciencia_product_page').offsetHeight;
var totalHeight = sectionHeight + 375;

document.querySelector('.all_sections-container_product_page').style.minHeight = totalHeight + 'px';

var sections = document.querySelectorAll('.content-section_product_page');
for (var i = 0; i < sections.length; i++) {
    sections[i].style.height = totalHeight + 'px';
}
