import { AppProps } from "next/app";
import Head from 'next/head';
import { Grommet, grommet as grommetTheme} from 'grommet';

import '../styles/index.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Grommet theme={grommetTheme}>
      <Head>
        <title>Randomon</title>
      </Head>
      <Component {...pageProps} />
    </Grommet>
  );
};

export default App;
