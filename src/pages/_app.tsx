import { AppProps } from 'next/app';
import Head from 'next/head';
import { Grommet, grommet as grommetTheme } from 'grommet';

import '../styles/index.css';

const App = ({ Component, pageProps }: AppProps) => (
  <Grommet theme={grommetTheme} full>
    <Head>
      <title>Randomon</title>
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </Grommet>
);

export default App;
