import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';
import "./login.css"

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({email: userName, password: password}),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (response?.status === 200) {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
      } else {
        const body = await response.json();
        setDisplayError(`⚠ Error: ${body.msg}`);
      }
    } catch {
      setDisplayError(`⚠ It appears that you are currently offline. You can play Baby Namer offline, but you must be initially online to create or login to your account.`);
    }
  }

  return (
    <>
      <div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>Email</span>
          <input className='form-control' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='your@email.com' />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>Password</span>
          <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        </div>
        <Button variant='primary' onClick={() => loginUser()} disabled={!userName || !password} id="login">
          Login
        </Button>
        <Button onClick={() => createUser()} disabled={!userName || !password} id="create">
          Create
        </Button>
      </div>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
