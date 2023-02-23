(function(){

    // var codigoSelect = document.getElementById("estaciones");
    // var codigo = codigoSelect.options[codigoSelect.selectedIndex].value;
    // console.log(codigo)
    
    // var settings = {
    //   "async": true,
    //   "crossDomain": true,
    //   "url": "https://opendata.aemet.es/opendata/api/observacion/convencional/datos/estacion/"+codigo+"/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2YWxlbnNhdHByb2plY3RAZ21haWwuY29tIiwianRpIjoiODA4MDAzMzctOWFjZC00ODU0LTgxM2ItNWYyZjc5ZTIyYzUyIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2NzcwNjY3MjksInVzZXJJZCI6IjgwODAwMzM3LTlhY2QtNDg1NC04MTNiLTVmMmY3OWUyMmM1MiIsInJvbGUiOiIifQ.Ps7tu6zJexdHPBj36pLUwd9uLYE14lZLGxZi1lyQHqQ",
    //   "method": "GET",
    //   "headers": {
    //     "cache-control": "no-cache"
    //   }
    // };
    

   
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://opendata.aemet.es/opendata/api/observacion/convencional/datos/estacion/8416Y/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2YWxlbnNhdHByb2plY3RAZ21haWwuY29tIiwianRpIjoiODA4MDAzMzctOWFjZC00ODU0LTgxM2ItNWYyZjc5ZTIyYzUyIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2NzcwNjY3MjksInVzZXJJZCI6IjgwODAwMzM3LTlhY2QtNDg1NC04MTNiLTVmMmY3OWUyMmM1MiIsInJvbGUiOiIifQ.Ps7tu6zJexdHPBj36pLUwd9uLYE14lZLGxZi1lyQHqQ",
    "method": "GET",
    "headers": {
      "cache-control": "no-cache"
    }
  }

  $.ajax(settings)
    .done(function(response) {
      // Después de obtener la URL con los datos, realizamos una nueva petición
      $.ajax({
          url: response.datos,
          method: 'GET',
          headers: {
              'cache-control': 'no-cache'
          }
          })
          .done(function (response) {
          console.log(response);  // Ver la respuesta en la consola
          var data = JSON.parse(response);
          console.log(data);  // Ver la respuesta parseada en la consola
          var temperatura = data[0].ta;
          console.log(temperatura);  // Ver la temperatura en la consola

          var temperaturas = [];
          var horas = [];
          for (var i = 0; i < data.length; i++) {
          temperaturas.push(data[i].ta);
          horas.push(data[i].fint);
          }
          console.log(temperaturas);  // Ver las temperaturas en la consola
          console.log(horas);  // Ver las horas en la consola
          
          var horasFormateadas = [];

          for (var i = 0; i < horas.length; i++) {
          var fecha = new Date(horas[i]);
          var dia = fecha.getDate();
          var mes = fecha.toLocaleString('default', { month: 'short' });
          var hora = fecha.getHours()+1;
          var horaFormateada = dia + ' ' + mes + '. ' + hora + 'h';
          horasFormateadas.push(horaFormateada);
          }

          console.log(horasFormateadas);

            // Crear un nuevo objeto Chart y pasarle el canvas
            var ctx = document.getElementById('api_graph').getContext('2d');
            myChart = new Chart(ctx, {
                // Tipo de gráfico
                type: 'line',
                // Datos que se van a mostrar
                data: {
                    labels: horasFormateadas,
                    datasets: [{
                        label: 'Temperatura media (°C)',
                        data: temperaturas,
                        backgroundColor: '#fff', // Color de fondo
                        borderColor: ['rgba(227, 73, 73, 1)'], // Color del borde
                        borderWidth: 2, // Grosor del borde
                        tension: 0.4
                    }]
                },
                // Opciones de configuración
                options: {
                    responsive: true,
                    // maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: false,
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
                            // display: true,
                            // text: fecha[1],
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


          

          // console.log(fechaFormateada);
          $('#temperatura').text('Temperatura actual: ' + temperaturas[temperaturas.length-1] + '°C');
          })
          .fail(function (error) {
          console.log(error);
          });
    })
    .fail(function(error) {
      console.log(error);
    });
})()