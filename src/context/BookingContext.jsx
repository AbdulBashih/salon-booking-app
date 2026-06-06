import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { timeSlots } from "../data/clientData";

const BookingContext = createContext(null);
const STORAGE_KEY = "maison-mane-bookings";

const readStoredBookings = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(readStoredBookings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (booking) => {
    const created = {
      ...booking,
      id: `MM-${Date.now().toString().slice(-6)}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setBookings((current) => [created, ...current]);
    return created;
  };

  const cancelBooking = (id) => {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === id ? { ...booking, status: "cancelled" } : booking,
      ),
    );
  };

  const updateBookingStatus = (id, status) => {
    setBookings((current) =>
      current.map((booking) => (booking.id === id ? { ...booking, status } : booking)),
    );
  };

  const deleteBooking = (id) => {
    setBookings((current) => current.filter((booking) => booking.id !== id));
  };

  const getAvailableSlots = (date, stylistId) => {
    if (!date || !stylistId) return timeSlots;
    const occupied = bookings
      .filter(
        (booking) =>
          booking.date === date &&
          booking.stylistId === stylistId &&
          booking.status !== "cancelled",
      )
      .map((booking) => booking.time);
    return timeSlots.filter((slot) => !occupied.includes(slot));
  };

  const value = useMemo(
    () => ({
      bookings,
      addBooking,
      cancelBooking,
      updateBookingStatus,
      deleteBooking,
      getAvailableSlots,
    }),
    [bookings],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBookings must be used within BookingProvider");
  return context;
}
