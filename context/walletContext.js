import { createContext, useContext, useEffect, useState } from 'react';
const WalletContext = createContext();

const checkIfWalletIsConnected = () => {
  const { ethereum } = window;
  if (!ethereum) {
    console.log('make sure to have metamask');
    return;
  } else {
    console.log('we have the ethereum object', ethereum);
  }
};

function WalletProvider(props) {
  const [currAccount, setCurrAccount] = useState('');

  useEffect(() => {
    connectWallet();
  });

  const connectWallet = () => {
    checkIfWalletIsConnected();
    ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        console.log('Connected: ', accounts[0]);
        setCurrAccount(accounts[0]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <WalletContext.Provider value={[currAccount, connectWallet]} {...props} />
  );
}

function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within the WalletProvider context');
  }
  return context;
}

export { WalletProvider, useWallet };
