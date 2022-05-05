import { makeRequest } from "./requests.js";

const user = localStorage.getItem('token');
if (!user) {
    window.location.href = 'login.html';
}

const serieID = (new URLSearchParams(window.location.search)).get('id');
if (serieID) {
    await makeRequest(`http://localhost:1337/api/series/${serieID}?populate=threads`, 'GET', null, {Authorization: `Bearer ${user}`}, printData);
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