import React, {useState} from 'react';
import './play.css';

import { Unconnected } from './unconnected';
import { Connected } from './connected';
import { ConState } from './conState';

export function Play({userName, conState, onConChange, partner}) {
    let girls = ["Sally", "Chloe", "Maddison", "Kate", "Skylar", "Terry", "Addison", "Addie", "Susan", "Sandra"];
    let boys = ["Cole", "Aaron", "Nathan", "Michael"]
    let gcolor = '#ffbbbb'
    let bcolor = '#8199ff'

    const [names, setGender] = React.useState(girls)
    const [count, setCount] = React.useState(0);
    const [colorme, setColor] = React.useState(gcolor)

    function rejectClick() {
        console.log('reject')
        setCount(count+1)
    }

    function acceptClick() {
        let name = localStorage.getItem('userName')
        let liked = []
        const likedText = localStorage.getItem(name)
        if (likedText) {
            liked = JSON.parse(likedText)
        }
        liked.push(names[count])
        localStorage.setItem(name, JSON.stringify(liked))
        setCount(count + 1)
    }

    function favoriteClick() {
        let name = localStorage.getItem('userName')
        let liked = []
        let favorite = []
        const likedText = localStorage.getItem(name)
        const favoriteText = localStorage.getItem('Favorites')
        if (likedText) {
            liked = JSON.parse(likedText)
        }
        liked.push(names[count])
        if (favoriteText) {
            favorite = JSON.parse(favoriteText)
        }
        favorite.push(names[count])
        localStorage.setItem('Favorites',JSON.stringify(favorite))
        localStorage.setItem(name, JSON.stringify(liked))
        setCount(count+1)
    }

    function boyClick() {
        console.log('boy')
        setGender(boys)
        setColor(bcolor)
    }

    function girlClick() {
        console.log('girl')
        setGender(girls)
        setColor(gcolor)
    }


    return (
    <main className="container-fluid bg-info text-center text-dark">
        <div className="users">
            <h3 className="user-name text-left">Playing as {userName}</h3>
        </div>
        <br />
        <form>
            <div>
                {conState === ConState.Connected && (
                    <Connected partner={partner} onUnconnect={() => onConChange(partner, ConState.Unconnected)}/>
                )}
                {conState === ConState.Unconnected && (
                    <Unconnected
                        partner={partner}
                        onConnect={(connectPartner) => {
                            onConChange(connectPartner, ConState.Connected);
                        }}
                    />
                )}
            </div>
            <br/>
                <fieldset className="form-group border">
                    <legend className="w-auto">Gender</legend>
                    <label className="form-check-label" for="radio1">Boy</label>
                    <input className="form-check-input" type="radio" id="radio1" name="varRadio" value="radio1" onClick={boyClick}/>
                    <label className="form-check-label" for="radio2">Girl</label>
                    <input className="form-check-input" type="radio" id="radio2" name="varRadio" value="radio2" onClick={girlClick} />
                </fieldset>
        </form>
        <p></p>
        <div>
            <div className="container pt-3 border border-dark bg-light float-center">
                <a id="heart" href="#" onClick={favoriteClick}></a>
                <h1 style={{color: colorme}}>{names[count]}</h1>
            </div>
            <button id="like" type="button" className="btn btn-primary float-right" onClick={acceptClick}>accept</button>
            <button id="reject" type="button" className="btn btn-primary float-left" onClick={rejectClick}>reject</button>
        </div>
        <br/>
    </main>
  );
}