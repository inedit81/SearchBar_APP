//Misc dom const
const charactersList = document.getElementById("charactersList");
const searchBar = document.getElementById("searchBar");
let hpCharacters = [];


// !! here is the searchBar function -- Use AEL with keyup to get user input

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  //this is how to filter the results with .filter()
  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.house.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});

// This function uses onchange from html to select the houses
const changeHouse = async (hpHouse) => {
  if (!hpHouse.value) {
    loadCharacters();
    return;
  }
  try {
    const res = await fetch(
      `https://hp-api.herokuapp.com/api/characters/house/${hpHouse.value}`
    );

    hpCharacters = await res.json();
    displayCharacters(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};

const loadCharacters = async () => {
  try {
    const res = await fetch(`https://hp-api.herokuapp.com/api/characters/`);
    hpCharacters = await res.json();
    displayCharacters(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};

const displayCharacters = (characters) => {
  const htmlString = characters
    // Use .map to use the objects items
    .map((character) => {
      return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>House: ${character.house}</p>
                <img src="${character.image}"></img>
            </li>
        `;
    })
    .join("");
  charactersList.innerHTML = htmlString;
};

loadCharacters();
