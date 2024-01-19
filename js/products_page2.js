document.querySelectorAll('.menu-item_product_page2').forEach(menuItem => {
   menuItem.addEventListener('click', () => {
       // Quita la clase .active de todas las secciones
       document.querySelectorAll('.section-container_product_page2').forEach(section => {
           section.classList.remove('active');
       });

       // Agrega la clase .active a la sección correspondiente
       const targetId = menuItem.getAttribute('data-target');
       const activeSection = document.querySelector(targetId);
       activeSection.classList.add('active');

       // Calcula la altura del hijo activo y asigna esa altura al contenedor padre
       const mainContainer = document.querySelector('.main-container_product_page2');
       mainContainer.style.height = `${activeSection.offsetHeight}px`;
   });
});

window.addEventListener('load', () => {
    // Obtiene la altura de la primera sección
    const firstSection = document.querySelector('#section1');
    const firstSectionHeight = firstSection.offsetHeight;
 
    // Asigna la altura de la primera sección al contenedor principal
    const mainContainer = document.querySelector('.main-container_product_page2');
    mainContainer.style.height = `${firstSectionHeight}px`;
 });