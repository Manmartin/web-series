import { makeRequest } from "./requests.js";

function printData(data) {
  let threads = data.threads;
  threads = threads.sort((a, b) => a.serie.name.localeCompare(b.serie.name));

  let count = 0;
  let serieName = "";
  let div = "";
  const lista = document.getElementById("accordionExample");
  for (const thread of threads) {
    if (thread.serie.name !== serieName) {
      serieName = thread.serie.name;
      const title = document.createElement("h4");
      title.innerText = serieName;
      div = document.createElement("div");
      div.appendChild(title);
      lista.append(div);
    }
    const hilo = document.createElement("div");
    hilo.classList.add("accordion-item");
    hilo.innerHTML = `
        <h2 class="accordion-header" id="heading${count}">
          <button style="text-transform: capitalize;" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${count}" aria-expanded="true" aria-controls="collapse${count}">
            ${thread.name}
          </button>
        </h2>
        <div id="collapse${count}" class="accordion-collapse collapse${
      count === 0 ? "show" : " "
    }" aria-labelledby="heading${count}" data-bs-parent="#accordionExample">
          <div class="accordion-body">
          <a href="comments.html?id=${thread.id}">${thread.content}</a>
          </div>
        </div>
      `;
    div.appendChild(hilo);
    count++;
  }
}

const userToken = localStorage.getItem("token");
if (userToken) {
  await makeRequest(
    `http://localhost:1337/api/users/me`,
    "GET",
    null,
    { Authorization: `Bearer ${userToken}` },
    printData
  );
} else {
  window.location.href = "index.html";
}
