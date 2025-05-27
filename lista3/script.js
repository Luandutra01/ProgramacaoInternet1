document.getElementById('searchBtn').addEventListener('click', () => {
    const pokemonInput = document.getElementById('pokemonInput').value.toLowerCase().trim();
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const pokemonCard = document.getElementById('pokemonCard');

    if (!pokemonInput) return;

    // Mostra "Carregando..." e esconde outras seções
    loading.classList.remove('hidden');
    error.classList.add('hidden');
    pokemonCard.classList.add('hidden');

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado');
            }
            return response.json();
        })
        .then(data => {
            // Preenche os dados
            document.getElementById('pokemonName').textContent = capitalize(data.name);
            document.getElementById('pokemonNumber').textContent = `#${data.id}`;
            document.getElementById('pokemonHeight').textContent = `${data.height / 10} m`;
            document.getElementById('pokemonWeight').textContent = `${data.weight / 10} kg`;
            document.getElementById('pokemonSprite').src = data.sprites.front_default;

            const types = data.types.map(typeInfo => capitalize(typeInfo.type.name));
            document.getElementById('pokemonTypes').textContent = types.join(', ');

            // Mostra o card com as informações
            pokemonCard.classList.remove('hidden');
        })
        .catch(() => {
            error.classList.remove('hidden');
        })
        .finally(() => {
            loading.classList.add('hidden');
        });
});

// Função para capitalizar a primeira letra
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
