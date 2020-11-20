import * as React from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { Logout } from './Logout';

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'This is the default title',
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Link href="/">
          <a style={{ padding: 10 }}>Home</a>
        </Link>
        <Link href="/register">
          <a style={{ padding: 10 }}>register</a>
        </Link>
        <Link href="/login">
          <a style={{ padding: 10 }}>login</a>
        </Link>
        <Link href="/forgot_password">
          <a style={{ padding: 10 }}>forgot password</a>
        </Link>
        <Logout />

        <Link href="/list-fc">
          <a style={{ padding: 10 }}>List as Functional Component</a>
        </Link>
        <Link href="/list-class">
          <a style={{ padding: 10 }}>List As Class</a>
        </Link>
        <Link href="/about">
          <a style={{ padding: 10 }}>About</a>
        </Link>
        <Link href="/apollo-stuff">
          <a style={{ padding: 10 }}>Apollo Stuff</a>
        </Link>
        <Link href="/static_props_page">
          <a style={{ padding: 10 }}>static props page</a>
        </Link>
        <Link href="/server_side_rendered_page?abc=123">
          <a style={{ padding: 10 }}>server side rendered page</a>
        </Link>
        <Link href="/static_asset">
          <a style={{ padding: 10 }}>static asset from public dir</a>
        </Link>
        <Link href="/env_vars">
          <a style={{ padding: 10 }}>env vars</a>
        </Link>
        <Link href="/dynamic">
          <a style={{ padding: 10 }}>dynamically loaded component</a>
        </Link>
        <Link href="/oauth">
          <a style={{ padding: 10 }}>oauth</a>
        </Link>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Link key={i} href="/items/[id]" as={`/items/${i}`}>
            <a style={{ padding: 10 }}>{`Dynamic Route ${i}`}</a>
          </Link>
        ))}
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;
