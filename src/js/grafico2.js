const canvasMensal = document.getElementById("graficoMensal");

if (canvasMensal) {

    const gastos = JSON.parse(localStorage.getItem("gastos")) || [];

    // Gera os últimos 6 meses dinamicamente (do mais antigo para o mais recente)
    const mesesNomes = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    const labels = [];
    const valores = [];

    const hoje = new Date();

    for (let i = 5; i >= 0; i--) {

        const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
        const chaveMes = data.getFullYear() + "-" + String(data.getMonth() + 1).padStart(2, "0");

        labels.push(mesesNomes[data.getMonth()]);

        // Soma os gastos cuja data pertence ao mês atual do loop
        const totalMes = gastos.reduce(function(soma, gasto) {

            if (gasto.data && gasto.data.slice(0, 7) === chaveMes) {
                return soma + Number(gasto.valor);
            }

            return soma;

        }, 0);

        valores.push(totalMes);
    }

    new Chart(canvasMensal, {
        type: "bar",

        data: {
            labels: labels,

            datasets: [{
                label: "Gastos",
                data: valores,
                backgroundColor: "#00c853",
                borderRadius: 10
            }]
        },

        options: {
            responsive: true,

            plugins: {
                legend: {
                    labels: {
                        color: "white"
                    }
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
                    beginAtZero: true,
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

}
