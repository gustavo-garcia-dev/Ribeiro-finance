const form = document.getElementById("form-gasto");

const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");
const categoria = document.getElementById("categoria");
const data = document.getElementById("data");

// Pega os gastos salvos
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

// Verifica se estamos editando algum gasto
const gastoEditando = localStorage.getItem("gastoEditando");


// ==============================
// PREENCHER FORMULÁRIO AO EDITAR
// ==============================

if (gastoEditando !== null) {

    const gasto = gastos[Number(gastoEditando)];

    if (gasto) {
        descricao.value = gasto.descricao;
        valor.value = gasto.valor;
        categoria.value = gasto.categoria;
        data.value = gasto.data;
    }
}


// ==============================
// SALVAR FORMULÁRIO
// ==============================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const gasto = {
        descricao: descricao.value,
        valor: Number(valor.value),
        categoria: categoria.value,
        data: data.value
    };


    // Se estiver editando
    if (gastoEditando !== null) {

        gastos[Number(gastoEditando)] = gasto;

        localStorage.setItem("gastos", JSON.stringify(gastos));

        localStorage.removeItem("gastoEditando");

        window.location.href = "index.html";

    } 
    
    // Se for um novo gasto
    else {

        gastos.push(gasto);

        localStorage.setItem("gastos", JSON.stringify(gastos));

        form.reset();
    }

});