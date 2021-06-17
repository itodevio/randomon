import React from 'react';
import Link from 'next/link';

import { Header } from 'grommet';

import style from './layout.module.scss';

const HeaderComponent: React.FC = () => {
  return (
    <Header pad={{ horizontal: 'large', vertical: 'medium'}}>
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
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </div>
    </Header>
  );
};

export default HeaderComponent;
