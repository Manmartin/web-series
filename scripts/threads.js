import {
    makeRequest
} from "./requests.js";

const numbers = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'eleven'];


const form = document.getElementById("post-form")
form.addEventListener('submit', (e) => {
    e.preventDefault()
    sendData(form)
})

async function sendData(form) {
    try {
        const formData = new FormData(form);
        const data = {
            "data": {}
        }
        var queryString = new URLSearchParams(formData)

        data.data.name = queryString.get('name');
        data.data.content = queryString.get('content');
        data.data.serie = serieID;
        data.data.users_permissions_user = localStorage.getItem('userID');

        await makeRequest('http://localhost:1337/api/threads', 'POST', JSON.stringify(data), {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
        }, putThread);
    } catch (error) {
        console.log(error)
    }
}



function putThread(data) {
    

    const lista = document.getElementById('accordionExample');
    const div = document.createElement('div')
    const thread = data.data.attributes;

    div.classList.add("accordion-item");
    div.innerHTML = `
    <h2 class="accordion-header" id="heading${count}">
      <button style="text-transform: capitalize;" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${count}" aria-expanded="true" aria-controls="collapse${count}">
        ${thread.name}
      </button>
    </h2>
    <div id="collapse${count}" class="accordion-collapse collapse" aria-labelledby="heading${count}" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <a href="comments.html?id=${data.data.id}">${thread.content}</a>
      </div>
    </div>
  `
    count++;
    lista.appendChild(div);
}


/* Preguntar por paginacion */

let count = 0;

function printData(data) {
    const lista = document.getElementById('accordionExample');

    let threads = data.data.attributes.threads.data;
    for (const thread of threads) {
        const div = document.createElement('div');
        div.classList.add("accordion-item");
        div.innerHTML = `
        <h2 class="accordion-header" id="heading${count}">
          <button style="text-transform: capitalize;" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${count}" aria-expanded="true" aria-controls="collapse${count}">
            ${thread.attributes.name}
          </button>
        </h2>
        <div id="collapse${count}" class="accordion-collapse collapse${ count === 0 ? 'show' : " "}" aria-labelledby="heading${count}" data-bs-parent="#accordionExample">
          <div class="accordion-body">
          <a href="comments.html?id=${thread.id}">${thread.attributes.content}</a>
          </div>
        </div>
      `
        lista.appendChild(div);
        count++;
    }
}


const serieID = (new URLSearchParams(window.location.search)).get('id');
if (serieID) {
    await makeRequest(`http://localhost:1337/api/series/${serieID}?populate=threads`, 'GET', null, {
        Authorization: `Bearer ${userToken}`
    }, printData);
} else {
    window.location.href = 'index.html';
}