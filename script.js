const url = `https://pokeapi.co/api/v2/pokemon/pikachu`;

function loadNextPoke() {
  const random = Math.floor(Math.random() * 1118) + 1;
  const url = `https://pokeapi.co/api/v2/pokemon/${random}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector(`.imgContainer`);
      container.innerHTML = "";
      const nameElement = document.createElement(`h1`);
      nameElement.textContent = `Nom : ${data.name}`;

      const typeElement = document.createElement("h3");
      typeElement.textContent = `Type : ${data.types[0].type.name}`;

      const imageElement = document.createElement(`img`);
      imageElement.src = data.sprites.front_default;
      imageElement.alt = data.name;

      container.appendChild(nameElement);
      container.appendChild(typeElement);
      container.appendChild(imageElement);
    })
    .catch((error) => {
      console.error(`Erreur :`, error);
    });
}

loadNextPoke();
nextBtn.addEventListener("click", loadNextPoke);
