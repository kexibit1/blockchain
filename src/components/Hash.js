import React from 'react';
import './hashStyles.css';

const Hash = ({ sendData }) => {
    let { data, nonce, prevHash, hash, numBlock } = sendData;
    return (
        <div className='data'>
            <h2>Data: {data}</h2>
            <p>Nonce: {nonce}</p>
            <p>Previous Hash: {prevHash}</p>
            <p>Hash: {hash}</p>
            <p>Block #{numBlock}</p>
        </div>
    );
}

export default Hash;



