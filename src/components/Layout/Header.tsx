import React from 'react';
import Link from 'next/link';

import { Button } from 'grommet';

import style from './layout.module.scss';

const Header: React.FC = () => {
  return (
    <nav className={style['header']}>
      <Link href="/">
        <a>
          <img 
            src="/logo_bat.png"
            alt="website logo"
            width={75}
            height={75}
          />
        </a>
      </Link>
      <div className={style['right-side-header']}>
        <Link href="/">
          <a>
            <Button primary label="Randomize!" />
          </a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
