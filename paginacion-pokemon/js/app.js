const d = document,
  $main = d.querySelector("main"),
  $links = d.querySelector(".links");

async function loadPokemons(url) {
  try {
    $main.innerHTML = `<h2>Cargando...</h2>`;

    let res = await fetch(url),
      json = await res.json(),
      $template = "",
      $prevLink,
      $nextLink;
    console.log(json);

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    for (let i = 0; i < json.results.length; i++) {
      try {
        let res = await fetch(json.results[i].url),
          pokemon = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        $template += `
        <figure>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <figcaption>${pokemon.name}</figcaption>
        </figure>
        `;
      } catch (err) {
        console.error(err);
        let message =
          res.statusText || "Ocurrio un error al cargar los pokemons";
        $template += `
          <figure>
            <figcaption>Error ${res.status}: {message}</figcaption>
          </figure>
          `;
      }
    }
    $main.innerHTML = $template;

    $prevLink = json.previous ? `<a href="${json.previous}">👈</a>` : "";
    $nextLink = json.next ? `<a href="${json.next}">👉</a>` : "";
    $links.innerHTML = $prevLink + " " + $nextLink;
  } catch (err) {
    console.error(err);

    let message = res.statusText || "Ocurrio un error al cargar los pokemons";

    $main.innerHTML = `<h3>Error ${res.status}: ${message}</h3>`;
  }
}

let pokeApi = "https://pokeapi.co/api/v2/pokemon/";

d.addEventListener("DOMContentLoaded", (e) => loadPokemons(pokeApi));
d.addEventListener("click", (e) => {
  if (e.target.matches(".links a")) {
    e.preventDefault();
    loadPokemons(e.target.getAttribute("href"));
  }
});
