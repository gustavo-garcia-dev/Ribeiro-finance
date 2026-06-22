const mensal = document.getElementById("graficoMensal");

new Chart(mensal, {
    type: "bar",

    data: {
        labels: [
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun"
        ],

        datasets: [{
            data: [1800, 2100, 1900, 2400, 2000, 2150],
            backgroundColor: "#08ed6f",
            borderRadius: 10
        }]
    },

    options: {
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
                    color: "white"
                },
                grid: {
                    color: "rgba(255,255,255,0.05)"
                }
            }
        }
    }
});