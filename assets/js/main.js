const searchElements        = document.querySelectorAll(".pokemon-search");
const number                = document.querySelector('#number');

const fetchApi = async (pokemonName) => {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + pokemonName
  );
  const pokemonData = await response.json();

  return pokemonData;
};

searchElements.forEach((search) => {
  search.addEventListener("change", async (event) => {
    const pokemonData = await fetchApi(event.target.value);

    console.log(pokemonData);

    // Edit number and ID for pokemons 

    number.innerHTML = '#' + pokemonData.id.toString().padStart(3, '0');

    



  });
});
