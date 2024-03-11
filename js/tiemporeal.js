function mostrarPopup(id) {
    document.getElementById(id).style.display = "block";
    // document.body.style.overflow = "hidden"; // Bloquea el scroll del fondo
}

function cerrarPopup(id) {
    document.getElementById(id).style.display = "none";
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



function obtenerPrediccion(codigoEstacion) {
    // Extrae solo los números del código de estación
    const codigoNumerico = codigoEstacion.match(/\d+/)[0];
    
    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2YWxlbnNhdHByb2plY3RAZ21haWwuY29tIiwianRpIjoiODA4MDAzMzctOWFjZC00ODU0LTgxM2ItNWYyZjc5ZTIyYzUyIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2NzcwNjY3MjksInVzZXJJZCI6IjgwODAwMzM3LTlhY2QtNDg1NC04MTNiLTVmMmY3OWUyMmM1MiIsInJvbGUiOiIifQ.Ps7tu6zJexdHPBj36pLUwd9uLYE14lZLGxZi1lyQHqQ';
    const url = `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${codigoNumerico}/?api_key=${apiKey}`;
    
    fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.estado === 200) {
                // Aquí manejamos los datos obtenidos
                mostrarPrediccion(data.datos);
            } else {
                console.error('Error al obtener la predicción:', data.descripcion);
            }
        })
        .catch(error => console.error('Error de red:', error));
}

