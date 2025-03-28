import React from 'react';
import './matches.css';

export function Matches() {

  const partner = localStorage.getItem('partner') || 'Spouse';
  const [likes, setLikes] = React.useState([]);
  const [partnersLiked, setPartnersLiked] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [myLikes, setMyLikes] = React.useState([]);
  let name = localStorage.getItem('userName');
  let likedText = [];
  let partnersLikedText = [];

  // set favorites dynamically
  React.useEffect(() => {
      fetch('/api/favorites')
          .then((response) => response.json())
          .then((favorites) => {
              setFavorites(favorites);
          });
  }, []);

  React.useEffect(() => {
      fetch('/api/likes')
          .then((response) => response.json())
          .then((likes) => {
              setLikes(likes);
          });
  }, []);

  console.log({favorites});
  console.log({likes})

  for (const [i, like] of likes.entries()) {
      console.log(like.like)
      console.log(like.userName)
  }


  console.log({likes})
  for (const [i, like] of likes.entries()) {
      console.log(like.userName)
      console.log(name)
      if (like.userName === name) {
          console.log('matches')
          likedText.push(like.like)
      }
  }
  console.log(likedText);

  for (const [i, like] of likes.entries()) {
      if (like.userName === partner) {
          console.log('partner matches')
          partnersLikedText.push(like.like)
      }
  }

  const matches = []
  for (let i = 0; i < likedText.length; i++) {
      if (partnersLikedText.includes(likedText[i])) {
          matches.push(likedText[i])
      }
  }

  console.log({matches})


  const listItems = [];
  if (matches.length) {
      for (const [i, match] of matches.entries()) {
          listItems.push(
              <li key={i}>{match}</li>
          );
      }
  } else {
      listItems.push(
          <li key='0'>no matches</li>
      );
  }


  const favListItems = [];
  if (favorites.length) {
      for (const[i, favorite] of favorites.entries()) {
          favListItems.push(
              <li key={i}>{favorite.favorite}</li>
          );
      }
  } else {
      favListItems.push(
          <li key='0'>no favorites added</li>
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