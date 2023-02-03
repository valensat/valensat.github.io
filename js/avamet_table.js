fetch('../data/AVAMET/12h_avamet.json')
.then(function(response){
    return response.json();
})
.then(function(products){
    let placeholder = document.querySelector('#tabla_avamet');
    let out = '';
    for(let product of products){
        out += `
            <tr class="tr_avamet">
                <td class="td_avamet">${product.estacio}</td>
                <td class="td_avamet">${product.altitud}</td>
                <td class="td_avamet">${product.T}</td>
                <td class="td_avamet">${product.Tm}</td>
                <td class="td_avamet">${product.TM}</td>
                <td class="td_avamet">${product.Prosada}</td>
                <td class="td_avamet">${product.Wind}</td>
                <td class="td_avamet">${product.HR}</td>
                <td class="td_avamet">${product.Precip}</td>
                <td class="td_avamet">${product.Intensitat_precip}</td>
                <td class="td_avamet">${product.Vent}</td>
                <td class="td_avamet">${product.Direccio}</td>
                <td class="td_avamet">${product.VentMaxim}</td>
            </tr>
        `
    }

    placeholder.innerHTML = out;
})