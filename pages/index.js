import Head from 'next/head';
import { Layout } from '../components/layout';
import { Header } from '../components/header';
import { InputActions } from '../components/inputAction';
import { useWallet } from '../hooks/walletContext';

export default function Home() {
  const [currAccount, connectWallet] = useWallet();

  return (
    <div className='bg-gray-900 text-white h-screen flex flex-col justify-center'>
      <Head>
        <title>Favorite Pokemon</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <Header />
        {currAccount ? (
          <InputActions />
        ) : (
          <button
            className='inline-flex justify-center mt-10 px-10 py-1.5 border border-transparent text-base font-semibold rounded shadow-sm text-white text-center tracking-wider bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2'
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </Layout>
    </div>
  );
}
