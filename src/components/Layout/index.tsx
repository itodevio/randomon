import React, { ReactNode } from 'react';
import Header from './Header';
import style from './layout.module.scss';

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="h-screen">
    <Header />
    <div className="h-full">{props.children}</div>
  </div>
);

export default Layout;
