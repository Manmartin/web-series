async function sendData() {
  try {
    const response = await fetch(
      "http://localhost:1337/api/series?populate=image"
    );

    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();
    printData(data.data);
  } catch (error) {
    console.log(error);
  }
}

function printData(data) {
  const lista = document.getElementById("lista");

  let counter = 0;
  let container = document.createElement('div');
  let row = document.createElement('div');
  for (const seriesData of data) {
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
      <img src="${"http://localhost:1337" + seriesData.attributes.image.data.attributes.url}" alt="" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${seriesData.attributes.name}</h5>
        <p  class="card-text pr-4">${seriesData.attributes.air_date}-${seriesData.attributes.finished ? seriesData.attributes.end_date :"Presente"}
        <span class="text-secondary">${seriesData.attributes.rating}/10</span></p>
        <p class="card-text">${seriesData.attributes.resume}</p>
        <a href="threads.html?id=${seriesData.id}" class="btn btn-outline-success btn-sm">Lee los hilos</a>
        <button href="" class="btn btn-outline-warning btn-sm">&#11088;</button>
      </div>
    </div>
    `
    row.appendChild(div);
    counter++;
  }
}

function redirect(url) {
  window.location.href = url;
}

let token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'login.html';
}

sendData();
