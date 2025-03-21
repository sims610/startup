import React from 'react';
import './about.css';

export function About() {
  return (
    <main className="container-fluid bg-info text-center">
        <div className="flex">
            <img className="align-center" src="/cute-baby.jpg" alt="a baby" width="50%"/>
        </div>
        <h1>About Baby Namer</h1>
        <p>
            Baby Namer is an interactive website where you and your spouse can decide on baby names together.
            This application adds a fun way to make a difficult decision: choosing the name of your future child.
            Just swipe through hundreds of baby names, and then see how you and your spouse connected with ones you liked!
        </p>
    </main>
  );
}