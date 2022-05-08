import { makeRequest } from "./requests.js";

function printData(data) {
    console.log(data);
    return;
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

const userToken = localStorage.getItem('token');
if (userToken) {
    await makeRequest(`http://localhost:1337/api/users/me`, 'GET', null, {Authorization: `Bearer ${userToken}`}, printData);
} else {
    window.location.href = 'index.html';
}