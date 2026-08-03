const canvasCategorias = document.getElementById("graficoCategorias");

if (canvasCategorias) {

    const gastos = JSON.parse(localStorage.getItem("gastos")) || [];

    const categorias = {};

    gastos.forEach(function(gasto) {

        const categoria = gasto.categoria;
        const valor = Number(gasto.valor);

        if (Object.prototype.hasOwnProperty.call(categorias, categoria)) {
            categorias[categoria] += valor;
        } else {
            categorias[categoria] = valor;
        }

    });

    new Chart(canvasCategorias, {

        type: "pie",

        data: {
            labels: Object.keys(categorias),

            datasets: [{
                data: Object.values(categorias)
            }]
        },

        options: {
            responsive: true,

            plugins: {
                legend: {
                    labels: {
                        color: "#ffffff"
                    }
                }
            }
        }

    });

}