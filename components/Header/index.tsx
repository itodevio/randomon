import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from 'grommet';

import style from './style.module.css';

const Header: React.FC = () => {
  return (
    <nav className={style['header']}>
      <Link href="/">
        <a>
          <Image 
            src="/logo_bat.png"
            alt="website logo"
            width={75}
            height={75}
          />
        </a>
      </Link>
      <div>
        <Link href="/">
          <a className="mr-10">
            <Button primary label="Randomize!" />
          </a>
        </Link>
        <Link href="/about">
          <a className="mr-10">About</a>
        </Link>
        <Link href="/contact">
          <a className="mr-10">Contact</a>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
