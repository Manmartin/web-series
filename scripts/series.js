async function sendData() {
  try {
    const response = await fetch(
      "http://localhost:1337/api/series?populate=image"
    );

    if (!response.ok) {
      const message = `Error: ${response.status}`;

      throw new Error(message);
    }

    const data = await response.json();
    printData(data.data);
  } catch (error) {
    console.log(error);
  }
}

function printData(data) {
  const lista = document.getElementById("lista");

  for (const seriesData of data) {
    const serieBox = document.createElement("div");

    serieBox.classList.add("serieBox");

    const serieName = document.createElement("h4");
    const serieAirDating = document.createElement("p");
    const serieFinish = document.createElement("p");
    const serieRating = document.createElement("p");
    const serieImg = document.createElement("img");

    serieName.textContent = seriesData.attributes.name;
    serieAirDating.textContent = seriesData.attributes.air_date;
    serieFinish.textContent = seriesData.attributes.finished
      ? "Terminada"
      : "En emision";
    serieRating.textContent = seriesData.attributes.rating + "/10";
    console.log();
    serieImg.src =
      "http://localhost:1337" +
      seriesData.attributes.image.data.attributes.formats.thumbnail.url;

    serieBox.appendChild(serieName);
    serieBox.appendChild(serieAirDating);
    serieBox.appendChild(serieFinish);
    serieBox.appendChild(serieRating);
    serieBox.appendChild(serieImg);

    lista.appendChild(serieBox);
  }
}

function redirect(url) {
  window.location.href = url;
}

let token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'index.html';
}

sendData();
