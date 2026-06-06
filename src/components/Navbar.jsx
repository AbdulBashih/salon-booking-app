import { Menu, Scissors, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="brand" onClick={closeMenu} aria-label="Maison Mane home">
          <span className="brand__mark"><Scissors size={17} /></span>
          <span>
            <strong>MAISON MANE</strong>
            <small>BEAUTY ATELIER</small>
          </span>
        </Link>

        <button
          className="navbar__toggle"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav className={`navbar__links ${open ? "is-open" : ""}`} aria-label="Main navigation">
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <a href="/#services" onClick={closeMenu}>Services</a>
          <a href="/#artists" onClick={closeMenu}>Artists</a>
          <NavLink to="/admin" onClick={closeMenu}>Admin</NavLink>
          <Link to="/book" className="nav-cta" onClick={closeMenu}>Book now</Link>
        </nav>
      </div>
    </header>
  );
}
