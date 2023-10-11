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

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      console.log('Home');
      break;
    case '/shows.html':
      console.log('shows');
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
