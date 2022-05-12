async function makeRequest(url, method="GET", params=null, headers={}, func) {
    try {
        const response = await fetch(url, {
            method: method,
            body: params,
            headers: headers
        });
        if (!response.ok) {
            const message = `Error: ${response.status}`;
            throw new Error(message);
        }
        if (func) {
            const data = await response.json();
            func(data);
        }
    } catch (error) {
        console.log(error);
    }
  }


function printData(data) {
    let series = data.series;

    const lista = document.getElementById("lista");
    let counter = 0;
    let container = document.createElement('div');
    let row = document.createElement('div');
    for (const seriesData of series) {
      if (counter % 3 == 0) {
        lista.appendChild(container);
        container.classList.add('container');
        row.classList.add('row');
        container.appendChild(row);
      }
      const div = document.createElement('div');
      div.classList.add("col-lg-4");
      div.classList.add("mb-4");
      
      div.innerHTML = `
      <div class="card">
      <img src="${"http://localhost:1337" + seriesData.image.url}" alt="" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${seriesData.name}</h5>
          <p  class="card-text pr-4">${seriesData.air_date}-${seriesData.finished ? seriesData.end_date :"Presente"}
          <span class="text-secondary">${seriesData.rating}/10</span></p>
          <p class="card-text">${seriesData.resume}</p>
          <a href="threads.html?id=${seriesData.id}" class="btn btn-outline-success btn-sm">Lee los hilos</a>
        </div>
      </div>
      `
      row.appendChild(div);
      counter++;
    }
/*
    for (const thread of threads) {
        if (thread.serie.name !== serieName) {
            serieName = thread.serie.name;
            const title = document.createElement('h1');
            title.innerText = serieName
            div = document.createElement('div');
            div.appendChild(title);
            document.body.append(div);
        }
        const link = document.createElement('a');
        link.href = `comments.html?id=${thread.id}`;
        const name = document.createElement('h3');
        name.innerText = thread.name;
        const content = document.createElement('h4');
        content.innerText = thread.content;
        
        const br = document.createElement('br');
        link.appendChild(name);
        link.appendChild(content);
        div.appendChild(link);
        div.appendChild(br);
    }
    */
}

const userToken = localStorage.getItem('token');
if (userToken) {
    await makeRequest(`http://localhost:1337/api/users/me`, 'GET', null, {Authorization: `Bearer ${userToken}`}, printData);
} else {
    window.location.href = "login.html";
}
