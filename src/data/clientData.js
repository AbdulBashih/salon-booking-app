import anayaImage from "../assets/stylist-anaya.png";
import rohanImage from "../assets/stylist-rohan.png";
import meeraImage from "../assets/stylist-meera.png";

export const salon = {
  name: "Maison Mane",
  tagline: "Your ritual. Refined.",
  phone: "+91 98765 43210",
  email: "hello@maisonmane.com",
  address: "18 Lavelle Road, Bengaluru",
  hours: "Tue - Sun, 9:00 AM - 7:00 PM",
};

export const services = [
  {
    id: "haircut",
    name: "Signature Haircut",
    shortName: "Haircut",
    description: "A considered cut shaped around your texture, features and daily ritual.",
    duration: 60,
    price: 1800,
    icon: "scissors",
  },
  {
    id: "styling",
    name: "Hair Styling",
    shortName: "Styling",
    description: "Polished blowouts, soft waves or event-ready styling with lasting finish.",
    duration: 45,
    price: 1500,
    icon: "sparkles",
  },
  {
    id: "coloring",
    name: "Bespoke Color",
    shortName: "Color",
    description: "Dimensional, healthy-looking color tailored to your tone and lifestyle.",
    duration: 120,
    price: 4500,
    icon: "palette",
  },
  {
    id: "beard",
    name: "Beard Ritual",
    shortName: "Beard Trim",
    description: "Precision shaping, warm towel preparation and a nourishing finish.",
    duration: 30,
    price: 900,
    icon: "razor",
  },
  {
    id: "facial",
    name: "Botanical Facial",
    shortName: "Facial",
    description: "A restorative skin ritual with massage, hydration and luminous results.",
    duration: 60,
    price: 2400,
    icon: "leaf",
  },
  {
    id: "makeup",
    name: "Occasion Makeup",
    shortName: "Makeup",
    description: "Modern, camera-ready makeup that still feels unmistakably like you.",
    duration: 75,
    price: 3200,
    icon: "wand",
  },
];

export const stylists = [
  {
    id: "anaya",
    name: "Anaya Rao",
    role: "Creative Director",
    specialty: "Precision cuts & texture",
    rating: 4.9,
    reviews: 128,
    experience: "11 years",
    image: anayaImage,
    serviceIds: ["haircut", "styling", "coloring"],
  },
  {
    id: "rohan",
    name: "Rohan Kapoor",
    role: "Grooming Specialist",
    specialty: "Men's cuts & beard design",
    rating: 4.8,
    reviews: 94,
    experience: "8 years",
    image: rohanImage,
    serviceIds: ["haircut", "styling", "beard", "facial"],
  },
  {
    id: "meera",
    name: "Meera Iyer",
    role: "Color & Beauty Artist",
    specialty: "Lived-in color & makeup",
    rating: 4.9,
    reviews: 116,
    experience: "9 years",
    image: meeraImage,
    serviceIds: ["styling", "coloring", "facial", "makeup"],
  },
];

export const testimonials = [
  {
    id: 1,
    quote:
      "The first salon that truly listened before picking up the scissors. My hair has never felt more like me.",
    name: "Aditi S.",
    service: "Signature Haircut",
  },
  {
    id: 2,
    quote:
      "Beautiful space, thoughtful details, and color that grew out effortlessly. Meera is exceptional.",
    name: "Naina P.",
    service: "Bespoke Color",
  },
  {
    id: 3,
    quote:
      "Rohan turned a routine trim into the best hour of my week. Precise, relaxed and consistently excellent.",
    name: "Arjun M.",
    service: "Beard Ritual",
  },
];

export const clientLogos = [
  "VOGUE",
  "ELLE",
  "GQ",
  "TATLER",
  "BRIDES",
];

export const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];
