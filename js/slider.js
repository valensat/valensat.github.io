(function(){

    const sliders = [...document.querySelectorAll('.testimony_body')];
    const buttonNext = document.querySelector('#next');
    const buttonBefore = document.querySelector('#before');
    const testimonies = [...document.querySelectorAll('.testimony')];
    let value;

    buttonNext.addEventListener('click', ()=>{
        changePosition(1)
    });

    buttonBefore.addEventListener('click', ()=>{
        changePosition(-1)
    });

    const changePosition = (add)=>{
        const currentTestimony = document.querySelector('.testimony_body--show').dataset.id;
        value = Number(currentTestimony);
        value += add;

        sliders[Number(currentTestimony)-1].classList.remove('testimony_body--show')
        if(value == sliders.length+1 || value == 0){
            value = value == 0 ? sliders.length  : 1;
        }

        sliders[value-1].classList.add('testimony_body--show')
        document.querySelector('.testimony').setAttribute('data-slide', value);
    }

})();

document.addEventListener('DOMContentLoaded', function() {
    var productosLink = document.getElementById('productosLink');
    var productosMenu = document.getElementById('productosMenu');

    productosLink.addEventListener('click', function() {
        productosMenu.classList.toggle('active');
    });

    // Cierra el menú cuando haces clic fuera de él
    document.addEventListener('click', function(event) {
        if (!productosMenu.contains(event.target) && !productosLink.contains(event.target)) {
            productosMenu.classList.remove('active');
        }
    });
});