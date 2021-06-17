import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box } from 'grommet';
import style from './layout.module.scss';

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <Box fill>
    <Header />
    <Box overflow="auto" flex>{props.children}</Box>
    <Footer />
  </Box>
);

export default Layout;
