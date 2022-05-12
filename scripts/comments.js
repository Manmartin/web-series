import { makeRequest } from "./requests.js";

const form = document.getElementById("comment-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData(form);
});

async function sendData(form) {
  try {
    const formData = new FormData(form);
    const data = { data: {} };
    var queryString = new URLSearchParams(formData);

    data.data.content = queryString.get("content");
    data.data.thread = threadID;
    data.data.users_permissions_user = localStorage.getItem("userID");

    await makeRequest(
      "http://localhost:1337/api/comments",
      "POST",
      JSON.stringify(data),
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      putComment
    );
  } catch (error) {
    console.log(error);
  }
}

function putComment(data) {
  const comment = data.data.attributes;
  const text = document.createElement("p");
  const div = document.getElementById("espacio");
  text.innerText = comment.content;
  div.appendChild(text);
}

function printData(data) {
  let thread = data.data.attributes;
  const div = document.getElementById("espacio");
  const title = document.createElement("p");
  title.innerText = thread.name;
  const content = document.createElement("p");
  content.innerText = thread.content;
  const hr = document.createElement('hr');
  div.appendChild(title);
  div.appendChild(content);
  div.appendChild(hr);

  const comments = data.data.attributes.comments.data;
  for (const comment of comments) {
    const text = document.createElement("p");
    text.innerText = comment.attributes.content;
    div.appendChild(text);
  }
}

const user = localStorage.getItem("token");
if (!user) {
  window.location.href = "login.html";
}

const threadID = new URLSearchParams(window.location.search).get("id");
if (threadID) {
  await makeRequest(
    `http://localhost:1337/api/threads/${threadID}?populate=comments`,
    "GET",
    null,
    { Authorization: `Bearer ${user}` },
    printData
  );
} else {
  window.location.href = "index.html";
}
