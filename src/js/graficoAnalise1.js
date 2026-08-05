const gastos = JSON.parse(localStorage.getItem("gastos")) || [];

const categorias = {};

gastos.forEach(function (gasto) {
    if (categorias[gasto.categoria]) {
        categorias[gasto.categoria] += gasto.valor;
    } else {
        categorias[gasto.categoria] = gasto.valor;
    }
});

const nomesCategorias = Object.keys(categorias);
const valoresCategorias = Object.values(categorias);

const ctx = document.getElementById("graficoCategorias");

if (ctx) {
    new Chart(ctx, {
        type: "bar",

        data: {
            labels: nomesCategorias,

            datasets: [{
                label: "Gastos",
                data: valoresCategorias,

                backgroundColor: [
                    "#9b7bea",
                    "#e83e8c",
                    "#f5a000",
                    "#20c46b",
                    "#00b85a",
                    "#3498db",
                    "#8e44ad"
                ],

                borderRadius: 10
            }]
        },

        options: {
            indexAxis: "y",

            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            },

scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        color: "white",
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: "rgba(255,255,255,0.05)"
                    }
                },

                y: {
                    ticks: {
                        color: "white",
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: "rgba(255,255,255,0.05)"
                    }
                }
            }
        }
    });
}
