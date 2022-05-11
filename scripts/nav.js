async function getUser() {
  const user = document.getElementById("username");
  const response = await fetch("http://localhost:1337/api/users/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${userToken}` },
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
let userToken = localStorage.getItem("token");

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
        <a href="login.html" class="btn btn-outline-success" type="submit">
          Accede
        </a>
        <a href="register.html" class="btn btn-outline-success" type="submit">
          Registro
        </a>
      </form>
    </div>
  </div>
`;
} else {
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
    <ul class="navbar-nav ">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="index.html"
          >Inicio</a
        >
      </li>
    </ul>
    <form class="d-flex">

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
`;
  getUser();
  changeAccesButton();
}

const footer = document.getElementById("footer");
//footer.classList.add('fixed-bottom');
footer.innerHTML = `
<section class="">
<div class="container text-center text-md-start mt-5 ">
  <div class="row mt-3">
    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
      <h6 class="text-uppercase fw-bold mb-4">
        <i class="fas fa-gem me-3"></i>Series Manta
      </h6>
      <p>
        Foro para hablar de tus series favoritas con más usuarios del
        mundo.
      </p>
    </div>

    <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
      <h6 class="text-uppercase fw-bold mb-4">Links Útiles</h6>
      <p>
        <a href="aboutus.html" class="text-reset">Sobre Nosotros</a>
      </p>
      <p>
        <a href="normasdeuso.html" class="text-reset">Normas de uso</a>
      </p>
    </div>
    <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
      <h6 class="text-uppercase fw-bold mb-4">Contacto</h6>
      <p><i class="fas fa-home me-3"></i> Madrid,España</p>
      <p>
        <i class="fas fa-envelope me-3"></i>
        info@example.com
      </p>
    </div>
  </div>
</div>
</section>
<div
class="text-center p-4"
style="background-color: rgba(0, 0, 0, 0.05)"
>
Series Manta 2022 by: Manuel Martin y Tatiana Arteaga
</div>
`;
