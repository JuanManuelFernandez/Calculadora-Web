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
            if(calculoTerminado && operadorPendiente == null){
                numeroActual = "";
                resultadoAcumulado = null;
                pantalla.value = numeroActual;
                calculoTerminado = false;
            }
            numeroActual += valor;
            if(resultadoAcumulado == null && operadorPendiente == null) {
                pantalla.value = numeroActual;
            }
            else if(resultadoAcumulado !== null && operadorPendiente !== null) {
                pantalla.value = resultadoAcumulado + operadorPendiente + numeroActual;
            }
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
            pantalla.value = resultadoAcumulado + operadorPendiente + numeroActual;
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
        
        case "limpiarActual":
            if(resultadoAcumulado !== null && operadorPendiente !== null && numeroActual !== ""){
                numeroActual = "";
                pantalla.value = resultadoAcumulado + operadorPendiente + numeroActual;
            }
            else if(numeroActual !== ""){
                numeroActual = "";
                pantalla.value = numeroActual;
            }
            else if(calculoTerminado) {
                resultadoAcumulado = null
                pantalla.value = resultadoAcumulado;
            }
            break;

        case "limpiarTodo":
            numeroActual = "";
            resultadoAcumulado = null;
            operadorPendiente = null;
            calculoTerminado = false;

            pantalla.value = "";
            break;
        
        case "borrar":
            if(numeroActual.length > 0){
                numeroActual = numeroActual.slice(0, -1);
            }
            if(resultadoAcumulado !== null && operadorPendiente !== null) {
                pantalla.value = resultadoAcumulado + operadorPendiente + numeroActual;
            }
            else {
                pantalla.value = numeroActual;
            }
            break
    }
});
