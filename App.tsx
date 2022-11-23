import React, {useState} from 'react';
import './App.css';

type Cocktail = {
    strDrink: string;
    strInstructions: string;
}

function App() {

    const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';
    const [word, setWord] = useState("");
    const [cocktail, setCocktail] = useState<Cocktail>(Object);

    const handleFetchCocktail = (event: React.FormEvent) => {
        event.preventDefault();

        if (!word) {
            return;
        }

        fetch(`${API_URL}?s=${word}`)
            .then((response) => response.json())
            .then(data => {
                setCocktail(data['drinks'][0]);
            });
    };

  return (
    <div className="App">
      <header className="App-header">
          <div id={'content-div'}>
              <form onSubmit={handleFetchCocktail}>
                  <div id={'search-label'}>
                      <label id="search-label"
                             htmlFor="cocktail-search-input"
                      >
                          {cocktail.strDrink ?? 'Search for a cocktail:' }
                      </label>
                  </div>
                  <div id={'search-input'}>
                      <input id={'cocktail-search-input'}
                             value={word}
                             onChange={(event) =>
                                 setWord(event.target.value)}
                             placeholder={'Tom Collins'}
                      >
                      </input>
                      <button>
                          Submit
                      </button>
                  </div>
              </form>
              <div id={'cocktail-instructions-div'}>
                  <p>
                      {cocktail.strInstructions}
                  </p>
              </div>
          </div>
      </header>
    </div>
  );
}

export default App;
