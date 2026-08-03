const totalGastos = document.getElementById("total-gastos")
const transacoes = document.getElementById("transacoes")
const categoria = document.getElementById("categoria")
const listaTransacoes = document.getElementById("lista-transacoes")


//pega os gastos salvos
const gastos = JSON.parse(localStorage.getItem("gastos")) || []

//soma todos os valores
let total = 0

gastos.forEach(function (gasto) {
    total += gasto.valor
})

//mostrar resultado 
totalGastos.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
})

//transaçoes
transacoes.textContent = gastos.length

//categorias
const categoriasUnicas = new Set()
gastos.forEach(function (gasto) {
    categoriasUnicas.add(gasto.categoria)
})

categoria.textContent = categoriasUnicas.size

//ultimas transaçoes
gastos.forEach(function(gasto, index) {

   listaTransacoes.innerHTML += `
    <article class="transacao">

        <div class="transacao-info">
            <h3>${gasto.descricao}</h3>

            <p>
                ${gasto.categoria}  
                ${gasto.data ? gasto.data.split("-").reverse().join("/") : ""}
            </p>
        </div>

        <span class="valor-transacao">
            - ${gasto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}
        </span>

        <button 
            class="btn-editar"
            onclick="editarGasto(${index})">
            <i class="fa-solid fa-pen"></i>
        </button>

        <button class="btn-excluir" onclick="excluirGasto(${index})">
            <i class="fa-solid fa-trash"></i>
        </button>

    </article>
`;

});

//editar gasto
function editarGasto(index) {
    const gasto = gastos[index]
    localStorage.setItem("gastoEditando", index)
    window.location.href = "add-gasto.html"
}

//excluir gasto
function excluirGasto(index) {
    gastos.splice(index, 1)
    localStorage.setItem("gastos", JSON.stringify(gastos))
    location.reload() 
}
