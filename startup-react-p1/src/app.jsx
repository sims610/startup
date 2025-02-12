import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className="bg-white text-light">
        <header className="container-fluid">
            <nav className="navbar fixed-top navbar-light">
                <h1 className="navbar-brand">Baby Namer</h1>
                <menu className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" href="login.html">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="../play/play.html">Play</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="../matches/matches.html">Matches</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="../about/about.html">About</a>
                    </li>
                </menu>
            </nav>
        </header>

        <main className="container-fluid bg-info text-center">App components go here</main>

        <footer className="bg-dark text-white-50">
            <div className="container-fluid">
                <span className="text-reset">Nathan Sims</span>
                <a className="text-reset" href="https://github.com/sims610/startup">GitHub</a>
            </div>
        </footer>
    </div>
  );
}