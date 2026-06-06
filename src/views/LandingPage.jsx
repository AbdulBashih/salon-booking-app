import {
  ArrowRight,
  Leaf,
  Palette,
  Quote,
  Scissors,
  Sparkles,
  Star,
  WandSparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/salon-hero.png";
import { clientLogos, services, stylists, testimonials } from "../data/clientData";

const serviceIcons = {
  scissors: Scissors,
  sparkles: Sparkles,
  palette: Palette,
  razor: Scissors,
  leaf: Leaf,
  wand: WandSparkles,
};

export default function LandingPage() {
  return (
    <>
      <section className="hero">
        <img className="hero__image" src={heroImage} alt="Warm, elegant Maison Mane salon interior" />
        <div className="hero__overlay" />
        <div className="container hero__content">
          <p className="eyebrow">Bengaluru · Beauty Atelier</p>
          <h1>Beauty, with<br /><em>intention.</em></h1>
          <p className="hero__copy">
            Considered cuts, effortless color, and unhurried rituals designed around the way you live.
          </p>
          <div className="hero__actions">
            <Link to="/book" className="button button--primary button--lg">
              Book an appointment <ArrowRight size={18} />
            </Link>
            <a href="#services" className="text-link">Explore our services</a>
          </div>
          <div className="hero__meta">
            <div><strong>4.9</strong><span><Star size={14} fill="currentColor" /> 338 reviews</span></div>
            <div><strong>Tue - Sun</strong><span>9:00 AM - 7:00 PM</span></div>
          </div>
        </div>
      </section>

      <section className="press-strip" aria-label="Featured in">
        <div className="container press-strip__inner">
          <span className="press-strip__label">As seen in</span>
          {clientLogos.map((logo) => <span key={logo} className="press-logo">{logo}</span>)}
        </div>
      </section>

      <section className="section section--services" id="services">
        <div className="container">
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">The menu</p>
              <h2>Rituals made<br />personal.</h2>
            </div>
            <p>
              Every service begins with a thoughtful consultation and ends with the knowledge to keep
              the feeling going at home.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon];
              return (
                <Link
                  to={`/book?service=${service.id}`}
                  className="service-card"
                  key={service.id}
                  style={{ "--delay": `${index * 40}ms` }}
                >
                  <div className="service-card__icon"><Icon size={21} /></div>
                  <div className="service-card__top">
                    <h3>{service.name}</h3>
                    <span>₹{service.price.toLocaleString("en-IN")}</span>
                  </div>
                  <p>{service.description}</p>
                  <div className="service-card__footer">
                    <span>{service.duration} minutes</span>
                    <ArrowRight size={18} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--artists" id="artists">
        <div className="container">
          <div className="section-heading section-heading--center">
            <p className="eyebrow">Meet the artists</p>
            <h2>Good hair starts<br />with good listeners.</h2>
          </div>
          <div className="artists-grid">
            {stylists.map((stylist) => (
              <article className="artist-card" key={stylist.id}>
                <div className="artist-card__image-wrap">
                  <img src={stylist.image} alt={`${stylist.name}, ${stylist.role}`} />
                  <span>{stylist.experience} experience</span>
                </div>
                <div className="artist-card__body">
                  <div>
                    <p className="artist-card__role">{stylist.role}</p>
                    <h3>{stylist.name}</h3>
                    <p>{stylist.specialty}</p>
                  </div>
                  <div className="artist-card__rating">
                    <Star size={14} fill="currentColor" /> {stylist.rating}
                  </div>
                </div>
                <Link to={`/book?stylist=${stylist.id}`} className="artist-card__link">
                  Book with {stylist.name.split(" ")[0]} <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--testimonials">
        <div className="container">
          <div className="section-heading section-heading--center">
            <p className="eyebrow">Kind words</p>
            <h2>From the chair.</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.id}>
                <Quote size={28} />
                <p>“{testimonial.quote}”</p>
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.service}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band__inner">
          <div>
            <p className="eyebrow">A little time for you</p>
            <h2>Ready for your next<br /><em>good hair day?</em></h2>
          </div>
          <Link to="/book" className="button button--light button--lg">
            Find your appointment <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
