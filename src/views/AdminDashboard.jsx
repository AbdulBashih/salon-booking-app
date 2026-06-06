import {
  CalendarCheck2,
  CalendarClock,
  Check,
  CircleX,
  MoreHorizontal,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge, Button, Card, Modal, Select } from "../components/UI";
import { useBookings } from "../context/BookingContext";
import { services, stylists } from "../data/clientData";

const statusTone = {
  pending: "warning",
  confirmed: "success",
  cancelled: "danger",
};

const formatShortDate = (date) =>
  new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(
    new Date(`${date}T12:00:00`),
  );

export default function AdminDashboard() {
  const { bookings, updateBookingStatus, cancelBooking, deleteBooking } = useBookings();
  const [filters, setFilters] = useState({ status: "all", stylist: "all", service: "all" });
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const stats = {
    total: bookings.length,
    pending: bookings.filter((booking) => booking.status === "pending").length,
    confirmed: bookings.filter((booking) => booking.status === "confirmed").length,
    cancelled: bookings.filter((booking) => booking.status === "cancelled").length,
  };

  const filteredBookings = useMemo(
    () =>
      bookings.filter((booking) => {
        const query = search.toLowerCase();
        const matchesSearch =
          booking.customerName.toLowerCase().includes(query) ||
          booking.id.toLowerCase().includes(query) ||
          booking.email.toLowerCase().includes(query);
        return (
          matchesSearch &&
          (filters.status === "all" || booking.status === filters.status) &&
          (filters.stylist === "all" || booking.stylistId === filters.stylist) &&
          (filters.service === "all" || booking.serviceId === filters.service)
        );
      }),
    [bookings, filters, search],
  );

  const setFilter = (name, value) => setFilters((current) => ({ ...current, [name]: value }));
  const clearFilters = () => {
    setFilters({ status: "all", stylist: "all", service: "all" });
    setSearch("");
  };

  const handleAction = (callback) => {
    callback();
    setMenuOpen(null);
  };

  return (
    <section className="admin-page">
      <div className="container admin-header">
        <div>
          <p className="eyebrow">Maison Mane</p>
          <h1>Good morning.</h1>
          <p>Here’s what’s happening with your appointments.</p>
        </div>
        <div className="admin-header__date">
          <CalendarCheck2 size={18} />
          {new Intl.DateTimeFormat("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
          }).format(new Date())}
        </div>
      </div>

      <div className="container">
        <div className="stats-grid">
          <Card as="article" className="stat-card">
            <span className="stat-card__icon stat-card__icon--neutral"><Users /></span>
            <div><p>Total bookings</p><strong>{stats.total}</strong><small>All appointments</small></div>
          </Card>
          <Card as="article" className="stat-card">
            <span className="stat-card__icon stat-card__icon--warning"><CalendarClock /></span>
            <div><p>Pending</p><strong>{stats.pending}</strong><small>Needs attention</small></div>
          </Card>
          <Card as="article" className="stat-card">
            <span className="stat-card__icon stat-card__icon--success"><Check /></span>
            <div><p>Confirmed</p><strong>{stats.confirmed}</strong><small>Ready to welcome</small></div>
          </Card>
          <Card as="article" className="stat-card">
            <span className="stat-card__icon stat-card__icon--danger"><CircleX /></span>
            <div><p>Cancelled</p><strong>{stats.cancelled}</strong><small>Archived visits</small></div>
          </Card>
        </div>

        <div className="admin-card">
          <div className="admin-card__heading">
            <div><h2>Appointments</h2><p>{filteredBookings.length} bookings shown</p></div>
            <Button onClick={() => window.location.assign("/book")}>New booking</Button>
          </div>

          <div className="filters">
            <label className="search-field">
              <Search size={17} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search customer or booking ID"
              />
            </label>
            <Select
              aria-label="Filter by status"
              value={filters.status}
              onChange={(event) => setFilter("status", event.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </Select>
            <Select
              aria-label="Filter by stylist"
              value={filters.stylist}
              onChange={(event) => setFilter("stylist", event.target.value)}
            >
              <option value="all">All stylists</option>
              {stylists.map((stylist) => <option value={stylist.id} key={stylist.id}>{stylist.name}</option>)}
            </Select>
            <Select
              aria-label="Filter by service"
              value={filters.service}
              onChange={(event) => setFilter("service", event.target.value)}
            >
              <option value="all">All services</option>
              {services.map((service) => <option value={service.id} key={service.id}>{service.name}</option>)}
            </Select>
            {(search || Object.values(filters).some((value) => value !== "all")) && (
              <button className="clear-filters" onClick={clearFilters}><X size={15} /> Clear</button>
            )}
          </div>

          <div className="table-wrap">
            <table className="booking-table">
              <thead>
                <tr>
                  <th>Booking</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Stylist</th>
                  <th>Date & time</th>
                  <th>Status</th>
                  <th><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td data-label="Booking"><strong className="booking-id">{booking.id}</strong></td>
                    <td data-label="Customer">
                      <strong>{booking.customerName}</strong>
                      <span className="table-subtitle">{booking.phone}</span>
                    </td>
                    <td data-label="Service">{booking.service}</td>
                    <td data-label="Stylist">{booking.stylist}</td>
                    <td data-label="Date & time">
                      <strong>{formatShortDate(booking.date)}</strong>
                      <span className="table-subtitle">{booking.time}</span>
                    </td>
                    <td data-label="Status">
                      <Badge tone={statusTone[booking.status]}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="actions-cell">
                      <button
                        className="action-trigger"
                        aria-label={`Actions for ${booking.customerName}`}
                        onClick={() => setMenuOpen(menuOpen === booking.id ? null : booking.id)}
                      >
                        <MoreHorizontal size={19} />
                      </button>
                      {menuOpen === booking.id && (
                        <div className="action-menu">
                          <button onClick={() => handleAction(() => updateBookingStatus(booking.id, "confirmed"))}>
                            <Check size={15} /> Confirm
                          </button>
                          <button onClick={() => handleAction(() => cancelBooking(booking.id))}>
                            <CircleX size={15} /> Cancel
                          </button>
                          <button className="danger" onClick={() => { setDeleteTarget(booking); setMenuOpen(null); }}>
                            <Trash2 size={15} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredBookings.length === 0 && (
              <div className="empty-state">
                <CalendarClock size={34} />
                <h3>No appointments found</h3>
                <p>{bookings.length ? "Try changing your filters." : "New bookings will appear here."}</p>
                {bookings.length > 0 && <button onClick={clearFilters}>Clear all filters</button>}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete appointment?"
        actions={
          <>
            <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Keep booking</Button>
            <Button
              variant="danger"
              onClick={() => {
                deleteBooking(deleteTarget.id);
                setDeleteTarget(null);
              }}
            >
              Delete permanently
            </Button>
          </>
        }
      >
        <p>
          This will permanently remove <strong>{deleteTarget?.customerName}</strong>’s booking. This action
          cannot be undone.
        </p>
      </Modal>
    </section>
  );
}
