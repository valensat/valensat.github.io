(function(){ 
    // var T_hist = [10.122, 11.182, 13.162, 15.196, 18.642, 22.746, 25.554, 25.85, 22.944, 18.668, 13.892, 11.004];
    var T_hist = [10.1, 11.2, 13.2, 15.2, 18.6, 22.7, 25.6, 25.9, 22.9, 18.7, 13.9, 11.0];
    var y_meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    var prec_hist = [36.2, 29.8, 38.1, 43.5, 38.4, 21.8, 13.5, 18.3, 52.2, 61.8, 51.6, 43.9];

    const data = {
        labels: y_meses,
        datasets: [{
            label: 'Temperatura media (°C)',
            data: T_hist,
            backgroundColor: ['rgba(247, 200, 21, .2)'],
            borderColor: ['rgba(227, 73, 73, 1)'],
            borderWidth: 2,
            tension: 0.3,
            yAxisID: 'y'
        },{
            label: 'Precipitación acumulada (mm)',
            data: prec_hist,
            backgroundColor: ['rgba(247, 200, 21, .2)'],
            borderColor: ['rgba(47, 112, 175, 0.5)'],
            borderWidth: 2,
            tension: 0.3,
            fill: '-1',
            yAxisID: 'percentage'
        }]
            };
    
    // config 
    const config = {
        type: 'line',
        data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    type: 'linear',
                    position: 'left',
                    min: 0,
                    max: 35,
                    ticks: {
                        callback: function(value, index, values) {
                            return `${value}.0 °C`
                        }
                    }
                },
                percentage: {
                    beginAtZero: true,
                    type: 'linear',
                    position: 'right',
                    grid: {
                        drawOnChartArea: false
                    },
                    min: 0,
                    max: 70,
                    ticks: {
                        callback: function(value, index, values) {
                            return `${value}.0 mm`
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    yAlign: 'bottom',
                    displayColors: false,
                    backgroundColor: 'rgba(240, 248, 255, 0.8)',
                    titleColor: 'rgb(28, 37, 44)',
                    titleFont: {weight: 'bold', family: 'Arial', size: 14},
                    titleAlign: 'center',
                    titleMarginBottom: 1,
                    bodyColor: 'rgb(28, 37, 44)',
                    bodyFont: {family: 'Arial', size: 14},
                    caretSize: 12
                }
            }
        }
        };
    
    // render init block
    const myChart = new Chart(
    document.getElementById('clim_ombro_medio'),
    config
    );
})();