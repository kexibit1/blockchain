import React, { useState } from 'react';
import Hash from './components/Hash';
import sha256 from 'sha256';


function App() {
  const [data, setData] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [lastHash, setLastHash] = useState('0000000000000000000000000000000000000000000000000000000000000000');
  const [currentBlock, setCurrentBlock] = useState(1);
  let currentNonce = 0;

  const mine = () => {
    let hash = sha256(currentNonce + currentText + lastHash);
    while (hash.substring(0, 3) !== '000') {
      hash = sha256(currentNonce + currentText + lastHash);
      if (hash.substring(0, 3) === '000') {
        break;
      }
      currentNonce++;
    }
    return [currentNonce, hash];
  }

  const pushData = () => {
    const [curNonce, currentHash] = mine();
    console.log(`${currentNonce + currentText + lastHash}`)
    setData(prevData => [...prevData, { nonce: curNonce, data: currentText, prevHash: lastHash, hash: currentHash, numBlock: currentBlock }]);
    setCurrentText('');
    setCurrentBlock(prev => prev + 1);
    setLastHash(currentHash);
    currentNonce = 0;
  }

  const updateText = (event) => {
    setCurrentText(event.target.value)
  }


  return (
    <>
      {data.map((hash, index) => (
        <Hash key={index} sendData={hash} />
      ))}
      <div className='inputData'>
        <input type='text' value={currentText} onChange={updateText} />
        <button onClick={() => pushData()}>Push</button>
      </div>
    </>
  );
}

export default App;
