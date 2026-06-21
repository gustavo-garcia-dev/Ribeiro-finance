new Chart(document.getElementById('graficoMensal'), {
    type: 'bar',

    data: {
        labels: [
            'Jan',
            'Fev',
            'Mar',
            'Abr'
        ],

        datasets: [{
            label: 'Gastos',
            data: [1200, 1800, 900, 2100],
            backgroundColor: '#00C853',
            borderRadius: 10
        }]
     },

    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: 'rgba(255, 255, 255, 0.5)',
                    font: {
                        size: 15
                    }
                }
            }
        },

        scales: {
            x: {
                ticks: {
                    color: 'rgba(255, 255, 255, 0.5)',
                    font: {
                        size: 15
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.5)'
                }
            },

            y: {
                ticks: {
                    color: 'rgba(255, 255, 255, 0.5)',
                    font: {
                        size: 15
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.5)'
                }
            }
        }
    }
});