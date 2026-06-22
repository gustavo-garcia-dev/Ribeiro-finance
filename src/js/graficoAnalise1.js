const categorias = document.getElementById("graficoCategorias");

new Chart(categorias, {
    type: "bar",
    data: {
        labels: [
            "Alimentação",
            "Moradia",
            "Transporte",
            "Saúde"
        ],
        datasets: [{
            data: [570, 1200, 280, 85],
            backgroundColor: [
                "#a78bfa",
                "#ec4899",
                "#f59e0b",
                "#22c55e"
            ],
            borderRadius: 20
        }]
    },
    options: {
        indexAxis: "y",

        plugins: {
            legend: {
                display: false
            }
        },

        scales: {
            x: {
                ticks: {
                    color: "white"
                },
                grid: {
                    color: "rgba(255,255,255,0.05)"
                }
            },

            y: {
                ticks: {
                    color: "white",
                    font: {
                        size: 15
                    }
                },
                grid: {
                    display: false
                }
            }
        }
    }
});