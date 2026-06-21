new Chart(document.getElementById('graficoCategorias'), {
    type: 'pie',

    data: {
        labels: [
            'Alimentação',
            'Transporte',
            'Saúde'
        ],

        datasets: [{
            data: [500, 300, 200]
        }]
    },

    options: {
        labels: {
            color: 'rgba(70, 11, 11, 0.5)',
            font: {
                size: 20
            }
        }
    },
});