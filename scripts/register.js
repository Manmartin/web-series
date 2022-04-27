import { makeRequest } from "./requests.js";

checkToken()

const form = document.getElementById('form')
form.addEventListener ('submit', (e) => {
    e.preventDefault();
    sendData(form)
})

async function sendData(form) {
    console.log(form);
    try {
        const formData = new FormData(form)
        const queryString = new URLSearchParams(formData).toString()

        makeRequest('http://localhost:1337/api/auth/local/register', "POST", queryString, { "Content-Type" : "application/x-www-form-urlencoded" ,}, doLogin)
    } catch (error) {
        console.log(error)
    }
}

function doLogin(data) {
    localStorage.setItem("token", data.jwt);
    window.location.href = "series.html"
}

function checkToken() {
    const token = localStorage.getItem("token");

    if (token) {
        window.location.href = "index.html"
    }
}