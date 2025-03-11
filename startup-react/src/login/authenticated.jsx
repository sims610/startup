import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function unconnect() {
      localStorage.removeItem('partner')
      props.onUnconnect();
  }
  function logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('Favorites');
    props.onLogout();
  }

  function logoff() {
      logout();
      unconnect();
  }

  return (
    <div>
      <div className='playerName'>{props.userName}</div>
      <Button variant='primary' onClick={() => navigate('/play')}>
        Play
      </Button>
      <Button variant='info' onClick={() => logoff()}>
        Logout
      </Button>
    </div>
  );
}
