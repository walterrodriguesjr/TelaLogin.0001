class validator {
    constructor(){
        this.validations = [
            'data-min-length',
        ]
    }

    //iniciar a validação em todos os campos
    validate(form) {

        //pegar os inputs
        let inputs = form.getElementById('input');

        //Transformo HTMLcollection -> array
        let inputsArray = [...inputs];

        //loop nos inputs e validação no que for encontrado
        inputsArray.forEach(function(input) {
         
            //loop em todas as validações existentes
            for(let i = 0; this.validations.length > i; i++) {
                //verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null) {
                   
                    //data-min-length -> minlength
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    let value = input.getAttribute(this.validations[i]);

                    this[method](input, value);
                }
            }            
        }, this);
    }
    //verifica se um input tem um número mínimo de caracteres
    minlength(input, minValue) {

        let inputLength = input.valeu.length;

        let errorMessage = 'O campo precisa ter pelo menos ${minValue} caracteres';
        if(inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }

    }

    printMessage(input, msg) {
        let template = document.querySelector('.error-validation').cloneNode(true);

        template.textContent = msg;

        let inputParent = input.parentNode;

        template.classList.remove('template');

        inputParent.appendChild(template);
    }
}


let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new validator();

//evento que dispara as validações
submit.addEventListener('click', function(e) {
    
    e.preventDefault();

   validator.validate(form);

});