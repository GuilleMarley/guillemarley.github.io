function Reproducir() {
  window.open('videos.html', '_blank', 'width=800,height=600');
}

function cargarPagina(event, url) {
  event.preventDefault();

  var contenido = document.getElementById('contenido');
  contenido.innerHTML = '';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      contenido.innerHTML = xhr.responseText;
      if (url === 'films.html') {
        fetchFilmButtons(); // Agregado: cargar los botones de las películas
      } else if (url === 'series.html') {
        fetchSeriesButtons(); // Agregado: cargar los botones de las series
      }
      cargarMenu('header.html');
    }
  };

  xhr.send();
}

function cargarMenu(url) {

  var contenido = document.getElementById('menu_top');
  contenido.innerHTML = '';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      contenido.innerHTML = xhr.responseText;
    }

    document.getElementById('index').addEventListener('click', function (event) {
      event.preventDefault();
      cargarPagina(event, 'index.html');
    });
    document.getElementById('Films-videos').addEventListener('click', function (event) {
      event.preventDefault();
      cargarPagina(event, 'films.html');
    });
    document.getElementById('Series-videos').addEventListener('click', function (event) {
      event.preventDefault();
      cargarPagina(event, 'series.html');
    });
    document.getElementById('Neko-videos').addEventListener('click', function (event) {
      event.preventDefault();
      cargarPagina(event, 'nekos.html');
    });


  };

  xhr.send();
}

document.addEventListener("DOMContentLoaded", function () {
  cargarMenu('header.html');
});