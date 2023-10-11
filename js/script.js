const global = {
  currentPage: window.location.pathname,
};

function highlighActiveLink() {
  const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    const hrefValue = link.getAttribute('href');

    //movie-details
    if (
      global.currentPage.includes('movie-details.html') &&
      hrefValue.includes('index.html')
    ) {
      link.classList.add('active');
      return;
    }

    //tv-details
    if (
      global.currentPage.includes('tv-details.html') &&
      hrefValue.includes('shows.html')
    ) {
      link.classList.add('active');
      return;
    }

    if (global.currentPage.includes(hrefValue) && hrefValue !== '/') {
      link.classList.add('active');
    }
  });
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

//Fetch data from the API
async function fetchAPIData(endpoint) {
  const API_KEY = 'e76d2381f0382657b3c2960253bbd771';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  hideSpinner();
  return data;
}

//Display Popular Movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');
  // console.log(results);

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    
          <a href="movie-details.html?id=${movie.id}">

          
          ${
            movie.poster_path
              ? `<img
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          class="card-img-top"
          alt="${movie.title}"
        />`
              : `<img
              src="./images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
       `;

    document.querySelector('#popular-movies').appendChild(div);
  });
}

//Display Popular TV Shows
async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');
  // console.log(results);

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    
          <a href="tv-details.html?id=${show.id}">

          
          ${
            show.poster_path
              ? `<img
          src="https://image.tmdb.org/t/p/w500${show.poster_path}"
          class="card-img-top"
          alt="${show.name}"
        />`
              : `<img
              src="./images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${show.first_air_date}</small>
            </p>
          </div>
       `;

    document.querySelector('#popular-shows').appendChild(div);
  });
}

//Init
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/tv-details.html':
      console.log('TV Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  highlighActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
