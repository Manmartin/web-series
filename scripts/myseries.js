import { makeRequest } from "./requests.js";

function printData(data) {
    let series = data.series;
    series = series.sort((a, b) => a.localeCompare(b));
    console.log(series);

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
    window.location.href = 'index.html';
}
