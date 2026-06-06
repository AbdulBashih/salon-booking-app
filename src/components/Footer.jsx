import { Instagram, MapPin, Phone, Scissors } from "lucide-react";
import { Link } from "react-router-dom";
import { salon } from "../data/clientData";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="brand brand--light">
            <span className="brand__mark"><Scissors size={17} /></span>
            <span><strong>MAISON MANE</strong><small>BEAUTY ATELIER</small></span>
          </div>
          <p>Considered cuts, effortless color, and unhurried beauty rituals.</p>
        </div>
        <div>
          <p className="footer__eyebrow">Explore</p>
          <Link to="/">Our story</Link>
          <a href="/#services">Services</a>
          <a href="/#artists">Our artists</a>
          <Link to="/book">Book a visit</Link>
        </div>
        <div>
          <p className="footer__eyebrow">Visit</p>
          <p><MapPin size={15} /> {salon.address}</p>
          <p><Phone size={15} /> {salon.phone}</p>
          <p>{salon.hours}</p>
        </div>
        <div>
          <p className="footer__eyebrow">Follow along</p>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <Instagram size={16} /> Instagram
          </a>
          <p className="footer__note">A little beauty in your inbox, occasionally.</p>
          <div className="footer__signup">
            <input type="email" placeholder="Email address" aria-label="Email address" />
            <button aria-label="Subscribe">→</button>
          </div>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Maison Mane</span>
        <span>Made with care in Bengaluru</span>
      </div>
    </footer>
  );
}
