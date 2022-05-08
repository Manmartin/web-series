import { makeRequest } from "./requests.js";


const form = document.getElementById("comment-form")
form.addEventListener('submit', (e) => {
    e.preventDefault()
    sendData(form)
})

async function sendData(form) {
    try {
        const formData = new FormData(form);
        const data = {"data": {}}
        var queryString = new URLSearchParams(formData)

        data.data.content = queryString.get('content');
        data.data.thread = threadID;
        data.data.users_permissions_user = localStorage.getItem('userID');

        await makeRequest('http://localhost:1337/api/comments', 'POST', JSON.stringify(data),  {"Content-Type" : "application/json" ,"Authorization": `Bearer ${userToken}`}, putComment);
    } catch (error) {
        console.log(error)
    }
}

function putComment(data) {
    const comment = data.data.attributes;
    const text = document.createElement('h3');
    text.innerText = comment.content;
    document.body.appendChild(text);
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
}


const user = localStorage.getItem('token');
if (!user) {
    window.location.href = 'login.html';
}

const threadID = (new URLSearchParams(window.location.search)).get('id');
if (threadID) {
    await makeRequest(`http://localhost:1337/api/threads/${threadID}?populate=comments`, 'GET', null, {Authorization: `Bearer ${user}`}, printData);
} else {
    window.location.href = 'index.html';
}
