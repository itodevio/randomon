import { AppProps } from "next/app";
import { Grommet, grommet as grommetTheme} from 'grommet';

import '../styles/index.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Grommet theme={grommetTheme}>
      <Component {...pageProps} />
    </Grommet>
  );
};

export default App;
