function changeFinancials(){

    const year = document.getElementById('year').value;

    var xmlhttp = new XMLHttpRequest();
    // var url = '../data/AEMET_temp/valenciajson.json';
    const url = `../data/AEMET_temp/${year}.json`
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function a(){
        if(this.readyState == 4 && this.status == 200){
            var datapoints30 = JSON.parse(this.responseText);
            fecha = datapoints30.map(function(elem){
                return elem.Fecha;
            })
            T = datapoints30.map(function(elem){
                return elem.T;
            })
            int = datapoints30.map(function(elem){
                return elem.int;
            })

            const data = {
                labels: fecha,
                datasets: [{
                    label: 'Temperatura media (°C)',
                    data: T,
                    backgroundColor: '#fff',
                    borderColor: ['rgba(227, 73, 73, 1)'],
                    borderWidth: 2,
                    tension: 0.4
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
                        ticks: {
                            callback: function(value, index, values) {
                                return `${value}.0 °C`
                            }
                        }
                    },
                    x: {
                        ticks: {
                            // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                            callback: function(val, index) {
                                // Hide every 2nd tick label
                                return index % 2 === 1 ? this.getLabelForValue(val) : '';
                            },
                            // color: 'red',
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: int[1],
                    },
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
            document.getElementById('prueba2'),
            config
            );
        }
    }

}

function recargar(){
    location.reload()
}
