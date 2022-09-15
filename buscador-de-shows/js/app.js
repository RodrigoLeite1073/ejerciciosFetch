const d = document,
  $shows = d.getElementById("shows"),
  $template = d.getElementById("show-template").content,
  $fragment = d.createDocumentFragment(),
  $loader = d.querySelector(".cssload-dots");

d.addEventListener("keypress", async (e) => {
  if (e.target.matches("#search") && e.key === "Enter") {
    try {
      $loader.classList.remove("display-none");
      $shows.innerHTML = "";

      let query = e.target.value.toLowerCase(),
        api = `https://api.tvmaze.com/search/shows?q=${query}`,
        res = await fetch(api),
        json = await res.json();

      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      if (json.length === 0) {
        $shows.innerHTML = `<h2 class="error">Su busqueda <mark>${query}</mark> no produjo resultado intente con otras palablras</h2>`;
      } else {
        json.forEach((el) => {
          $template.querySelector("h3").textContent = el.show.name;
          $template.querySelector("div").innerHTML =
            el.show.summary || `<h3>No hay descripcion.</h3>`;
          $template.querySelector("img").src = el.show.image
            ? el.show.image.medium
            : "../assets/no-images.png";
          $template.querySelector("img").alt = el.show.name;
          $template.querySelector("a").href = el.show.url || "#";
          $template.querySelector("a").target = el.show.url
            ? "_blanck"
            : "_self";
          $template.querySelector("a").textContent = el.show.url
            ? "Ver mas..."
            : "";

          let $clone = d.importNode($template, true);
          $fragment.appendChild($clone);
        });
        $loader.classList.add("display-none");
        $shows.appendChild($fragment);
      }
      console.log(json);
    } catch (err) {
      console.error(err);
      let message = err.statusText || "Ocurrio un error con su busqueda.";
      $loader.classList.add("display-none");
      $shows.innerHTML = `<h2 class="error">Error ${err.status}: ${message}</h2>`;
    }
  }
});
