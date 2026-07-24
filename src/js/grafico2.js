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
            backgroundColor: '#06df61',
            borderRadius: 10
        }]
     },

    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: 'rgb(255, 255, 255)',
                    font: {
                        size: 15
                    }
                }
            }
        },

        scales: {
            x: {
                ticks: {
                    color: 'rgb(255, 255, 255)',
                    font: {
                        size: 15
                    }
                },
                grid: {
                    color: 'rgb(255, 255, 255)'
                }
            },

            y: {
                ticks: {
                    color: 'rgb(255, 255, 255)',
                    font: {
                        size: 15
                    }
                },
                grid: {
                    color: 'rgb(255, 255, 255)'
                }
            }
        }
    }
});