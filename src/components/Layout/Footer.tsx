import React from 'react';
import Link from 'next/link';
import { Footer } from 'grommet';

const FooterComponent: React.FC = () => (
  <Footer justify="center" pad={{ vertical: 'medium' }}>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/about">
      <a>About</a>
    </Link>
    <Link href="/contact">
      <a>Contact</a>
    </Link>
  </Footer>
);

export default FooterComponent;
