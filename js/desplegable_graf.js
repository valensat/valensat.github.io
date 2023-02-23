(function(){
let selectedValueUrl = '';

function getChartData(jsonFile) {
    fetch(jsonFile)
      .then(response => response.json())
      .then(data => {
        const hora = data.map(obj => obj.Fecha);
        const temp = data.map(obj => obj.T);
        const fecha = data.map(obj => obj.int);
        
        // Usar los datos para crear el gráfico
        const ctx = document.getElementById("graf_desplegable").getContext("2d");
        myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: hora,
            datasets: [
              {
                label: 'Temperatura media (°C)',
                data: temp,
                backgroundColor: '#fff',
                borderColor: ['rgba(227, 73, 73, 1)'],
                borderWidth: 2,
                tension: 0.4
              }
            ]
          },
          options: {
            responsive: true,
            // maintainAspectRatio: false,
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
                    text: fecha[1],
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
        });
      })
      .catch(error => console.error(error));
  }
  
// Seleccionar el desplegable
const select = document.getElementById("ciudad");

// Asignar evento "change" al desplegable
select.addEventListener("change", event => {
  // Obtener el valor seleccionado
  const selectedValue = event.target.value;
  selectedValueUrl = "../data/AEMET_temp/" + selectedValue + ".json"
  
  // Actualizar el gráfico con los datos del archivo JSON seleccionado
  getChartData(selectedValueUrl);
});

function updateChart() {
    // Obtener los nuevos datos del archivo JSON
    fetch(selectedValueUrl)
      .then(response => response.json())
      .then(data => {
        const hora = data.map(obj => obj.Fecha);
        const temp = data.map(obj => obj.T);
        const fecha = data.map(obj => obj.int);
  
        // Actualizar los datos del chart existente
        myChart.data.labels = hora;
        myChart.data.datasets[0].data = temp;
        myChart.options.plugins.title.text = fecha[1]
  
        // Actualizar el chart
        myChart.update();
      })
      .catch(error => console.error(error));
  }

select.addEventListener('change', function() {
    updateChart();
  });
})()