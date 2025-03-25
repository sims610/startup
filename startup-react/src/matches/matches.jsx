import React from 'react';
import './matches.css';

export function Matches() {

  const partner = localStorage.getItem('partner') || 'Spouse';
  const [liked, setLiked] = React.useState([]);
  const [partnersLiked, setPartnersLiked] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  let name = localStorage.getItem('userName')

  React.useEffect(() => {
      const likedText = localStorage.getItem(name);
      if (likedText) {
          setLiked(JSON.parse(likedText));
      }
  }, []);

  React.useEffect(() => {
      const partnersLikedText = localStorage.getItem(partner);
      if (partnersLikedText) {
          setPartnersLiked(JSON.parse(partnersLikedText));
      }
  }, []);

  console.log({partnersLiked})
  console.log({liked})

  const matches = []
  for (let i = 0; i < liked.length; i++) {
      if (partnersLiked.includes(liked[i])) {
          matches.push(liked[i])
      }
  }

  console.log({matches})


  const listItems = [];
  if (matches.length) {
      for (const [i, match] of matches.entries()) {
          listItems.push(
              <li>{match}</li>
          );
      }
  } else {
      listItems.push(
          <li aria-colspan='2'>no matches</li>
      );
  }

  // set favorites dynamically
  React.useEffect(() => {
      fetch('/api/favorites')
          .then((response) => response.json())
          .then((favorites) => {
              setFavorites(favorites);
          });
  }, []);

  console.log({favorites})

  const favListItems = [];
  if (favorites.length) {
      for (const[i, favorite] of favorites.entries()) {
          favListItems.push(
              <li>{favorite.favorite}</li>
          );
      }
  } else {
      favListItems.push(
          <li>no favorites added</li>
      );
  }

  return (
    <main className="container-fluid bg-info text-left">
                {/*<form>*/}
                {/*    <fieldset className="form-group border">*/}
                {/*        <legend className="w-auto">Connections</legend>*/}
                {/*        <label className="form-check-label" for="connection1">Spouse</label>*/}
                {/*        <input className="form-check-input" type="radio" id="connection1" name="varRadio" value="connection1" checked />*/}
                {/*        <label className="form-check-label" for="connection2">Mom</label>*/}
                {/*        <input className="form-check-input" type="radio" id="connection2" name="varRadio" value="connection2" />*/}
                {/*        <label className="form-check-label" for="connection3">Dad</label>*/}
                {/*        <input className="form-check-input" type="radio" id="connection3" name="varRadio" value="connection3" />*/}
                {/*    </fieldset>*/}
                {/*</form>*/}
                <h1>Matches with {partner}</h1>
                <ul>
                    {listItems}
                </ul>
    
                <br />
    
                <h1>Favorites</h1>
                <ul>
                    {favListItems}
                </ul>
            </main>
  );
}