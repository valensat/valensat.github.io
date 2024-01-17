// (function(){

//     const sliders = [...document.querySelectorAll('.testimony_body')];
//     const buttonNext = document.querySelector('#next');
//     const buttonBefore = document.querySelector('#before');
//     const testimonies = [...document.querySelectorAll('.testimony')];
//     let value;

//     buttonNext.addEventListener('click', ()=>{
//         changePosition(1)
//     });

//     buttonBefore.addEventListener('click', ()=>{
//         changePosition(-1)
//     });

//     const changePosition = (add)=>{
//         const currentTestimony = document.querySelector('.testimony_body--show').dataset.id;
//         value = Number(currentTestimony);
//         value += add;

//         sliders[Number(currentTestimony)-1].classList.remove('testimony_body--show')
//         if(value == sliders.length+1 || value == 0){
//             value = value == 0 ? sliders.length  : 1;
//         }

//         sliders[value-1].classList.add('testimony_body--show')
//         document.querySelector('.testimony').setAttribute('data-slide', value);
//     }

// })();

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


document.addEventListener('DOMContentLoaded', function () {
    const sliderWrapper = document.querySelector('.slider-wrapper_banner_products');
    const slides = document.querySelectorAll('.slide_banner_products');
    let currentIndex = 0;
    let autoSlideInterval;

    function nextSlide() {
        if (currentIndex < slides.length - 1) {
        // Only increment if not on the last slide
        currentIndex++;
        } else {
        // If on the last slide, wrap to the first slide
        currentIndex = 0;
        }
        updateSlider();
    }

    function prevSlide() {
        if (currentIndex > 0) {
        // Only decrement if not on the first slide
        currentIndex--;
        } else {
        // If on the first slide, wrap to the last slide
        currentIndex = slides.length - 1;
        }
        updateSlider();
    }

    function updateSlider() {
        const translateValue = -currentIndex * 100 + '%';
        sliderWrapper.style.transform = 'translateX(' + translateValue + ')';
        resetAutoSlide(); // Reset the automatic slide interval
    }

    // Clear the automatic slide interval and reset it
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 15000); // Change slide every 5 seconds
    }

    // Initialize the slider interval
    resetAutoSlide();

    // Update arrow button event listeners
    document.querySelector('.arrow-left_banner_products').addEventListener('click', prevSlide);
    document.querySelector('.arrow-right_banner_products').addEventListener('click', nextSlide);

    // Initialize arrows display
    updateSlider();
    });


    document.addEventListener('DOMContentLoaded', function () {
        const sliderWrapper = document.querySelector('.slider-wrapper_banner_info');
        const slides = document.querySelectorAll('.slide_banner_info');
        let currentIndex = 0;
        let autoSlideInterval;
    
        function nextSlide() {
            if (currentIndex < slides.length - 1) {
            // Only increment if not on the last slide
            currentIndex++;
            } else {
            // If on the last slide, wrap to the first slide
            currentIndex = 0;
            }
            updateSlider();
        }
    
        function prevSlide() {
            if (currentIndex > 0) {
            // Only decrement if not on the first slide
            currentIndex--;
            } else {
            // If on the first slide, wrap to the last slide
            currentIndex = slides.length - 1;
            }
            updateSlider();
        }
    
        function updateSlider() {
            const translateValue = -currentIndex * 100 + '%';
            sliderWrapper.style.transform = 'translateX(' + translateValue + ')';
            resetAutoSlide(); // Reset the automatic slide interval
        }
    
        // Clear the automatic slide interval and reset it
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 30000); // Change slide every 5 seconds
        }
    
        // Initialize the slider interval
        resetAutoSlide();
    
        // Update arrow button event listeners
        document.querySelector('.arrow-left_banner_info').addEventListener('click', prevSlide);
        document.querySelector('.arrow-right_banner_info').addEventListener('click', nextSlide);
    
        // Initialize arrows display
        updateSlider();
        });


(function(){
    // BOTÓN VOLVER ARRIBA

    var backToTop = document.querySelector(".back-to-top");

    window.addEventListener("scroll", function() {
    if (window.pageYOffset > 1000) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
    });

    backToTop.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    });
})();



// document.addEventListener('DOMContentLoaded', function() {
//     var footerTrigger = document.getElementById('footerTrigger');
//     var infoPopup = document.getElementById('infoPopup');
//     var closePopup = document.getElementById('closePopup');
//     var modalOverlay = document.getElementById('modalOverlay');
//     var body = document.body;
  
//     footerTrigger.addEventListener('click', function() {
//       infoPopup.classList.add('visible');
//       modalOverlay.classList.add('visible');
//       body.classList.add('no-scroll');
//     });
  
//     function closePopupAndOverlay() {
//       infoPopup.classList.remove('visible');
//       modalOverlay.classList.remove('visible');
//       body.classList.remove('no-scroll');
//     }
  
//     closePopup.addEventListener('click', closePopupAndOverlay);
//     modalOverlay.addEventListener('click', closePopupAndOverlay);
  
//     document.addEventListener('keydown', function(event) {
//       if (event.key === 'Escape') {
//         closePopupAndOverlay();
//       }
//     });
//   });

document.addEventListener('DOMContentLoaded', function() {
    var footerTrigger = document.getElementById('footerTrigger');
    var infoPopup = document.getElementById('infoPopup');
    var closePopup = document.getElementById('closePopup');
    var modalOverlay = document.getElementById('modalOverlay');
    var body = document.body;
  
    footerTrigger.addEventListener('click', function() {
      modalOverlay.style.display = 'block';
      infoPopup.style.display = 'block';
      setTimeout(function() {
        modalOverlay.classList.add('visible');
        infoPopup.classList.add('visible');
      }, 10);
      body.classList.add('no-scroll');
    });
  
    function closePopupAndOverlay() {
      infoPopup.classList.remove('visible');
      modalOverlay.classList.remove('visible');
      modalOverlay.addEventListener('transitionend', function() {
        modalOverlay.style.display = 'none';
      }, { once: true });
      body.classList.remove('no-scroll');
    }
  
    closePopup.addEventListener('click', closePopupAndOverlay);
    modalOverlay.addEventListener('click', closePopupAndOverlay);
  
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        closePopupAndOverlay();
      }
    });
});
