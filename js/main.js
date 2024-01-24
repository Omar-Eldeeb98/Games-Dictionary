//^ jQuery Auto Complete ...
/// <reference types="../@types/jquery" />;

//~ ================================================ variables ==========================================================
var categories = document.querySelectorAll(
  ".navbar-nav .nav-item a.nav-link  "
);
for (var i = 0; i < categories.length; i++) {
  categories[i].addEventListener("click", function (e) {
    // console.log(e.target); //^ for testing
    getGames(e.target.getAttribute("data-category"));
    document.querySelector(".nav-item .active").classList.remove("active");
    e.target.classList.add("active");
  });
}

//~ ================================================ variables ==========================================================

//& =============================================== getGames()  ========================================================

async function getGames(category) {
  const loading = document.querySelector(".loading");
  loading.classList.remove("d-none");
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "64a6999d44msh87034d24d97d878p14d58ajsn3e52cd80aa67",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
    options
  );
  const response = await api.json();

  displayGames(response);
  loading.classList.add("d-none");

  console.log(response); //^ just for testing
}
getGames("mmorpg");

//& =============================================== getGames()  ========================================================

//& =============================================== getGameDetails()  ========================================================
async function getGameDetails(id) {
  const loading = document.querySelector(".loading");
  loading.classList.remove("d-none");
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "64a6999d44msh87034d24d97d878p14d58ajsn3e52cd80aa67",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  const response = await api.json();
  document.getElementById("games").classList.add("d-none");
  document.getElementById("details").classList.remove("d-none");
  console.log(response); //^ just for testing
  displayGameDetails(response);

  loading.classList.add("d-none");
}

//& =============================================== getGameDetails()  ========================================================

//~ =============================================== closeDetails page  ========================================================
function closeBtn() {
  document.getElementById("games").classList.remove("d-none");
  document.getElementById("details").classList.add("d-none");
}
//~ =============================================== closeDetails page  ========================================================

//* ============================================= displayGames() =======================================================
function displayGames(data) {
  var cartona = "";
  for (var i = 0; i < data.length; i++) {
    cartona += `<div class="col-md-3">
    <div class="card shadow-lg h-100" onclick = "getGameDetails(${data[i].id})">
      <img
        src="${data[i].thumbnail}"
        class="card-img-top"
        alt="game-image" />
      <div class="card-body">
        <div
          class="d-flex justify-content-between align-items-center mb-4">
          <h5 class="card-title text-white fw-normal">
           ${data[i].title}
          </h5>
          <span class="btn btn-info text-white">Free</span>
        </div>
        <p class="card-text text-white-50">
          ${data[i].short_description}
        </p>
      </div>
      <div
        class="card-footer d-flex justify-content-between align-items-center border-warning-subtle mb-2">
        <span class="bg-danger text-white rounded p-1 mt-2 px-1">${data[i].genre}</span>
        <span class="bg-warning rounded p-1 mt-2 px-1"
          >${data[i].platform}</span
        >
      </div>
    </div>
  </div>`;
  }
  document.getElementById("games_home").innerHTML = cartona;
}
//* ============================================= displayGames() =======================================================

//* ============================================= displayGameDetails() =======================================================
function displayGameDetails(data) {
  const cartona = `
  <div
            class="col-md-12 d-flex justify-content-between align-items-center mb-2">
            <h1 class="game_details_header p-0 m-0">Game Details : </h1>
            <div class = "close_btn_container">
            <i  onclick = "closeBtn()" class="fa-solid fa-xmark fa-fade"></i>
           
            </div>
          </div>

          <div class="left_sec col-md-4">
            <img
              src="${data.thumbnail}"
              alt="..."
              class="w-100 img-thumbnail bg-dark shadow border-0" />
            
             <span class = "mt-3 d-inline-block me-2"> Developer : <span class = "bg-danger p-1  rounded">${data.developer}</span></span>
             <span class = "mt-3 d-inline-block"> Released-Date : <span class = "bg-primary p-1  rounded">${data.release_date}</span></span>
            
             <h3 class = "bg-dark rounded mt-3 text-center p-2 ">ScreenShots</h3>

             <div class = "images_container ">
             <div class = "image_container">
             <img id src = "${data.screenshots[0].image}" alt = "..." class = "w-100 h-100">
             </div>
             <div class = "image_container">
             <img id src = "${data.screenshots[1].image}" alt = "..." class = "w-100 h-100">
             </div>
             <div class = "image_container">
             <img id src = "${data.screenshots[2].image}" alt = "..." class = "w-100 h-100">
             </div>
             
             </div>
           
          </div>

          <div class="col-md-8  ">
            <div class = "bg-black p-4 rounded shadow-lg">
            <h3 class="mb-3 text-danger w-100">
              Title:
              <span class=" p-1 rounded px-4 m-1 text-white  title_span ">${data.title}</span>
            </h3>
            <p class="mb-3 text-danger w-100">
              Category:
              <span class=" p-1 rounded px-4 m-1 text-white  title_span ">${data.genre}</span>
            </p>
            <p class="mb-3 text-danger w-100">
              Platform:
              <span class=" p-1 rounded px-4 m-1 text-white  title_span ">${data.platform}</span>
            </p>
            <p class="mb-3 text-danger w-100">
              Status: <span class=" p-1 rounded px-4 m-1 text-white  title_span ">${data.status}</span>
            </p>
            <p class="mb-3 w-100">
            ${data.description}
            </p>
            <a href="${data.game_url}" target="_blank" class="btn btn-outline-warning px-3 text-uppercase">Show Game</a>
            </div>
          </div>
  `;

  document.getElementById("game_details_").innerHTML = cartona;
}
//* ============================================= displayGameDetails() =======================================================
