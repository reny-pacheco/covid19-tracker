
const formatNumber = new Intl.NumberFormat('en');

fetch("https://coronavirus-19-api.herokuapp.com/all")
    .then(res => {
        if (res.status !== 200){
            console.log('Opps,,, There was a problem, Status Code: ' + res.status);
            return;
        }

        //if there is no error
        res.json().then(data => {

          

            

            let globalCase = document.querySelector('.global-case');
            let globalDeath = document.querySelector('.global-death');
            let globalrecovered = document.querySelector('.global-recovered');


            globalCase.innerHTML = formatNumber.format(data.cases);
            globalDeath.innerHTML = formatNumber.format(data.deaths);
            globalrecovered.innerHTML = formatNumber.format(data.recovered);

            // console.log(data);

            
        });
    })
    .catch(err => console.log('Fetch error.. ',err));

    fetch("https://coronavirus-19-api.herokuapp.com/countries")
    .then(res => {
        if (res.status !== 200){
            console.log('Opps,,, There was a problem, Status Code: ' + res.status);
            return;
        }

        //if there is no error
        res.json().then(data => {

         var dataTable = document.querySelector('.content-here');
          var content = "";
          let dataLength = data.length-1;

          for(let i = 1; i < dataLength; i++) {
            content += `
            <tbody class="text-center">
                  <tr class="count">
                    <td class="text-left font-weight-bold">${data[i].country}</td>
                    <td class="text-success font-weight-bold">${formatNumber.format(data[i].recovered)}</td>
                    <td class="text-danger font-weight-bold">${formatNumber.format(data[i].deaths)}</td>
                    <td class="text-primary font-weight-bold">${formatNumber.format(data[i].cases)}</td>
                  </tr>
                </tbody>
            `;
          }
          dataTable.innerHTML = content;
          console.log(data)

          let searchBtn = document.querySelector('#search');

          searchBtn.addEventListener('keyup', searchCountry);

          function searchCountry(){

            let searchVal = searchBtn.value.toLowerCase();
            let search = document.querySelector('.searchedItem');
            var searchValue = '';
            
            for(let i = 0; i < dataLength; i++){
              if (data[i].country.toLowerCase().includes(searchVal) && searchVal != "") {
                console.log(data[i].country,data[i].cases);
                
                searchValue += `
                <div class="row mx-auto d-flex justify-content-around my-2 country-data">
                <div class="col-xs-8  my-2">
                    <h6 class="text-light my-2">${data[i].country}</h6>
                    <ul class="list-group mx-0 mb-2">
                        <li class="case p-2 text-light list-group-item d-flex justify-content-between align-items-center">
                          Case
                            <span class="text-primary font-weight-bold ">${formatNumber.format(data[i].cases)}</span>
                        </li>
                        <li class="p-2 text-light list-group-item d-flex justify-content-between align-items-center">
                          Deaths
                            <span class="text-danger font-weight-bold ">${formatNumber.format(data[i].deaths)}</span>
                        </li>
                        <li class="p-2 text-light list-group-item d-flex justify-content-between align-items-center">
                          Recovered
                            <span class="text-success font-weight-bold ">${formatNumber.format(data[i].recovered)}</span>
                        </li>
                        <li class="p-2 text-light list-group-item d-flex justify-content-between align-items-center textsm  ">
                            _ Today Deaths
                            <span class="text-danger font-weight-bold textsm">${formatNumber.format(data[i].todayDeaths)}</span>
                        </li>
                        <li class="p-2 text-light list-group-item d-flex justify-content-between align-items-center textsm">
                            _ Today Cases
                            <span class="text-success font-weight-bold textsm">${formatNumber.format(data[i].todayCases)}</span>
                        </li>
                      </ul>
                </div>
                  <div class="col-xs-4 chart my-2">
                      <h6 class="text-light m-auto text-center">This is for the Chart</h6>
                  </div>
              </div>
                `;

              }
              search.innerHTML = searchValue;
            }
            

          }

        });
    })
    .catch(err => console.log('Fetch error.. ',err));

    

    

    