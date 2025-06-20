function hashName(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        //Hash setup
        hash = (hash << 5) - hash + name.charCodeAt(i);
        hash |= 0; // Convert to 32bit int
    }
    //Ensures non-negative
    return Math.abs(hash);
}

async function getPokemon() {
    //Trim Whitespace
    const name = document.getElementById("nameInput").value.trim();
    //No name inputted
    if (!name) {
        document.getElementById("result").textContent = "Please enter a name!";
        return;
    }
        //Fetch API counter of total Pokemon
        const countResponse = await fetch("https://pokeapi.co/api/v2/pokemon-species?limit=0");
        const countData = await countResponse.json();
        const maxPokemonId = countData.count;
        console.log("Total Pokemon:", maxPokemonId);
    const hashed = hashName(name);
    //Ensures that result is > 0
    const pokemonId = (hashed % maxPokemonId) + 1;
    //Grab ID based on hashed result
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(data => {
            const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            const spriteUrl = data.sprites.front_default;
            //Inject result of name with picture
            document.getElementById("result").innerHTML = `
                <h2>${name}, your Pokémon is ${pokemonName}!</h2>
                <img src="${spriteUrl}" alt="${pokemonName}">
            `;
        })
        //Unable to access pokeAPI
        .catch(error => {
            document.getElementById("result").textContent = "Something went wrong...";
            console.error(error);
        });
}
