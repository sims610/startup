import React from 'react';

export function Login() {
  return (
    <main className="container-fluid bg-info text-center">
        <div>
            <h1>Welcome to Baby Namer</h1>
            <form method="get" action="../play/play.html">
                <div className="input-group mb-3">
                    <span className="input-group-text">Email:</span>
                    <input className="form-control" type="text" placeholder="your@email.com" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Password: </span>
                    <input className="form-control" type="password" placeholder="password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <button type="submit" className="btn btn-info">Create</button>
            </form>
        </div>
    </main>
  );
}