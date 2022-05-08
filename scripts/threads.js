import { makeRequest } from "./requests.js";

const form = document.getElementById("post-form")
form.addEventListener('submit', (e) => {
    e.preventDefault()
    sendData(form)
})

async function sendData(form) {
    try {
        const formData = new FormData(form);
        const data = {"data": {}}
        var queryString = new URLSearchParams(formData)

        data.data.name = queryString.get('name');
        data.data.content = queryString.get('content');
        data.data.serie = serieID;
        data.data.users_permissions_user = localStorage.getItem('userID');

        await makeRequest('http://localhost:1337/api/threads', 'POST', JSON.stringify(data),  {"Content-Type" : "application/json" ,"Authorization": `Bearer ${userToken}`}, putThread);
    } catch (error) {
        console.log(error)
    }
}



function putThread(data) {
    const thread = data.data.attributes;

    const link = document.createElement('a');
    link.href = `comments.html?id=${data.data.id}`;
    const name = document.createElement('h2');
    name.innerText = thread.name;
    const content = document.createElement('h2');
    content.innerText = thread.content;

    link.appendChild(name);
    link.appendChild(content);
    document.body.appendChild(link);
}

function printData(data) {
    let threads = data.data.attributes.threads.data;
    for (const thread of threads) {
        const link = document.createElement('a');
        link.href = `comments.html?id=${thread.id}`;
        const name = document.createElement('h2');
        name.innerText = thread.attributes.name;
        const content = document.createElement('h2');
        content.innerText = thread.attributes.content;
    
        link.appendChild(name);
        link.appendChild(content);
        document.body.appendChild(link);
    }
}


const serieID = (new URLSearchParams(window.location.search)).get('id');
if (serieID) {
    await makeRequest(`http://localhost:1337/api/series/${serieID}?populate=threads`, 'GET', null, {Authorization: `Bearer ${userToken}`}, printData);
} else {
    window.location.href = 'index.html';
}