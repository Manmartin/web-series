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

const nav = document.getElementById("user-nav");
let userToken = localStorage.getItem('token');

if (!userToken) {
    nav.innerHTML = `
    <div class="container-fluid">
    <div class="box-logo">
      <a href="/">
        <img
          class="logo"
          src="images/logo.png"
          alt="logotipo"
        />
      </a>
    </div>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Inicio</a>
        </li>
      </ul>
      <form class="d-flex">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Buscar"
          aria-label="Search"
        />
        <a href="login.html" class="btn btn-outline-success" type="submit">
          Accede
        </a>
        <a href="register.html" class="btn btn-outline-success" type="submit">
          Registro
        </a>
      </form>
    </div>
  </div>
`
} else {
  const userID = localStorage.getItem('userID');
  nav.innerHTML = `
  <div class="container-fluid">
  <div class="box-logo">
    <a href="/">
      <img class="logo" src="images/logo.png" alt="logotipo" />
    </a>
  </div>
  <button
    class="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="index.html"
          >Inicio</a
        >
      </li>
    </ul>
    <form class="d-flex">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Buscar"
        aria-label="Search"
      />
    </form>

    <div class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        href="#"
        id="username"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
      </a>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        <li><a class="dropdown-item" href="myseries.html">Tus series</a></li>
        <li><a class="dropdown-item" href="mythreads.html">Tus hilos</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <span id="cerrarsesion" class="dropdown-item"
            >Cerrar sesión</span
          >
        </li>
      </ul>
    </div>
  </div>
</div>
`
getUser();
changeAccesButton();
}
