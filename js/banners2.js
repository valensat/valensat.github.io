(function(){
  const ctx = document.getElementById('lcCV');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Agua', 'Área Urbana', 'Veg. Densa', 'Veg. Dispersa', 'Otro'],
      datasets: [{
        // label: 'Incendios',
        data: [116.7, 908.57, 14437.68, 7762.19, 30.7],
        backgroundColor: [
          '#2F70AF', '#BC2041', '#6D8C00', '#E3C515', '#AAABA8'
        ],
        hoverOffset: 25,
        hoverBorderColor: '#272525',
      }]
    },
    options: {
      layout: {
        padding: {
          right: 6
        }
      },
      plugins: {
        title:{
          display: false,
          text: 'km² quemados por provincia',
          font: {
            size: 18
          }
        },
        legend: {
          position: 'left',
          labels: {
            font: {
              size: 16
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              var label = context.label || '';
              var value = context.dataset.data[context.dataIndex] || 0;
              var total = context.dataset.data.reduce(function(acc, cur) {
                return acc + cur;
              }, 0);
              var percentage = Math.round(value / total * 10000) / 100;

              return label + ': ' + value.toFixed(2) + ' km² (' + percentage.toFixed(2) + '%)';
            },
            title: function() {
              return '';
            }
          },
          backgroundColor: 'rgba(36, 64, 114, 0.9)',
          bodyFont: {
            size: 13
          },
          padding: 8,
          boxPadding: 4
        }
      }
    }
  });
})();


(function(){
  const ctx = document.getElementById('lcCV_years');
  const backgroundColors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'];
  const labels = ['1985', '1990', '1995', '2000', '2005', '2010', '2015', '2020'];
  const legendLabels = ['Castellón', 'Valencia', 'Alicante'];


  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Área urbana (km²) por año',
        data: [2.08, 3.02, 3.27, 3.39, 3.65, 3.69, 3.74, 3.91],
        backgroundColor: ['#BC204160'],
        borderColor: '#BC2041',
        borderWidth: 2,
        hoverBorderColor: '#272525',
        borderRadius: 4,
        barPercentage: 1.1,
        tension: 0.2
      }],
    },
    // data: {
    //   datasets: [{
    //       type: 'bar',
    //       label: 'Bar Dataset',
    //       data: [96.91, 95.88, 95.64, 95.94, 95.46, 95.69, 95.47, 95.46]
    //   }, {
    //       type: 'line',
    //       label: 'Line Dataset',
    //       data: [2.08, 3.02, 3.27, 3.39, 3.65, 3.69, 3.74, 3.91],
    //   }],
    //   labels: ['1985', '1990', '1995', '2000', '2005', '2010', '2015', '2020']
    // },
    options: {
      plugins: {
        title:{
          display: false,
          text: 'km² quemados por año',
          font: {
            size: 18
          }
        },
        legend: {
          title: {
            display: false,
            text: 'Provincia con más áreas quemadas',
            font: {
              size: 13
            }
          },
          // labels: {
          //   generateLabels: function() {
          //     const newLabels = [];
          //     backgroundColors.forEach((color, index) => {
          //       newLabels.push({
          //         text: legendLabels[index],
          //         fillStyle: color,
          //         strokeStyle: '#ffffff',
          //         lineWidth: 2
          //       });
          //     });
          //     return newLabels;
          //   }
          // }
        },
        tooltip: {
          // callbacks: {
          //   label: function(context) {
          //     var label = context.label || '';
          //     var value = context.dataset.data[context.dataIndex] || 0;
          //     var total = context.dataset.data.reduce(function(acc, cur) {
          //       return acc + cur;
          //     }, 0);
          //     var percentage = Math.round(value / total * 10000) / 100;

          //     return label + ': ' + value.toFixed(2) + ' km² (' + percentage.toFixed(2) + '%)';
          //   },
          //   title: function() {
          //     return '';
          //   }
          // },
          backgroundColor: 'rgba(36, 64, 114, 0.9)',
          bodyFont: {
            size: 13
          },
          padding: 8,
          boxPadding: 4
        }
      }
    }
  });
})();