const token = localStorage.getItem("token");
async function sendData() {
  try {
    const response = await fetch(
      "https://web-series-eoi.herokuapp.com/api/series?populate=image"
    );

    if (!response.ok) {
      const message = `Error: ${response.status}`;

      throw new Error(message);
    }

    const data = await response.json();

    console.log(data);

    printData(data.data);
  } catch (error) {
    console.log(error);
  }
}

function printData(data) {
  const lista = document.getElementById("lista");

  for (const seriesData of data) {
    const serieName = document.getElementById("name");
    const serieAirDating = document.getElementById("airDating");
    const serieFinish = document.getElementById("finish");
    const serieRating = document.getElementById("rating");
    const serieImg = document.getElementById("image");
    serieName.textContent = seriesData.attributes.name;
    serieAirDating.textContent = seriesData.attributes.air_date;
    serieFinish.textContent = seriesData.attributes.finished ? "Terminada" : "En emision";
    serieRating.textContent = seriesData.attributes.rating + "/5";
    serieImg.src = "https://web-series-eoi.herokuapp.com" + seriesData.attributes.image.data[0].attributes.formats.medium.url;

    lista.appendChild(serieBox);
  }
}

sendData();
