(function(){
    const listElements = document.querySelectorAll('.menu__item--show');
    const list = document.querySelector('.menu__links');
    const menu = document.querySelector('.menu__hamburguer');

    const addClick = ()=>{
        listElements.forEach(element =>{
            element.addEventListener('click', ()=>{
                
                let subMenu = element.children[1];
                let height = 0;
                element.classList.toggle('menu__item--active');

                if(subMenu.clientHeight === 0){
                    height = subMenu.scrollHeight;
                }

                subMenu.style.height = `${height}px`
            })
        })
    }

    const deleteStyleHeight = ()=>{
        listElements.forEach(element=>{

            if(element.children[1].getAttribute('style')){
                element.children[1].removeAttribute('menu__item--active');
            }
        });
    }

    window.addEventListener('resize', ()=>{
        if(window.innerWidth > 1500){
            deleteStyleHeight();
        }else{
            addClick();
        }
    });

    if(window.innerWidth <= 1500){
        addClick();
    }

    menu.addEventListener('click', ()=> list.classList.toggle('menu__links--show'));
})();

(function(){
    const listElements = document.querySelectorAll('.menu__item--show--index');
    const list = document.querySelector('.menu__links--index');
    const menu = document.querySelector('.menu__hamburguer');

    const addClick = ()=>{
        listElements.forEach(element =>{
            element.addEventListener('click', ()=>{
                
                let subMenu = element.children[1];
                let height = 0;
                element.classList.toggle('menu__item--active--index');

                if(subMenu.clientHeight === 0){
                    height = subMenu.scrollHeight;
                }

                subMenu.style.height = `${height}px`
            })
        })
    }

    const deleteStyleHeight = ()=>{
        listElements.forEach(element=>{

            if(element.children[1].getAttribute('style')){
                element.children[1].removeAttribute('menu__item--index--active');
            }
        });
    }

    window.addEventListener('resize', ()=>{
        if(window.innerWidth > 1500){
            deleteStyleHeight();
        }else{
            addClick();
        }
    });

    if(window.innerWidth <= 1500){
        addClick();
    }

    menu.addEventListener('click', ()=> list.classList.toggle('menu__links--show--index'));
})();

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

