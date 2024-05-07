// ############################## GRÁFICA CONTAMINACIÓN RVVCCA ############################### //
(function(){
    const datos = '../data/Contaminacion/cont2023.csv'

    d3.csv(datos).then(function(datapoints) {
        const fecha = [];
        const PM25 = [];
        const PM10 = [];
        const SO2 = [];
        const NO = [];
        const NO2 = [];
        const O3 = [];

        for (i = 0; i < datapoints.length; i++) {
            fecha.push(datapoints[i].FECHA)
            PM25.push(datapoints[i].PM25)
            PM10.push(datapoints[i].PM10)
            SO2.push(datapoints[i].SO2)
            NO.push(datapoints[i].NO)
            NO2.push(datapoints[i].NO2)
            O3.push(datapoints[i].O3)
        }

        const data_graph_cont = {
            labels: fecha,
            datasets: [{
                label: 'PM-2.5',
                data: PM25,
                backgroundColor: ['#B9848C80'],
                borderColor: ['#B9848C'],
                borderWidth: 2,
                tension: 0.3,
                // fill: '-1'
                // yAxisID: 'PM25'
            },{
                label: 'PM-10',
                data: PM10,
                backgroundColor: ['#80649180'],
                borderColor: ['#806491'],
                borderWidth: 2,
                tension: 0.3,
                // fill: '-1'
                // yAxisID: 'PM10'
            },{
                label: 'SO₂',
                data: SO2,
                backgroundColor: ['#BC204180'],
                borderColor: ['#BC2041'],
                borderWidth: 2,
                tension: 0.3,
                // fill: '-1'
                // yAxisID: 'y'
            },{
                label: 'NO',
                data: NO,
                backgroundColor: ['#778D4580'],
                borderColor: ['#778D45'],
                borderWidth: 2,
                tension: 0.3,
                // fill: '-1'
                // yAxisID: 'NO'
            },{
                label: 'NO₂',
                data: NO2,
                backgroundColor: ['#F7C81580'],
                borderColor: ['#F7C815'],
                borderWidth: 2,
                tension: 0.3,
                // fill: '-1'
                // yAxisID: 'NO2'
            },{
                label: 'O₃',
                data: O3,
                backgroundColor: ['#378BA480'],
                borderColor: ['#378BA4'],
                borderWidth: 2,
                tension: 0.3,
                // fill: '-1'
                // yAxisID: 'O3'
            }]
        };
        
        const config = {
            type: 'line',
            data: data_graph_cont,
            options: {
                responsive: true,
                scales: {
                    x: {
                        // display: false,
                    },
                    y: {
                        beginAtZero: true,
                        type: 'linear',
                        position: 'left',
                        min: 0,
                        // max: 110,
                        ticks: {
                            callback: function(value) {
                                return `${value}.0 µg/m3`
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        yAlign: 'bottom',
                        // displayColors: false,
                        backgroundColor: 'rgba(240, 248, 255, 0.8)',
                        titleColor: 'rgb(28, 37, 44)',
                        titleFont: {weight: 'bold', family: 'Arial', size: 14},
                        titleAlign: 'center',
                        titleMarginBottom: 1,
                        bodyColor: 'rgb(28, 37, 44)',
                        bodyFont: {family: 'Arial', size: 14},
                        caretSize: 12
                    },
                    title: {
                        display: true,
                        text: 'Registro del año 2023 en la estación de Víveros, Valencia'
                    }
                }
            }
        };
        
        const cont_chart = new Chart(
            document.getElementById('graph_contaminacion'),
            config
        );
        

        // const data_graph_cont = {
        //     labels: fecha,
        //     datasets: [{
        //         label: 'PM-2.5',
        //         data: PM25,
        //         backgroundColor: ['rgba(247, 200, 21, .2)'],
        //         borderColor: ['rgba(227, 73, 73, 1)'],
        //         borderWidth: 2,
        //         // tension: 0.3,
        //         yAxisID: 'y'
        //     }
        //     ,{
        //         label: 'PM10',
        //         data: PM10,
        //         backgroundColor: ['rgba(247, 200, 21, .2)'],
        //         borderColor: ['rgba(227, 73, 73, 1)'],
        //         borderWidth: 2,
        //         tension: 0.3,
        //         // yAxisID: 'y'
        //     },{
        //         label: 'SO2',
        //         data: SO2,
        //         backgroundColor: ['rgba(247, 200, 21, .2)'],
        //         borderColor: ['rgba(227, 73, 73, 1)'],
        //         borderWidth: 2,
        //         tension: 0.3,
        //         // yAxisID: 'y'
        //     },{
        //         label: 'NO',
        //         data: NO,
        //         backgroundColor: ['rgba(247, 200, 21, .2)'],
        //         borderColor: ['rgba(227, 73, 73, 1)'],
        //         borderWidth: 2,
        //         tension: 0.3,
        //         // yAxisID: 'y'
        //     },{
        //         label: 'NO2',
        //         data: NO2,
        //         backgroundColor: ['rgba(247, 200, 21, .2)'],
        //         borderColor: ['rgba(227, 73, 73, 1)'],
        //         borderWidth: 2,
        //         tension: 0.3,
        //         // yAxisID: 'y'
        //     },{
        //         label: 'O3',
        //         data: O3,
        //         backgroundColor: ['rgba(247, 200, 21, .2)'],
        //         borderColor: ['rgba(227, 73, 73, 1)'],
        //         borderWidth: 2,
        //         tension: 0.3,
        //         // yAxisID: 'y'
        //     }
        // ]
        // };

        // const config = {
        //     type: 'line',
        //     data_graph_cont,
        //     options: {
        //         responsive: true
        //     }
        // };

        // const cont_chart = new Chart(
        //     document.getElementById('graph_contaminacion'),
        //     config
        // );


    })
})();
// ###################################################################################### //