function fetchFilmButtons() {
  fetch("library.json")
    .then(response => response.json())
    .then(data => createFilmButtons(data))
    .catch(error => console.error(error));
}

function createFilmButtons(data) {
  var container = document.getElementById("buttons-container");

  data.films.forEach(function (film) {
    var filmButton = document.createElement("button");
    filmButton.textContent = film.name;
    filmButton.classList.add("auto-button");

    var filmImage = document.createElement("img");
    filmImage.src = film.pic;
    filmImage.alt = film.name;
    filmButton.appendChild(filmImage);

    filmButton.addEventListener("click", function () {
      var videoContainer = document.createElement("div");
      videoContainer.classList.add("video-container");

      var backButtonVideo = document.createElement("button");
      backButtonVideo.textContent = "Volver";
      backButtonVideo.classList.add("back-button");
      videoContainer.appendChild(backButtonVideo);

      backButtonVideo.addEventListener("click", function () {
        container.innerHTML = ""; // Elimina el video actual
        fetchFilmButtons(); // Vuelve a cargar los botones principales
      });

      var videoIframe = document.createElement("iframe");
      videoIframe.src = film.link;
      videoIframe.allowFullscreen = true;
      videoContainer.appendChild(videoIframe);

      // Reemplazar los botones por el video
      container.innerHTML = "";
      container.appendChild(videoContainer);
    });

    container.appendChild(filmButton);
  });

  var backButton = document.createElement("button");
  backButton.textContent = "Volver";
  backButton.classList.add("back-button");
  container.appendChild(backButton);

  backButton.addEventListener("click", function () {
    container.innerHTML = ""; // Elimina los botones o el video actual
    fetchFilmButtons(); // Vuelve a cargar los botones principales
  });
}

fetchFilmButtons();