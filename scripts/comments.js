import { makeRequest } from "./requests.js";

const user = localStorage.getItem('token');
if (!user) {
    window.location.href = 'login.html';
}

const threadID = (new URLSearchParams(window.location.search)).get('id');
if (threadID) {
    await makeRequest(`http://localhost:1337/api/threads/${threadID}?populate=comments`, 'GET', null, {Authorization: `Bearer ${user}`}, printData);
}

function printData(data) {
    let thread = data.data.attributes;
    
    const title = document.createElement('h2');
    title.innerText = thread.name;
    const content = document.createElement('h2');
    content.innerText = thread.content;
    document.body.appendChild(title);
    document.body.appendChild(content);

    const comments = data.data.attributes.comments.data;
    for (const comment of comments){
        const text = document.createElement('h3');
        text.innerText = comment.attributes.content;
        document.body.appendChild(text);
    }
    console.log(data);
}