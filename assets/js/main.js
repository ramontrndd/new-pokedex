const searchElements = document.querySelectorAll(".pokemon-search");
const number = document.querySelector("#number");
const pokemonImg = document.querySelector(".pokemon-image");
const type = document.querySelector(".type");
const types = document.querySelector(".types");
const pokemonWeight = document.querySelector("#pkmn-weight");
const pokemonHeight = document.querySelector("#pkmn-height");
const pkmnAbility = document.querySelector(".pkmn-ability");
const pkmnAbilitys = document.querySelector(".pokemon-ability");
const statsNumber = document.querySelectorAll(".stat-number");
const barInner = document.querySelectorAll(".bar-inner");
const barOuter = document.querySelectorAll(".bar-outer");
const themeColor = document.querySelector(".pokemon");
const textDesc = document.querySelector("#base-stats");
const statDesc = document.querySelectorAll(".stat-desc");
const pkmnName = document.querySelector("#name");

const typeColors = {
  rock: [182, 158, 49],
  ghost: [112, 85, 155],
  steel: [183, 185, 208],
  water: [100, 147, 235],
  grass: [73, 208, 176],
  psychic: [251, 85, 132],
  ice: [154, 214, 223],
  dark: [117, 87, 76],
  fairy: [230, 158, 172],
  normal: [170, 166, 127],
  fighting: [193, 34, 57],
  flying: [168, 145, 236],
  poison: [164, 62, 158],
  ground: [222, 193, 107],
  bug: [167, 183, 35],
  fire: [245, 125, 49],
  electric: [249, 207, 48],
  dragon: [112, 55, 255],
};

function limparInput() {
  const inputElement = document.querySelector("#pokemonSearch");
  inputElement.value = "";

}

const fetchApi = async (pokemonName) => {
  pokemonNameApi = pokemonName.split(" ").join("-");

  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + pokemonNameApi
  );

  if (response.status === 200) {
    const pokemonData = await response.json();
    return pokemonData;
  }

  return false;
};

function searchPokemon(query) {
  if (query.length > 2) {
    fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=650&offset=0&species.name=${query}`
    )
      .then((response) => response.json())
      .then((data) => {
        const datalist = document.getElementById("pokemonList");
        datalist.innerHTML = "";

        data.results.forEach((pokemon) => {
          const option = document.createElement("option");
          option.value = pokemon.name;
          datalist.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching Pokémon data:", error));
  }
}

searchElements.forEach((search) => {
  search.addEventListener("change", async (event) => {
    const pokemonData = await fetchApi(event.target.value);
    if (!pokemonData) {
      alert(" Pokemon não existe");
      return;
    }
    pkmnName.innerHTML = pokemonData.name;

    // Set color UI Theme
    const mainColor = typeColors[pokemonData.types[0].type.name];

    // Change Pokemon ID
    number.innerHTML = "#" + pokemonData.id.toString().padStart(3, "0");
    // Change Pokemons Img
    pokemonImg.src = pokemonData.sprites.other.dream_world.front_default;
    // Change Pokemons Types
    types.innerHTML = "";
    pokemonData.types.forEach((t) => {
      let newType = document.createElement("span");
      let color = typeColors[t.type.name];
      newType.innerHTML = t.type.name;
      newType.classList.add("type");
      newType.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      types.appendChild(newType);
    });
    // Change Pokemon Weight
    const weightInGrams = parseInt(pokemonData.weight, 10);
    const weightInKilograms = weightInGrams / 10;
    pokemonWeight.innerHTML = `${weightInKilograms} Kg`;
    // Change Pokemon Height
    const heightconverter = parseInt(pokemonData.height, 10);
    const heightformillimeter = heightconverter / 10;
    pokemonHeight.innerHTML = `${heightformillimeter} M`;
    // Change Pokemon Ability

    pkmnAbilitys.innerHTML = "";
    const pkmnAbility = pokemonData.abilities.forEach((a) => {
      let newAbility = document.createElement("span");
      newAbility.innerHTML = a.ability.name;
      newAbility.classList.add("pokemon-ability");
      pkmnAbilitys.appendChild(newAbility);
    });

    // Update Stats

    pokemonData.stats.forEach((s, i) => {
      statsNumber[i].innerHTML = s.base_stat.toString().padStart(3, "0");
      barInner[i].style.width = `${s.base_stat}%`;
      barInner[
        i
      ].style.backgroundColor = `rgb(${mainColor[0]},${mainColor[1]},${mainColor[2]})`;
      barOuter[
        i
      ].style.backgroundColor = `rgba(${mainColor[0]},${mainColor[1]},${mainColor[2]},.3)`;
      statDesc[
        i
      ].style.color = `rgb(${mainColor[0]},${mainColor[1]},${mainColor[2]})`;
      textDesc.style.color = `rgb(${mainColor[0]},${mainColor[1]},${mainColor[2]})`;
      themeColor.style.backgroundColor = `rgb(${mainColor[0]},${mainColor[1]},${mainColor[2]})`;
    });
  });
});
