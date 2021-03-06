import { WalletProvider } from '../hooks/walletContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  );
}

export default MyApp;
