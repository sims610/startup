import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Matches } from './matches/matches';
import { About } from './about/about';
import { AuthState } from './login/authState';
import { ConState } from "./play/conState";

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  const [partner, setPartner] = React.useState(localStorage.getItem('partner') || '');
  const currentConState = partner ? ConState.Connected : ConState.Unconnected;
  const [conState, setConState] = React.useState(currentConState);

  return (
    <BrowserRouter>
        <div className="body bg-white text-light">
            <header className="container-fluid">
                <nav className="navbar fixed-top navbar-white">
                  <div className="navbar-brand">
                    Baby Namer
                  </div>
                  <menu className="navbar-nav">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="">
                        Login
                      </NavLink>
                    </li>
                    {authState === AuthState.Authenticated && (
                        <li className="nav-item">
                          <NavLink className="nav-link" to="play">
                            Play
                          </NavLink>
                        </li>
                    )}
                    {authState === AuthState.Authenticated && (
                        <li className="nav-item">
                          <NavLink className="nav-link" to="matches">
                            Matches
                          </NavLink>
                        </li>
                    )}
                    <li className="nav-item">
                      <NavLink className="nav-link" to="about">
                        About
                      </NavLink>
                    </li>
                  </menu>
                </nav>
            </header>

            <Routes>
              <Route
                    path='/'
                    element={
                        <Login
                            userName={userName}
                            authState={authState}
                            onAuthChange={(userName, authState) => {
                                setAuthState(authState);
                                setUserName(userName);
                            }}
                            conState={conState}
                            onConChange={(partner, conState) => {
                                setConState(conState);
                                setPartner(partner);
                            }}
                        />
                    }
                    exact
              />
              <Route
                  path='/play'
                  element={
                      <Play
                          userName={userName}
                          conState={conState}
                          onConChange={(partner, conState) => {
                              setConState(conState);
                              setPartner(partner);
                          }}
                          partner={partner}
                      />
                  }
                  exact
              />
              <Route path='/matches' element={<Matches />} />
              <Route path='/about' element={<About />} />
              <Route path='*' element={<NotFound />} />
            </Routes>

            <footer className="bg-dark text-white-50">
                <div className="container-fluid">
                  <span className="text-reset">Nathan Sims</span>
                  <a className="text-reset" href="https://github.com/sims610/startup">
                    Source
                  </a>
                </div>
            </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}

export default App;