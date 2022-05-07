async function getUser() {
    const user = document.getElementById("username");
    const response = await fetch("http://localhost:1337/api/users/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${userToken}`},
      redirect: "follow",
    });
    const userName = await response.json();
    user.textContent = userName.username;
}

function changeAccesButton() {
    const logout = document.getElementById("cerrarsesion");
    logout.textContent = "Cerrar sesión";
    logout.addEventListener(`click`, (e) => {
      doLogout();
    });
  }

function doLogout() {
    localStorage.clear();
    window.location.href = "index.html";
}

let userToken = localStorage.getItem('token');

if (!userToken) {
    const nav = document.getElementById("user");
    if (nav)
        nav.style.display = "none";
} else {
    const nav = document.getElementById("no-user");
    if (nav)
        nav.style.display = "none";
    getUser();
    changeAccesButton();
}
