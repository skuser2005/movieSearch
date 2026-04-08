const API_KEY = "3e14a5ed"; // get from omdbapi.com

async function searchMovies() {
  const query = document.getElementById("searchInput").value;
  const moviesDiv = document.getElementById("movies");
  const status = document.getElementById("status");

  moviesDiv.innerHTML = "";
  status.innerText = "Loading...";

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
    );

    const data = await response.json();

    if (data.Response === "False") {
      status.innerText = "No movies found ❌";
      return;
    }

    status.innerText = "";

    data.Search.forEach(movie => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("movie");

      movieCard.innerHTML = `
        <img src="${movie.Poster}" alt="">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      `;

      moviesDiv.appendChild(movieCard);
    });

  } catch (error) {
    status.innerText = "Error fetching data ⚠️";
    console.error(error);
  }
}