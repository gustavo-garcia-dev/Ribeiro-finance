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
            data: [1200, 1800, 900, 2100]
        }]
    }
});