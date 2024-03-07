function mostrarPopup() {
    document.getElementById("popup").style.display = "block";
    // document.body.style.overflow = "hidden"; // Bloquea el scroll del fondo
}

function cerrarPopup() {
    document.getElementById("popup").style.display = "none";
    document.body.style.overflow = "auto"; // Permite el scroll del fondo
}

(function(){
    let selectedValueUrl = '';
    
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://opendata.aemet.es/opendata/api/observacion/convencional/datos/estacion/8416Y/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2YWxlbnNhdHByb2plY3RAZ21haWwuY29tIiwianRpIjoiODA4MDAzMzctOWFjZC00ODU0LTgxM2ItNWYyZjc5ZTIyYzUyIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2NzcwNjY3MjksInVzZXJJZCI6IjgwODAwMzM3LTlhY2QtNDg1NC04MTNiLTVmMmY3OWUyMmM1MiIsInJvbGUiOiIifQ.Ps7tu6zJexdHPBj36pLUwd9uLYE14lZLGxZi1lyQHqQ",
        "method": "GET",
        "headers": {
          "cache-control": "no-cache"
        }
      };
    
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
            const data = JSON.parse(response);
            console.log(data);  // Ver la respuesta parseada en la consola
            const temperatura = data[0].ta;
            console.log(temperatura);  // Ver la temperatura en la consola
    
            const temperaturas = [];
            const horas = [];
            for (var i = 0; i < data.length; i++) {
            temperaturas.push(data[i].ta);
            horas.push(data[i].fint);
            }
            console.log(temperaturas);  // Ver las temperaturas en la consola
            console.log(horas);  // Ver las horas en la consola
            
            const horasFormateadas = [];

            var currentDate = new Date();
            var offset = currentDate.getTimezoneOffset();
            console.log(offset);
            var offset_horas = - offset / 60;
            console.log(offset_horas);
    
            for (var i = 0; i < horas.length; i++) {
            const fecha = new Date(horas[i]);
            const dia = fecha.getDate();
            const mes = fecha.toLocaleString('default', { month: 'short' });
            const hora = fecha.getHours()+offset_horas;
            const horaFormateada = dia + ' ' + mes + '. ' + hora + 'h';
            horasFormateadas.push(horaFormateada);
            }
    
            console.log(horasFormateadas);
    
    
    
              // Crear un nuevo objeto Chart y pasarle el canvas
              const ctx = document.getElementById('seccion_aemet--api_graph').getContext('2d');
    
              Chart_api = new Chart(ctx, {
                  // Tipo de gráfico
                  type: 'line',
                  // Datos que se van a mostrar
                  data: {
                      labels: horasFormateadas,
                      datasets: [{
                          label: 'Temperatura media en las últimas 24 horas registradas (°C)',
                          data: temperaturas,
                          backgroundColor: '#fff', // Color de fondo
                          borderColor: ['rgba(227, 73, 73, 1)'], // Color del borde
                          borderWidth: 2, // Grosor del borde
                          tension: 0.4
                      }]
                  },
                  // Opciones de configuración
                  options: {
                      responsive: false,
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
                          },
                          legend: {
                            onClick: null
                          } 
                      }
                    }
              });
              
    
    
            
    
            // console.log(fechaFormateada);
            $('#seccion_aemet--tit').text('Último registro: ' + horasFormateadas[temperaturas.length-1]);
            $('#seccion_aemet--idema').text('Ind. climatológico: ' + data[temperaturas.length-1].idema);
            $('#seccion_aemet--ubi').text('Ubicación: ' + data[temperaturas.length-1].ubi);
            $('#seccion_aemet--lat').text('Latitud: ' + data[temperaturas.length-1].lat);
            $('#seccion_aemet--lon').text('Longitud: ' + data[temperaturas.length-1].lon);
            $('#seccion_aemet--alt').text('Altitud: ' + data[temperaturas.length-1].alt + ' m');

            $('#seccion_aemet--temperatura').text(data[temperaturas.length-1].ta + '°C');
            $('#seccion_aemet--temperatura_min').text(data[temperaturas.length-1].tamin + '°C');
            $('#seccion_aemet--temperatura_max').text(data[temperaturas.length-1].tamax + '°C');
            $('#seccion_aemet--hr').text(data[temperaturas.length-1].hr + '%');
            $('#seccion_aemet--precip').text(data[temperaturas.length-1].prec + ' mm');

            var trValue = data[temperaturas.length-1].tpr;
            var vvValue = data[temperaturas.length-1].vv;
            var dvValue = data[temperaturas.length-1].dv;

            var direccion;
            if (dvValue !== undefined) {
                if (dvValue === 0 || dvValue === 360) {
                    direccion = 'N';
                } else if (dvValue === 90) {
                    direccion = 'E';
                } else if (dvValue === 180) {
                    direccion = 'S';
                } else if (dvValue === 270) {
                    direccion = 'O';
                } else if (dvValue > 0 && dvValue < 90) {
                    direccion = 'NE';
                } else if (dvValue >= 90 && dvValue < 180) {
                    direccion = 'SE';
                } else if (dvValue >= 180 && dvValue < 270) {
                    direccion = 'SO';
                } else if (dvValue >= 270 && dvValue < 360) {
                    direccion = 'NO';
                }
            } else {
                direccion = '---';
            }

            if (trValue !== undefined) {
                $('#seccion_aemet--tr').text(trValue + '°C');
            } else {
                $('#seccion_aemet--tr').text('---');
            }

            if (vvValue !== undefined && !isNaN(vvValue)) {
                $('#seccion_aemet--vv').text((vvValue*3.6).toFixed(1) + ' km/h');
            } else {
                $('#seccion_aemet--vv').text('---');
            }

            $('#seccion_aemet--dv').text(direccion);

            })
            .fail(function (error) {
            console.log(error);
            });
            
      })
      .fail(function(error) {
        console.log(error);
      });
    
    
    function getChartData(codigo) {
    
        const settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://opendata.aemet.es/opendata/api/observacion/convencional/datos/estacion/"+codigo+"/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2YWxlbnNhdHByb2plY3RAZ21haWwuY29tIiwianRpIjoiODA4MDAzMzctOWFjZC00ODU0LTgxM2ItNWYyZjc5ZTIyYzUyIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2NzcwNjY3MjksInVzZXJJZCI6IjgwODAwMzM3LTlhY2QtNDg1NC04MTNiLTVmMmY3OWUyMmM1MiIsInJvbGUiOiIifQ.Ps7tu6zJexdHPBj36pLUwd9uLYE14lZLGxZi1lyQHqQ",
          "method": "GET",
          "headers": {
            "cache-control": "no-cache"
          }
        };
    
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
              const data = JSON.parse(response);
              console.log(data);  // Ver la respuesta parseada en la consola
              const temperatura = data[0].ta;
              console.log(temperatura);  // Ver la temperatura en la consola
    
              const temperaturas = [];
              const horas = [];
              for (var i = 0; i < data.length; i++) {
              temperaturas.push(data[i].ta);
              horas.push(data[i].fint);
              }
              console.log(temperaturas);  // Ver las temperaturas en la consola
              console.log(horas);  // Ver las horas en la consola
              
              const horasFormateadas = [];

              var currentDate = new Date();
              var offset = currentDate.getTimezoneOffset();
              console.log(offset);
              var offset_horas = - offset / 60;
              console.log(offset_horas);
    
              for (var i = 0; i < horas.length; i++) {
              const fecha = new Date(horas[i]);
              const dia = fecha.getDate();
              const mes = fecha.toLocaleString('default', { month: 'short' });
              const hora = fecha.getHours()+offset_horas;
              const horaFormateada = dia + ' ' + mes + '. ' + hora + 'h';
              horasFormateadas.push(horaFormateada);
              }
    
              console.log(horasFormateadas);
    
    
    
                // Crear un nuevo objeto Chart y pasarle el canvas
                const ctx = document.getElementById('seccion_aemet--api_graph').getContext('2d');
    
                Chart_api = new Chart(ctx, {
                    // Tipo de gráfico
                    type: 'line',
                    // Datos que se van a mostrar
                    data: {
                        labels: horasFormateadas,
                        datasets: [{
                            label: 'Temperatura media en las últimas 24 horas registradas (°C)',
                            data: temperaturas,
                            backgroundColor: '#fff', // Color de fondo
                            borderColor: ['rgba(227, 73, 73, 1)'], // Color del borde
                            borderWidth: 2, // Grosor del borde
                            tension: 0.4
                        }]
                    },
                    // Opciones de configuración
                    options: {
                        responsive: false,
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
                            },
                            legend: {
                                onClick: null
                            } 
                        }
                      }
                });
    
    
              
    
              // console.log(fechaFormateada);
             $('#seccion_aemet--tit').text('Último registro: ' + horasFormateadas[temperaturas.length-1]);
              $('#seccion_aemet--idema').text('Ind. climatológico: ' + data[temperaturas.length-1].idema);
              $('#seccion_aemet--ubi').text('Ubicación: ' + data[temperaturas.length-1].ubi);
              $('#seccion_aemet--lat').text('Latitud: ' + data[temperaturas.length-1].lat);
              $('#seccion_aemet--lon').text('Longitud: ' + data[temperaturas.length-1].lon);
              $('#seccion_aemet--alt').text('Altitud: ' + data[temperaturas.length-1].alt + ' m');

              $('#seccion_aemet--temperatura').text(data[temperaturas.length-1].ta + '°C');
              $('#seccion_aemet--temperatura_min').text(data[temperaturas.length-1].tamin + '°C');
              $('#seccion_aemet--temperatura_max').text(data[temperaturas.length-1].tamax + '°C');
              $('#seccion_aemet--hr').text(data[temperaturas.length-1].hr + '%');
              $('#seccion_aemet--precip').text(data[temperaturas.length-1].prec + ' mm');

            var trValue = data[temperaturas.length-1].tpr;
            var vvValue = data[temperaturas.length-1].vv;
            var dvValue = data[temperaturas.length-1].dv;

            var direccion;
            if (dvValue !== undefined) {
                if (dvValue === 0 || dvValue === 360) {
                    direccion = 'N';
                } else if (dvValue === 90) {
                    direccion = 'E';
                } else if (dvValue === 180) {
                    direccion = 'S';
                } else if (dvValue === 270) {
                    direccion = 'O';
                } else if (dvValue > 0 && dvValue < 90) {
                    direccion = 'NE';
                } else if (dvValue >= 90 && dvValue < 180) {
                    direccion = 'SE';
                } else if (dvValue >= 180 && dvValue < 270) {
                    direccion = 'SO';
                } else if (dvValue >= 270 && dvValue < 360) {
                    direccion = 'NO';
                }
            } else {
                direccion = '---';
            }

            if (trValue !== undefined) {
                $('#seccion_aemet--tr').text(trValue + '°C');
            } else {
                $('#seccion_aemet--tr').text('---');
            }

            if (vvValue !== undefined && !isNaN(vvValue)) {
                $('#seccion_aemet--vv').text((vvValue*3.6).toFixed(1) + ' km/h');
            } else {
                $('#seccion_aemet--vv').text('---');
            }

            $('#seccion_aemet--dv').text(direccion);


              })
              .fail(function (error) {
              console.log(error);
              });
        })
        .fail(function(error) {
          console.log(error);
        });
      }
      
    // Seleccionar el desplegable
    const select = document.getElementById("seccion_aemet--estaciones");
    
    // Asignar evento "change" al desplegable
    select.addEventListener("change", event => {
      // Obtener el valor seleccionado
      const selectedValue = event.target.value;
      codigo = selectedValue
    
      console.log(codigo)
    
      
      Chart_api.destroy()
      // Actualizar el gráfico con los datos del archivo JSON seleccionado
      getChartData(codigo);
    });
    
    })()
