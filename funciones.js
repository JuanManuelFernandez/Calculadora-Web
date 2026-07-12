const pantalla = document.getElementById("inputPantalla");
const contenedorBotones = document.querySelector("#contenedorBtns");

let resultadoAcumulado = null;
let operadorPendiente = null;
let calculoTerminado = false;

let numeroActual = "";

function calcular (a, b, operador) {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    switch(operador) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "X":
            return num1 * num2;
        case "/":
            if(num2 == 0) {
                pantalla.value = "No se puede dividir entre cero";
                return;
            }
            return num1 / num2;
    }
}

contenedorBotones.addEventListener("click", (e) =>{
    if(!e.target.classList.contains("Btn")){
        return;
    }

    const accion = e.target.dataset.accion;
    const valor = e.target.textContent;

    switch(accion) {
        case "numero":
            if(calculoTerminado){
                numeroActual = "";
                calculoTerminado = false;
            }
            numeroActual += valor;
            pantalla.value = numeroActual;
            break;
        
        case "operador":
            if(operadorPendiente !== null && numeroActual !== "") {
                resultadoAcumulado = calcular(resultadoAcumulado, numeroActual, operadorPendiente);
            }
            else if(numeroActual !== ""){
                resultadoAcumulado = parseFloat(numeroActual);
            }
            operadorPendiente = valor;
            numeroActual = "";
            pantalla.value = resultadoAcumulado;
            break;

        case "igual":
            if(operadorPendiente !== null && numeroActual !== ""){
                resultadoAcumulado = calcular(resultadoAcumulado, numeroActual, operadorPendiente);
            }
            pantalla.value = resultadoAcumulado;

            operadorPendiente = null;
            numeroActual = "";
            calculoTerminado = true;
            break;
    }
});
