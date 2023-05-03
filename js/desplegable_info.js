(function(){
    const titleQuestions = [...document.querySelectorAll('.desp_title')];
    console.log(titleQuestions)

    // question es el h3 y answer es el párrafo
    titleQuestions.forEach(question =>{
        question.addEventListener('click', ()=>{
            let height = 0;
            // el elemento del h3 es el parrafo 
            let answer = question.nextElementSibling;
            // el abuelo del h3 es que es questions_padding
            let addPading = question.parentElement.parentElement;

            // queremos al primer hijo y sus clases
            question.children[0].classList.toggle('desp_arrow--rotate')
            addPading.classList.toggle('desp_padding--add')

            if(answer.clientHeight === 0){
                // scrollHeight nos da el alto mínimo para que un elemento se muestre
                height = answer.scrollHeight;
            }

            answer.style.height = `${height}px`;
        });
    });
})();