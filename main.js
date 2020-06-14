

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


            globalCase.innerHTML = data.cases;
            globalDeath.innerHTML = data.deaths;
            globalrecovered.innerHTML = data.recovered;

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
                    <td class="text-success font-weight-bold">${data[i].recovered}</td>
                    <td class="text-danger font-weight-bold">${data[i].deaths}</td>
                    <td class="text-primary font-weight-bold">${data[i].cases}</td>
                  </tr>
                </tbody>
            `;
          }
          dataTable.innerHTML = content;
          // console.log(data)
        });
    })
    .catch(err => console.log('Fetch error.. ',err));

    let list = document.querySelector('.count');
    console.log(list);
    

    