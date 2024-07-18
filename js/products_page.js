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

// Cambiar altura de la página en funcion de esta

// Crear un objeto que actúe como un diccionario
var pageConfig = {
    'suhi': 2.5,
    'evolUrbana': 2.2,
    'contaminacion': 2.4,
    'salud': 1,
    'areaQuemada': 1.6,
    'evolIncendios': 1.9,
    'riesgo': 1,
    'evapo': 1.7,
    'sequias': 2.5,
    'heladas': 1,
    'indices': 1.8,
    'landcover': 2.2,
    'costa': 1,
    'historico': 1.9,
    'calidad': 1.7
    // Agrega aquí más páginas y sus valores de multiplicación
};

// Obtener el nombre de la página actual
var currentUrl = window.location.href;
var pageName = currentUrl.split('/').pop().split('.')[0];
console.log(currentUrl);
console.log(pageName);

var sectionHeight = document.getElementById('ciencia_product_page').offsetHeight;

// Calcular totalHeight basado en la configuración de la página actual
var totalHeight = sectionHeight * (pageConfig[pageName] || 2.5); // Valor predeterminado de 2.5 si no se encuentra en el diccionario
console.log(totalHeight);

// // Asegúrate de que totalHeight tenga un valor predeterminado si la página no está en el diccionario
// if (totalHeight === NaN) {
//     totalHeight = sectionHeight * 2.5; // Valor predeterminado
// }

document.querySelector('.all_sections-container_product_page').style.minHeight = totalHeight + 'px';

var sections = document.querySelectorAll('.content-section_product_page');
for (var i = 0; i < sections.length; i++) {
    sections[i].style.height = totalHeight + 'px';
}
