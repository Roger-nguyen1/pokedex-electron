/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const nfetch = require("node-fetch");
console.log("RENDERER CHARGE_______________");

let urlIdPokemon = "https://pokeapi.co/api/v2/pokemon/";
let premierPokemon = 1;
let compteurId = 15;

function addPokemonHtml(pokemon) {
  let type = pokemon.types[0].type.name;
  let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  let png = pokemon.sprites.front_default;
  //console.log(`${type} ${name} ${png}`);

  document.querySelector("#pokemonContainer").innerHTML += `
    <div class="pokemon ${type}">
    <div class="imgContainer">
  <img
     src="${png}"
      alt="${name}"
      />
      </div>
      <div class="info">
          <h3 class="name">${name}</h3>
      <span class="type">Type: <span>${type}</span></span>
      </div>
        </div>
    `;
}

function pokeApi() {
  for (let i = premierPokemon; i <= compteurId; i++) {
    fetch(urlIdPokemon + i)
      .then((response) => response.json())
      .then((data) => {
        addPokemonHtml(data);
      });
  }
}
//Premier chargement pokeApi
pokeApi();

document.querySelector("#next").addEventListener("click", function () {
  premierPokemon += 15;
  compteurId += 15;
  pokeApi();
});
