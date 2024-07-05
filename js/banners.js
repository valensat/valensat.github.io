(function(){
  const ctx = document.getElementById('incendiosCV');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Castellón', 'Valencia', 'Alicante'],
      datasets: [{
        // label: 'Incendios',
        data: [756.5, 1339.5, 298.25],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
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

              return label + ': ' + value.toFixed(2) + ' km² (' + percentage.toFixed(0) + '%)';
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
  const ctx = document.getElementById('incendiosCV_years');
  const backgroundColors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'];
  const labels = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
  const legendLabels = ['Castellón', 'Valencia', 'Alicante'];


  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Áreas quemadas (km²) por año',
        data: [0, 65.50, 63.00, 46.75, 71.25, 46.25, 34.50, 161.75, 0, 29.00, 81.75, 26.50, 873.75, 9.25, 7.00, 33.75, 81.25, 93.50, 45.00, 12.75, 15.75, 7.25, 462.25, 90.50],
        backgroundColor: ['#E48716'],
        borderColor: '#FDD48A',
        borderWidth: 2,
        hoverBorderColor: '#272525',
        borderRadius: 4,
        barPercentage: 1.1
      }],
      
    },
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





// LAND COVER
// (function(){
//   const ctx = document.getElementById('lcCV');

//   new Chart(ctx, {
//     type: 'doughnut',
//     data: {
//       labels: ['Castellónbjds', 'Valencia', 'Alicante'],
//       datasets: [{
//         // label: 'Incendios',
//         data: [756.5, 1339.5, 298.25],
//         backgroundColor: [
//           'rgb(255, 99, 132)',
//           'rgb(54, 162, 235)',
//           'rgb(255, 205, 86)'
//         ],
//         hoverOffset: 25,
//         hoverBorderColor: '#272525',
//       }]
//     },
//     options: {
//       layout: {
//         padding: {
//           right: 6
//         }
//       },
//       plugins: {
//         title:{
//           display: false,
//           text: 'km² quemados por provincia',
//           font: {
//             size: 18
//           }
//         },
//         legend: {
//           position: 'left',
//           labels: {
//             font: {
//               size: 16
//             }
//           }
//         },
//         tooltip: {
//           callbacks: {
//             label: function(context) {
//               var label = context.label || '';
//               var value = context.dataset.data[context.dataIndex] || 0;
//               var total = context.dataset.data.reduce(function(acc, cur) {
//                 return acc + cur;
//               }, 0);
//               var percentage = Math.round(value / total * 10000) / 100;

//               return label + ': ' + value.toFixed(2) + ' km² (' + percentage.toFixed(0) + '%)';
//             },
//             title: function() {
//               return '';
//             }
//           },
//           backgroundColor: 'rgba(36, 64, 114, 0.9)',
//           bodyFont: {
//             size: 13
//           },
//           padding: 8,
//           boxPadding: 4
//         }
//       }
//     }
//   });
// })();