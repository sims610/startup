import React from 'react';
import './matches.css';

export function Matches() {

  const partner = localStorage.getItem('partner') || 'Spouse';
  let partnersChoice = ["Cole", "Sally", "Chloe"]

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
                    <li>Sally</li>
                    <li>June</li>
                    <li>Ellie</li>
                    <li>Rachel</li>
                </ul>
    
                <br />
    
                <h1>Favorites</h1>
                <ul>
                    <li>Celeste</li>
                    <li>Megan</li>
                    <li>Chloe</li>
                </ul>
            </main>
  );
}