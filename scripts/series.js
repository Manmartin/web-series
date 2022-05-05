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
    const link = document.createElement('a');

    link.href = `threads.html?id=${seriesData.id}`;
    link.classList.add('link-serie');
    const serieBox = document.createElement("div");
    serieBox.classList.add("card");

    serieBox.classList.add("serieBox");

    const serieName = document.createElement("h4");
    serieName.classList.add("card-title");
    const serieImg = document.createElement("img");
    serieImg.classList.add("card-img-top");
    const serieAirDating = document.createElement("p");
    serieAirDating.classList.add("card-text");
    const serieRating = document.createElement("p");
    serieRating.classList.add("card-text");

    serieName.textContent = seriesData.attributes.name;
    serieImg.src =
      "http://localhost:1337" + seriesData.attributes.image.data.attributes.url;
    serieAirDating.textContent =
      "" +
      seriesData.attributes.air_date +
      "-" +
      (seriesData.attributes.finished
        ? seriesData.attributes.end_date
        : "Presente");
    serieRating.textContent = seriesData.attributes.rating + "/10";
    console.log();
    serieBox.appendChild(serieName);
    serieBox.appendChild(serieImg);
    serieBox.appendChild(serieAirDating);
    serieBox.appendChild(serieRating);

    link.append(serieBox);
    lista.appendChild(link);
  }
}

function redirect(url) {
  window.location.href = url;
}

let token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'login.html';
}

sendData();