function mostrarPrediccion(urlDatos) {
    fetch(urlDatos)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Aquí reestructuramos los datos para facilitar la transposición
            let datosTranspuestos = [];
            for (let i = 0; i < 7; i++) { // Asumiendo que tienes 7 días
                let dia = data[0].prediccion.dia[i];
                const fecha = new Date(dia.fecha);
                const fechaFormateada = fecha.toLocaleDateString('es-ES', {weekday: 'short', day: 'numeric'});

                // Busca el primer valor de estadoCielo que no sea undefined
                let estadoCieloValor;
                for (let j = 0; j < 6; j++) { // Iteramos hasta el índice 5 (estadoCielo[5])
                    if (dia.estadoCielo[j] && dia.estadoCielo[j].value.trim().length > 0) {
                        estadoCieloValor = dia.estadoCielo[j].value;
                        break; // Salimos del bucle una vez que encontramos un valor válido
                    }
                }
                console.log(estadoCieloValor)

                datosTranspuestos.push({
                    fecha: fechaFormateada,
                    estadoCielo: estadoCieloValor,
                    probPrecipitacion: dia.probPrecipitacion[0].value + '%',
                    tempMin: dia.temperatura.minima + '°C',
                    tempMax: dia.temperatura.maxima + '°C'
                });
            }
            const estadoCieloImagenes = {
                "11": "../images/aemet_pred/11.png",
                "11n": "../images/aemet_pred/11n.png",
                "12": "../images/aemet_pred/12.png",
                "12n": "../images/aemet_pred/12n.png",
                "13": "../images/aemet_pred/13.png",
                "13n": "../images/aemet_pred/13n.png",
                "14": "../images/aemet_pred/14.png",
                "14n": "../images/aemet_pred/14n.png",
                "15": "../images/aemet_pred/15.png",
                "16": "../images/aemet_pred/16.png",
                "17": "../images/aemet_pred/17.png",
                "17n": "../images/aemet_pred/17n.png",
                "43": "../images/aemet_pred/43.png",
                "43n": "../images/aemet_pred/43n.png",
                "44": "../images/aemet_pred/44.png",
                "44n": "../images/aemet_pred/44n.png",
                "45": "../images/aemet_pred/45.png",
                "45n": "../images/aemet_pred/45n.png",
                "46": "../images/aemet_pred/46.png",
                "23": "../images/aemet_pred/23.png",
                "23n": "../images/aemet_pred/23n.png",
                "24": "../images/aemet_pred/24.png",
                "24n": "../images/aemet_pred/24n.png",
                "25": "../images/aemet_pred/25.png",
                "26": "../images/aemet_pred/26.png",
                "71": "../images/aemet_pred/71.png",
                "71n": "../images/aemet_pred/71n.png",
                "72": "../images/aemet_pred/72.png",
                "72n": "../images/aemet_pred/72n.png",
                "73": "../images/aemet_pred/73.png",
                "74": "../images/aemet_pred/74.png",
                "33": "../images/aemet_pred/33.png",
                "33n": "../images/aemet_pred/33n.png",
                "34": "../images/aemet_pred/34.png",
                "34n": "../images/aemet_pred/34n.png",
                "35": "../images/aemet_pred/35.png",
                "36": "../images/aemet_pred/36.png",
                "51": "../images/aemet_pred/51.png",
                "51n": "../images/aemet_pred/51n.png",
                "52": "../images/aemet_pred/52.png",
                "52n": "../images/aemet_pred/52n.png",
                "53": "../images/aemet_pred/53.png",
                "54": "../images/aemet_pred/54.png",
                "61": "../images/aemet_pred/61.png",
                "61n": "../images/aemet_pred/61n.png",
                "62": "../images/aemet_pred/62.png",
                "62n": "../images/aemet_pred/62n.png",
                "63": "../images/aemet_pred/63.png",
                "64": "../images/aemet_pred/64.png",
                "81": "../images/aemet_pred/81.png",
                "82": "../images/aemet_pred/82.png",
                "83": "../images/aemet_pred/83.png"
            };
            
            // Continuamos con la creación de la tabla transpuesta
            const tabla = document.getElementById('tablaPrediccion');
            // Vacía la tabla si ya existe
            while (tabla.firstChild) {
                tabla.removeChild(tabla.firstChild);
            }

            // Crea el encabezado de la tabla
            const encabezado = document.createElement('thead');
            const filaEncabezado = document.createElement('tr');
            
            // Aquí puedes añadir los encabezados de la tabla
            // Por ejemplo, los días de la semana
            for (let i = 0; i < datosTranspuestos.length; i++) {
                const celda = document.createElement('th');
                celda.textContent = datosTranspuestos[i].fecha;
                celda.classList.add('tablaPrediccion_aemet--header');
                filaEncabezado.appendChild(celda);
            }
            encabezado.appendChild(filaEncabezado);
            tabla.appendChild(encabezado);

            const celdaEncabezadoVacia = document.createElement('th');
            celdaEncabezadoVacia.textContent = ' '; // Texto vacío
            celdaEncabezadoVacia.classList.add('tablaPrediccion_aemet--header');
            filaEncabezado.insertBefore(celdaEncabezadoVacia, filaEncabezado.firstChild);

            // Crea el cuerpo de la tabla con los datos transpuestos
            const cuerpo = document.createElement('tbody');
            const tit = ['Estado del cielo', 'Prob. de precipitación', 'T. mínima', 'T. máxima']
            for (let j = 0; j < 4; j++) { // Asumiendo que tienes 4 tipos de datos
                let fila = document.createElement('tr');
                let celdaTitulo = document.createElement('td');
                celdaTitulo.colSpan = 0; // Ajusta el colSpan según sea necesario
                celdaTitulo.textContent = tit[j];
                celdaTitulo.classList.add('tablaPrediccion_aemet--celdatit');
                fila.appendChild(celdaTitulo);
                for (let i = 0; i < datosTranspuestos.length; i++) {
                    let celda = document.createElement('td');
                    // Aquí necesitas acceder a los datos transpuestos de la manera correcta
                    switch (j) {
                        case 0:
                            const imagen = document.createElement('img');
                            imagen.src = estadoCieloImagenes[datosTranspuestos[i].estadoCielo] || ''; // Imagen por defecto si no se encuentra
                            imagen.classList.add('iconos_prediccion');
                            celda.appendChild(imagen);
                            celda.classList.add('tablaPrediccion_aemet--fila1');
                            // celda.textContent = datosTranspuestos[i].estadoCielo;
                            break;
                        case 1:
                            celda.textContent = datosTranspuestos[i].probPrecipitacion;
                            celda.classList.add('tablaPrediccion_aemet--fila2');
                            break;
                        case 2:
                            celda.textContent = datosTranspuestos[i].tempMin;
                            celda.classList.add('tablaPrediccion_aemet--fila3');
                            break;
                        case 3:
                            celda.textContent = datosTranspuestos[i].tempMax;
                            celda.classList.add('tablaPrediccion_aemet--fila4');
                            break;
                    }
                    fila.appendChild(celda);
                }
                cuerpo.appendChild(fila);
            }
            tabla.appendChild(cuerpo);
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada');
    obtenerPrediccion('valencia-id46250');
    var selectElement = document.getElementById('seccion_aemet--estaciones_municipio');
    selectElement.addEventListener('change', function() {
        var codigoEstacion = this.value;
        if (codigoEstacion) {
            obtenerPrediccion(codigoEstacion);
        }
    });
});
