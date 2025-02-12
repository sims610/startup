import React from 'react';
import './play.css';

export function Play() {
  return (
    <main className="container-fluid bg-info text-center text-dark">
        <div className="users">
            <span className="user-name text-left">Unknown User</span>
        </div>
        <br />
        <form>
            <div>
                <span>Connect with user: </span>
                <input type="text" placeholder="users@email.com" />
                <button id="submit-btn" type="submit" className="btn btn-primary">Connect</button>
            </div>
            <br/>
                <fieldset className="form-group border">
                    <legend className="w-auto">Gender</legend>
                    <label className="form-check-label" for="radio1">Boy</label>
                    <input className="form-check-input" type="radio" id="radio1" name="varRadio" value="radio1" checked />
                    <label className="form-check-label" for="radio2">Girl</label>
                    <input className="form-check-input" type="radio" id="radio2" name="varRadio" value="radio2" />
                    <label className="form-check-label" for="radio3">Surprise</label>
                    <input className="form-check-input" type="radio" id="radio3" name="varRadio" value="radio3" />
                </fieldset>
        </form>
        <p></p>
        <div>
            <div className="container pt-3 border border-dark bg-light float-center">
                <a id="heart" href="#"></a>
                <h1>Sally</h1>
            </div>
            <button id="like" type="button" className="btn btn-primary float-right">>></button>
            <button id="reject" type="button" className="btn btn-primary float-left">left</button>
        </div>
        <br/>
    </main>
  );
}