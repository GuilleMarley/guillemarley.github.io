function fetchSeriesButtons() {
  fetch("library.json")
    .then(response => response.json())
    .then(data => createSeriesButtons(data))
    .catch(error => console.error(error));
}

function createSeriesButtons(data) {
  var container = document.getElementById("buttons-container");

  data.series.forEach(function (serie) {
    var seriesButton = document.createElement("button");
    seriesButton.classList.add("series-button");

    var seriesImage = document.createElement("img");
    seriesImage.src = serie.pic;
    seriesImage.classList.add("series-image");

    var seriesTitle = document.createElement("span");
    seriesTitle.textContent = serie.nombre;

    seriesButton.appendChild(seriesImage);
    seriesButton.appendChild(seriesTitle);
    container.appendChild(seriesButton);

    seriesButton.addEventListener("click", function () {
      createSeasonButtons(serie.seasons);
    });
  });
}

function createSeasonButtons(seasons) {
  var container = document.getElementById("buttons-container");
  container.innerHTML = "";

  var backButton = document.createElement("button");
  backButton.textContent = "Volver";
  backButton.classList.add("back-button");
  container.appendChild(backButton);

  backButton.addEventListener("click", function () {
    container.innerHTML = ""; // Elimina los botones actuales
    fetchSeriesButtons(); // Vuelve a cargar los botones principales
  });

  seasons.forEach(function (season) {
    var seasonButton = document.createElement("button");
    seasonButton.textContent = `Temporada ${season.season}`;
    seasonButton.classList.add("auto-button");
    seasonButton.addEventListener("click", function () {
      createEpisodeButtons(season.episodes);
    });
    container.appendChild(seasonButton);
  });
}

function createEpisodeButtons(episodes) {
  var container = document.getElementById("buttons-container");
  container.innerHTML = "";

  var backButton = document.createElement("button");
  backButton.textContent = "Volver";
  backButton.classList.add("back-button");
  container.appendChild(backButton);

  backButton.addEventListener("click", function () {
    container.innerHTML = ""; // Elimina los botones o el video actual
    fetchSeriesButtons(); // Vuelve a cargar los botones principales
  });

  var videoContainer = document.createElement("div");
  videoContainer.classList.add("video-container");
  container.appendChild(videoContainer);

  episodes.forEach(function (episode) {
    var episodeButton = document.createElement("button");
    episodeButton.textContent = episode.name;
    episodeButton.classList.add("auto-button");

    var episodeImage = document.createElement("img");
    episodeImage.src = episode.pic;
    episodeImage.classList.add("episode-image");
    episodeButton.appendChild(episodeImage);

    episodeButton.addEventListener("click", function () {
      var videoIframe = document.createElement("iframe");
      videoIframe.src = episode.link;
      videoIframe.allowFullscreen = true;

      // Reemplazar el video actual por el nuevo
      videoContainer.innerHTML = "";
      videoContainer.appendChild(videoIframe);
    });

    container.appendChild(episodeButton);
  });
}

fetchSeriesButtons();
