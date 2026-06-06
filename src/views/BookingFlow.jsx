import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useBookings } from "../context/BookingContext";
import { services, salon, stylists, timeSlots } from "../data/clientData";
import { Button, Input } from "../components/UI";

const stepNames = ["Service", "Stylist", "Date", "Time", "Details", "Confirmed"];

const formatDate = (dateString, options = {}) =>
  new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(new Date(`${dateString}T12:00:00`));

const getUpcomingDates = () => {
  const dates = [];
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);
  for (let index = 0; dates.length < 14; index += 1) {
    const date = new Date(cursor);
    date.setDate(cursor.getDate() + index);
    if (date.getDay() !== 1) dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
};

export default function BookingFlow() {
  const [searchParams] = useSearchParams();
  const initialService = services.some((item) => item.id === searchParams.get("service"))
    ? searchParams.get("service")
    : "";
  const initialStylist = stylists.some((item) => item.id === searchParams.get("stylist"))
    ? searchParams.get("stylist")
    : "";

  const [step, setStep] = useState(initialService ? (initialStylist ? 3 : 2) : 1);
  const [form, setForm] = useState({
    serviceId: initialService,
    stylistId: initialStylist,
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState(null);
  const { addBooking, getAvailableSlots } = useBookings();
  const upcomingDates = useMemo(getUpcomingDates, []);

  const selectedService = services.find((item) => item.id === form.serviceId);
  const selectedStylist = stylists.find((item) => item.id === form.stylistId);
  const eligibleStylists = form.serviceId
    ? stylists.filter((stylist) => stylist.serviceIds.includes(form.serviceId))
    : stylists;
  const availableSlots = getAvailableSlots(form.date, form.stylistId);

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const chooseAndContinue = (field, value) => {
    setField(field, value);
    window.setTimeout(() => setStep((current) => current + 1), 140);
  };

  const validateDetails = () => {
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = "Please enter your full name.";
    if (!/^[+\d][\d\s-]{8,}$/.test(form.phone)) nextErrors.phone = "Enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitBooking = (event) => {
    event.preventDefault();
    if (!validateDetails()) return;
    const booking = addBooking({
      ...form,
      customerName: form.name.trim(),
      service: selectedService.name,
      stylist: selectedStylist.name,
    });
    setConfirmation(booking);
    setStep(6);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canGoBack = step > 1 && step < 6;

  return (
    <section className="booking-page">
      <div className="container booking-page__header">
        <div>
          <p className="eyebrow">Book your visit</p>
          <h1>{step === 6 ? "You're all set." : stepNames[step - 1]}</h1>
        </div>
        <p>Take your time. This should feel easy.</p>
      </div>

      <div className="container booking-layout">
        <div className="booking-main">
          <div className="stepper" aria-label={`Step ${step} of 6`}>
            {stepNames.map((name, index) => (
              <div className={`stepper__item ${index + 1 <= step ? "is-active" : ""}`} key={name}>
                <span>{index + 1 < step ? <Check size={13} /> : index + 1}</span>
                <small>{name}</small>
              </div>
            ))}
          </div>

          <div className="booking-panel">
            {step === 1 && (
              <div className="booking-step">
                <div className="booking-step__heading">
                  <span>01</span><div><h2>What can we do for you?</h2><p>Choose one service to begin.</p></div>
                </div>
                <div className="selection-grid selection-grid--services">
                  {services.map((service) => (
                    <button
                      className={`selection-card ${form.serviceId === service.id ? "is-selected" : ""}`}
                      key={service.id}
                      onClick={() => chooseAndContinue("serviceId", service.id)}
                    >
                      <span className="selection-card__check"><Check size={15} /></span>
                      <div className="selection-card__head">
                        <h3>{service.name}</h3><strong>₹{service.price.toLocaleString("en-IN")}</strong>
                      </div>
                      <p>{service.description}</p>
                      <small><Clock size={14} /> {service.duration} min</small>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="booking-step">
                <div className="booking-step__heading">
                  <span>02</span><div><h2>Choose your artist.</h2><p>Each is selected for your chosen service.</p></div>
                </div>
                <div className="selection-grid selection-grid--stylists">
                  {eligibleStylists.map((stylist) => (
                    <button
                      className={`stylist-choice ${form.stylistId === stylist.id ? "is-selected" : ""}`}
                      key={stylist.id}
                      onClick={() => chooseAndContinue("stylistId", stylist.id)}
                    >
                      <img src={stylist.image} alt="" />
                      <div>
                        <p>{stylist.role}</p>
                        <h3>{stylist.name}</h3>
                        <span>{stylist.specialty}</span>
                        <small><Star size={13} fill="currentColor" /> {stylist.rating} · {stylist.reviews} reviews</small>
                      </div>
                      <span className="selection-card__check"><Check size={15} /></span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="booking-step">
                <div className="booking-step__heading">
                  <span>03</span><div><h2>Pick a day.</h2><p>Mondays are reserved for rest and education.</p></div>
                </div>
                <div className="date-grid">
                  {upcomingDates.map((date) => {
                    const dateObject = new Date(`${date}T12:00:00`);
                    return (
                      <button
                        key={date}
                        className={`date-card ${form.date === date ? "is-selected" : ""}`}
                        onClick={() => chooseAndContinue("date", date)}
                      >
                        <span>{dateObject.toLocaleDateString("en-US", { weekday: "short" })}</span>
                        <strong>{dateObject.getDate()}</strong>
                        <small>{dateObject.toLocaleDateString("en-US", { month: "short" })}</small>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="booking-step">
                <div className="booking-step__heading">
                  <span>04</span><div><h2>What time suits you?</h2><p>{formatDate(form.date)}</p></div>
                </div>
                <div className="time-grid">
                  {timeSlots.map((time) => {
                    const isAvailable = availableSlots.includes(time);
                    return (
                      <button
                        key={time}
                        disabled={!isAvailable}
                        className={`time-card ${form.time === time ? "is-selected" : ""}`}
                        onClick={() => chooseAndContinue("time", time)}
                      >
                        <Clock size={16} />
                        <span>{time}</span>
                        {!isAvailable && <small>Booked</small>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 5 && (
              <form className="booking-step details-form" onSubmit={submitBooking}>
                <div className="booking-step__heading">
                  <span>05</span><div><h2>A few details.</h2><p>We'll only use these to manage your appointment.</p></div>
                </div>
                <div className="details-form__grid">
                  <Input
                    id="name"
                    label="Full name"
                    value={form.name}
                    onChange={(event) => setField("name", event.target.value)}
                    placeholder="Your full name"
                    error={errors.name}
                    autoComplete="name"
                  />
                  <Input
                    id="phone"
                    label="Phone number"
                    value={form.phone}
                    onChange={(event) => setField("phone", event.target.value)}
                    placeholder="+91 98765 43210"
                    error={errors.phone}
                    autoComplete="tel"
                  />
                  <Input
                    id="email"
                    label="Email address"
                    type="email"
                    value={form.email}
                    onChange={(event) => setField("email", event.target.value)}
                    placeholder="you@example.com"
                    error={errors.email}
                    autoComplete="email"
                    className="details-form__full"
                  />
                </div>
                <label className="consent">
                  <input type="checkbox" required />
                  <span>I agree to receive appointment updates by email and phone.</span>
                </label>
                <Button type="submit" size="lg" className="details-form__submit">
                  Confirm appointment <ArrowRight size={18} />
                </Button>
              </form>
            )}

            {step === 6 && confirmation && (
              <div className="confirmation">
                <div className="confirmation__icon"><CheckCircle2 size={42} /></div>
                <p className="eyebrow">Appointment confirmed</p>
                <h2>See you soon, {confirmation.customerName.split(" ")[0]}.</h2>
                <p className="confirmation__copy">
                  Your request is in. We sent the details to <strong>{confirmation.email}</strong>.
                </p>
                <div className="confirmation__ticket">
                  <div className="confirmation__ticket-head">
                    <span>Booking ID</span><strong>{confirmation.id}</strong>
                  </div>
                  <div><span>Service</span><strong>{confirmation.service}</strong></div>
                  <div><span>Artist</span><strong>{confirmation.stylist}</strong></div>
                  <div><span>Date</span><strong>{formatDate(confirmation.date)}</strong></div>
                  <div><span>Time</span><strong>{confirmation.time}</strong></div>
                </div>
                <div className="confirmation__actions">
                  <Link to="/" className="button button--primary button--lg">Back to home</Link>
                  <Link to="/book" className="button button--secondary button--lg">Book another</Link>
                </div>
              </div>
            )}
          </div>

          {canGoBack && (
            <button className="booking-back" onClick={() => setStep((current) => current - 1)}>
              <ArrowLeft size={17} /> Back
            </button>
          )}
        </div>

        <aside className="booking-summary">
          <p className="booking-summary__title">Your appointment</p>
          {selectedService ? (
            <>
              <div className="booking-summary__service">
                <div><span>Service</span><strong>{selectedService.name}</strong></div>
                <strong>₹{selectedService.price.toLocaleString("en-IN")}</strong>
              </div>
              {selectedStylist && (
                <div className="booking-summary__artist">
                  <img src={selectedStylist.image} alt="" />
                  <div><span>Your artist</span><strong>{selectedStylist.name}</strong></div>
                </div>
              )}
              <div className="booking-summary__details">
                <p><CalendarDays size={16} /> {form.date ? formatDate(form.date, { weekday: "short", year: undefined }) : "Choose a date"}</p>
                <p><Clock size={16} /> {form.time || `${selectedService.duration} minutes`}</p>
              </div>
              <div className="booking-summary__total"><span>Total</span><strong>₹{selectedService.price.toLocaleString("en-IN")}</strong></div>
            </>
          ) : (
            <p className="booking-summary__empty">Your selections will appear here as you book.</p>
          )}
          <div className="booking-summary__salon">
            <p><MapPin size={15} /> {salon.address}</p>
            <p><Phone size={15} /> {salon.phone}</p>
            <p><Mail size={15} /> {salon.email}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
