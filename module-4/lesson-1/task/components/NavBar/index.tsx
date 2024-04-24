import Link from 'next/link';

/**
 * The navigation bar for the main page
 */
const NavBar = () => (
  <nav className="flex">
    <ul>
      <li className="inline-block">
        <Link href="/">HOME</Link>
      </li>
      <li>
        <Link href="/about">ABOUT</Link>
      </li>
      <li>
        <Link href="/portfolio">PORTFOLIO</Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
