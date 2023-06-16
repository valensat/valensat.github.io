(function(){
  const ctx = document.getElementById('incendiosCV');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Castellón', 'Valencia', 'Alicante'],
      datasets: [{
        // label: 'Incendios',
        data: [563.50, 986.25, 221.75],
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
  const ctx = document.getElementById('incendiosCV_years');
  const backgroundColors = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'];
  const labels = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
  const legendLabels = ['Castellón', 'Valencia', 'Alicante'];


  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        data: [0, 50.75, 44.75, 35.00, 57.75, 36.50, 30.25, 122.25, 0, 23.50, 63.25, 16.75, 670.75, 6.50, 3.50, 24.50, 64.75, 70.00, 35.75, 12.25, 11.25, 4.50, 349.75, 37.25],
        backgroundColor: [
          '#F2F2F0','rgb(255, 99, 132)','rgb(54, 162, 235)','rgb(54, 162, 235)','rgb(54, 162, 235)','rgb(54, 162, 235)','rgb(54, 162, 235)','rgb(255, 99, 132)','#F2F2F0','rgb(255, 99, 132)','rgb(54, 162, 235)','rgb(54, 162, 235)','rgb(54, 162, 235)','rgb(54, 162, 235)','rgb(255, 205, 86)','rgb(255, 205, 86)','rgb(54, 162, 235)','rgb(54, 162, 235)','rgb(54, 162, 235)','rgb(255, 205, 86)','rgb(54, 162, 235)','rgb(255, 99, 132)','rgb(255, 99, 132)','rgb(255, 99, 132)'],
          borderColor: '#ffffff',
          borderWidth: 2,
          hoverBorderColor: '#272525',
          borderRadius: 4,
          barPercentage: 1.1
      }],
      
    },
    options: {
      plugins: {
        title:{
          display: true,
          text: 'km² quemados cada año en la comunidad',
          font: {
            size: 18
          }
        },
        legend: {
          title: {
            display: true,
            text: 'Provincia con más áreas quemadas',
            font: {
              size: 13
            }
          },
          display: true,
          labels: {
            generateLabels: function() {
              const newLabels = [];
              backgroundColors.forEach((color, index) => {
                newLabels.push({
                  text: legendLabels[index],
                  fillStyle: color,
                  strokeStyle: '#ffffff',
                  lineWidth: 2
                });
              });
              return newLabels;
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