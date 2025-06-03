const pokemonImg = document.getElementById('pokemon-image');
const guessInput = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');

let currentPokemon = null;
let attemptMade = false;

function getRandomId() {
  return Math.floor(Math.random() * 250) + 1; // Primeira e segunda geração
}

async function carregarPokemon() {
  const id = getRandomId();
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    currentPokemon = data.name;
    console.log("Pokemon para adivinhar:", currentPokemon); // Para testes

    pokemonImg.src = data.sprites.front_default;
    pokemonImg.classList.remove('revealed');

    guessInput.value = '';
    attemptMade = false;
    nextBtn.disabled = true;
  } catch (error) {
    console.error('Erro ao carregar Pokémon:', error);
  }
    guessInput.disabled = false;
    submitBtn.disabled = false;
}

submitBtn.addEventListener('click', () => {
    const guess = guessInput.value.trim().toLowerCase();
  
    if (!attemptMade) {
      attemptMade = true;
      nextBtn.disabled = false;
  
      // Desabilita input e botão após a tentativa
      guessInput.disabled = true;
      submitBtn.disabled = true;
    }
  
    if (guess === currentPokemon) {
      pokemonImg.classList.add('revealed');
    }
  });
nextBtn.addEventListener('click', carregarPokemon);

// Carrega o primeiro Pokémon ao iniciar a página
carregarPokemon();
