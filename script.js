/* Tableau stockage historique des Pokémon affichés*/
const pokeHistory = [];

/* Nombre max de Pokémon dans l'historique*/
const maxHistory = 4;

/* Index de navigation dans l'historique (0 -> Pokémon actuel)*/
let currentIndex = 0;

/* Fonction chargement aléatoire nouveau Pokémon*/
function loadNextPoke() {
  /* Remise à zéro de l'index (retour au Pokémon le plus récent)*/
  currentIndex = 0;

  /* génère un nombre aléatoire 1 à 151 de la first gen*/
  const random = Math.floor(Math.random() * 151) + 1;

  /* URL API + ID aléatoire*/
  const url = `https://pokeapi.co/api/v2/pokemon/${random}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      /* Récupération du container pour l'image*/
      const container = document.querySelector(`.imgContainer`);
      container.innerHTML = "";

      /*Récupération du container pour les info du Pokémon*/
      const containerName = document.getElementById("pokeName-container");
      containerName.innerHTML = "";

      /* Création élement d'affichage du nom*/
      const nameElement = document.createElement(`h2`);
      nameElement.className = "pokeInfo";
      nameElement.textContent = `Nom : ${data.name}`;

      /* Création de l'élément pour afficher le type*/
      const typeElement = document.createElement("h3");
      typeElement.className = "pokeInfo";
      typeElement.textContent = `Type : ${data.types[0].type.name}`;

      /* Création de l'élément image*/
      const imageElement = document.createElement(`img`);
      imageElement.src = data.sprites.front_default;
      imageElement.alt = data.name;

      /* Ajout des éléments au DOM*/
      containerName.appendChild(nameElement);
      containerName.appendChild(typeElement);
      container.appendChild(imageElement);

      /*Création d'un objet avec les données du Pokémon actuel*/
      const currentPoke = {
        name: data.name,
        type: data.types[0].type.name,
        image: data.sprites.front_default,
        backImage: data.sprites.back_default,
        height: data.height,
        weight: data.weight,
      };

      /* Ajoute le Pokémon au début de l'historique*/
      pokeHistory.unshift(currentPoke);

      /* Limite la taille de l'historique en supprimant le dernier élément si nécessaire*/
      if (pokeHistory.length > maxHistory) {
        pokeHistory.pop();
      }

      /* MAJ de l'affichage de l'historique*/
      displayHistory();
      displayStats(currentPoke);
    })

    .catch((error) => {
      console.error(`Erreur :`, error);
    });
}

/* Charge un Pokémon au démarrage*/
loadNextPoke();

/* Ecouteur d'évènement bouton next*/
nextBtn.addEventListener("click", loadNextPoke);

/*-----PreviousPoke-----*/

function loadPreviousPoke() {
  /* Vérifie s'il y a un Pokémon précédent dans l'historique*/
  if (currentIndex < pokeHistory.length - 1) {
    /*Incrémente l'index pour aller vers le Pokémon précédent*/
    currentIndex++;

    /* Récupère le Pokémon précédent dans l'historique*/
    const previousPoke = pokeHistory[currentIndex];

    /* Vide le container de l'image*/
    const container = document.querySelector(`.imgContainer`);
    container.innerHTML = "";

    /* Vide le container des informations */
    const containerName = document.getElementById("pokeName-container");
    containerName.innerHTML = "";

    /*  Crée et affiche les éléments du Pokémon précédent */
    const nameElement = document.createElement(`h2`);
    nameElement.className = "pokeInfo";
    nameElement.textContent = `Nom : ${previousPoke.name}`;

    const typeElement = document.createElement("h3");
    typeElement.className = "pokeInfo";
    typeElement.textContent = `Type : ${previousPoke.type}`;

    const imageElement = document.createElement(`img`);
    imageElement.src = previousPoke.image;
    imageElement.alt = previousPoke.name;

    /* Ajout des éléments au DOM*/
    containerName.appendChild(nameElement);
    containerName.appendChild(typeElement);
    container.appendChild(imageElement);
  }
}

loadPreviousPoke();

/*-----History-----*/

function displayHistory() {
  /* Récupère le container d'affichage de l'historique */
  const containerDisplay = document.querySelector(`.historyDisplay`);
  containerDisplay.innerHTML = "";

  /* Parcourt chaque Pokémon dans l'historique et crée une card */
  pokeHistory.forEach((poke) => {
    const card = document.createElement("div");
    card.classList.add("history-card");

    card.innerHTML = `
        <h5>${poke.name}</h5>
        <p>Type : ${poke.type}</p>
        <img src="${poke.image}" alt="${poke.name}" width="80">
        
      `;

    containerDisplay.appendChild(card);
  });
}

/* Fonction affichage stats*/

function displayStats(pokemon) {
  const statsContainer = document.getElementById("stats");
  statsContainer.innerHTML = "";

  /* Container parent pour stats-card*/
  const containerStats = document.createElement("div");
  containerStats.classList.add("containerStats");

  /* card pour les stats */
  const card = document.createElement("div");
  card.classList.add("stats-card");

  card.innerHTML = `
        <h5>${pokemon.name}</h5>
        <p>Type : ${pokemon.type}</p>
        <p>Taille : ${pokemon.height / 10} m</p>
        <p>Poids : ${pokemon.weight / 10} kg</p>
      <div class ="image-row">
        <img src="${pokemon.image}" alt="${pokemon.name}" width="80">
        <img src="${pokemon.backImage}" alt="${pokemon.name}" width="80">
      </div>
      `;

  containerStats.appendChild(card);

  statsContainer.appendChild(containerStats);
}

/*-----RemovePoke-----*/

function removePoke() {
  /* Sélection de la dernière card de l'historique et la supprime */
  const removePoke = document.querySelector(".history-card:last-child");
  if (removePoke) removePoke.remove();
  /* Supprime le dernier pokémon du tableau JS*/
  pokeHistory.pop();
}

/*-----SwitchDisplay-----*/

/* Fonction d'affichage stats (masque historique)*/
function statsDisplay() {
  const historyContainer = document.querySelector(".historyDisplay");
  const statsContainer = document.getElementById("stats");

  historyContainer.style.display = "none";
  statsContainer.style.display = "block";
}
/* Fonction affichage historique (masque stats) */
function historyDisplay() {
  const historyContainer = document.querySelector(".historyDisplay");
  const statsContainer = document.getElementById("stats");
  historyContainer.style.display = "flex";
  statsContainer.style.display = "none";
}
