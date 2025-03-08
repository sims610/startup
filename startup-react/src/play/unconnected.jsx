import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unconnected(props) {
    const [partner, setPartner] = React.useState(props.partner);
    const [displayError, setDisplayError] = React.useState(null);

    async function connectPartner() {
        localStorage.setItem('partner', partner);
        props.onConnect(partner);
    }

    return (
        <>
            <div>
                <span>Connect with user: </span>
                <input className='partner-input' type="text" placeholder="users@email.com" value={partner} onChange={(e) => setPartner(e.target.value)}/>
                <Button variant='primary' onClick={() => connectPartner()} disabled={!partner}>
                    Connect
                </Button>
            </div>

            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
}