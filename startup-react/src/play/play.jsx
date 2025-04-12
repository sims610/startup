import React, {useState} from 'react';
import './play.css';

import { Unconnected } from './unconnected';
import { Connected } from './connected';
import { ConState } from './conState';
import { GameEvent, GameNotifier } from './gameNotifier';

export function Play({userName, conState, onConChange, partner}) {
    let gcolor = '#ffbbbb'
    let bcolor = '#8199ff'


    const [gender, setGender] = React.useState('Select Gender')
    const [colorme, setColor] = React.useState('#000000')
    const [name, setName] = React.useState('Boy or Girl')
    const isFirstRender = React.useRef(true);

    React.useEffect(()=>{
        if (isFirstRender.current) {
            isFirstRender.current = false;
            console.log("Is first render")
            return;
        }

        fetch(`https://randomuser.me/api/?gender=${gender}&nat=us&inc=gender,name,nat`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                setName(data.results[0].name.first);
            })
            .catch();
    }, [gender]);
    function getName() {
        fetch(`https://randomuser.me/api/?gender=${gender}&nat=us&inc=gender,name,nat`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                setName(data.results[0].name.first);
            })
            .catch();
    }


    function rejectClick() {
        console.log('reject')
        getName();
    }

    async function acceptClick() {
        let userName = localStorage.getItem('userName')
        const newLike = {userName: userName, like: name}
        await fetch('/api/like', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newLike)
        })
        console.log(newLike)
        GameNotifier.broadcastEvent(userName, GameEvent.Like, name);
        getName();
    }

    async function favoriteClick() {
        let userName = localStorage.getItem('userName')
        const newLike = {userName: userName, like: name}
        const newFavorite = {userName: userName, favorite: name}

        await fetch('/api/like', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newLike)
        })

        await fetch('/api/favorite', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newFavorite),
        })
        // console.log(newLike);
        // console.log(newFavorite);

        GameNotifier.broadcastEvent(userName, GameEvent.Favorite, name)
        getName();

        return '';
    }

    async function boyClick() {
        setGender('male');
        console.log({gender})
        setColor(bcolor);
    }

    function girlClick() {
        console.log('girl')
        setGender('female')
        setColor(gcolor);
    }

    const [events, setEvent] = React.useState([]);

    React.useEffect(() => {
        GameNotifier.addHandler(handleGameEvent);

        return () => {
            GameNotifier.removeHandler(handleGameEvent);
        };
    });

    function handleGameEvent(event) {
        setEvent([...events, event]);
    }

    function createMessageArray() {
        const messageArray = [];
        for (const [i, event] of events.entries()) {
            let message = 'unknown';
            if (event.type === GameEvent.Like) {
                message = ` liked ${event.value}`;
            } else if (event.type === GameEvent.Favorite) {
                message = ` loves ${event.value}`;
            } else if (event.type === GameEvent.System) {
                message = event.value.msg;
            }

            messageArray.push(
                <div key={i} className='event'>
                    <span className={'player-event'}>{event.from.split('@')[0]}</span>
                    {message}
                </div>
            );
        }
        return messageArray;
    }

    function btnDisabled() {
        if (colorme === '#000000') {
            return true;
        }
        return false;
    }


    return (
        <main className="container-fluid text-center text-dark">
            <div className="users">
                <h3 className="user-name text-left">Playing as {userName}</h3>
            </div>
            <br/>
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
                    <label className="form-check-label" for="radio1">
                        Boy
                    </label>
                    <input className="form-check-input" type="radio" id="radio1" name="varRadio" value="radio1"
                           onClick={boyClick}/>
                    <label className="form-check-label" for="radio2">
                        Girl
                    </label>
                    <input className="form-check-input" type="radio" id="radio2" name="varRadio" value="radio2"
                           onClick={girlClick}/>
                </fieldset>
            </form>
            <p></p>
            <div>
                <div className="container-fluid pt-3 border border-dark bg-light float-center" id="card">
                    <button id="heart" disabled={btnDisabled()} onClick={favoriteClick}></button>
                    <h1 style={{color: colorme, verticalAlign: "center", position: "relative"}}>{name}</h1>
                </div>
                <button id="like" type="button" className="btn btn-primary float-right" onClick={acceptClick} disabled={btnDisabled()}>
                    Accept
                </button>
                <button id="reject" type="button" className="btn btn-primary float-left" onClick={rejectClick} disabled={btnDisabled()}>
                    Reject
                </button>
            </div>
            <br/>
            <div className='players'>
                Player
                <span className='player-name'> {userName}</span>
                <div id='player-messages'>{createMessageArray()}</div>
            </div>
        </main>
    );
}