(function(){
  const ctx = document.getElementById('incendiosCV');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Castellón', 'Valencia', 'Alicante'],
      datasets: [{
        // label: 'Incendios',
        data: [637.25, 1170.75, 259.75],
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

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
      datasets: [{
        // label: 'Incendios',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80.50, 27.00, 877.25, 9.50, 6.00, 33.75, 88.75, 105.00, 45.50, 14.25, 39.00, 7.50, 461.25, 0],
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
      plugins: {
        title:{
          display: true,
          text: 'km² quemados cada año en la comunidad',
          font: {
            size: 18
          }
        },
        legend: {
          display: false
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