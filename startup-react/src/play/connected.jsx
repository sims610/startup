import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export function Connected(props) {
    const navigate = useNavigate();

    function unconnect() {
        localStorage.removeItem('partner');
        props.onUnconnect();
    }

    return (
        <div>
            <span className='partner'>You are connected to {props.partner}</span>
            <Button variant='primary' onClick={() => unconnect()}>
                Disconnect
            </Button>
        </div>
    );
}