import React from 'react';
import { Box } from 'grommet';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = ({ children }) => (
  <Box fill>
    <Header />
    <Box overflow="auto" flex>{children}</Box>
    <Footer />
  </Box>
);

export default Layout;
