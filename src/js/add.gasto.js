const form = document.getElementById("form-gasto");

const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");
const categoria = document.getElementById("categoria");
const data = document.getElementById("data");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const gasto = {
        descricao: descricao.value,
        valor: Number(valor.value),
        categoria: categoria.value,
        data: data.value
    };



//pega os gastos que ja estão salvos 
let gastos = JSON.parse(localStorage.getItem("gastos")) || []

//adicionar novo gasto
gastos.push(gasto)

//salvar no navegador
localStorage.setItem("gastos", JSON.stringify(gastos))

console.log(gastos)

//limpar formulario
form.reset()

});