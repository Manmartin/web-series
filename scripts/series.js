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

async function sendData() {
  try {
    const response = await fetch(
      "http://localhost:1337/api/series?populate=image&populate=users"
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

function getAllUsers(users) {
  let userlist = []
  for (const user of users) {
    userlist.push(user.id);
  }
  return userlist;
}

async function addFavorite(serie, user, userList) {
  try {
    userList = userList.split(',');
    if (userList[0] == '')
      userList = [];
    userList.push(user);
    const data = {
        "data": {
          "users": userList
        }
    }

    await makeRequest(`http://localhost:1337/api/series/${serie}`, 'PUT', JSON.stringify(data), {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`
    });
    window.location.href = 'series.html';
} catch (error) {
    console.log(error)
}
}

async function removeFavorite(serie, user, userList) {
  try {

    userList = userList.split(',');
    let index = userList.indexOf(`${user}`);
    if (index < 0)
      return;
    userList.splice(index, 1);
    const data = {
        "data": {
          "users": userList
        }
    }

    await makeRequest(`http://localhost:1337/api/series/${serie}`, 'PUT', JSON.stringify(data), {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`
    });
    window.location.href = 'series.html';
} catch (error) {
    console.log(error)
}
}

function printData(data) {
  const lista = document.getElementById("lista");
  const current_user = parseInt(localStorage.getItem('userID'));
  

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
    let userList = getAllUsers(seriesData.attributes.users.data);
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
        ${(userList.includes(current_user) ?  `<button onclick="removeFavorite(${seriesData.id}, ${current_user}, '${userList}')" class="btn btn-outline-danger btn-sm">&#10060;</button>` : `<button onclick="addFavorite(${seriesData.id}, ${current_user}, '${userList}')" class="btn btn-outline-warning btn-sm">&#11088;</button>`)}
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
