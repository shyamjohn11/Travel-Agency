/* ==========================================
   RJ GROUPS - SEO CONFIGURATION
   Central source of truth for all page metadata
========================================== */

export const SITE = {
  name: "RJ Groups Consultancy and Travel Agency Private Limited",
  shortName: "RJ Groups",
  domain: "https://rjgroups.in",
  description:
    "RJ Groups is a premium travel agency and consultancy based in Kanyakumari, Tamil Nadu. We offer domestic and international tour packages, flight/train/bus ticket booking, resort & hotel booking, recruitment services, financial & tax services, and custom travel planning.",
  address: "Kuzhithurai, Kanyakumari District, Tamil Nadu – 629163, India",
  phone: "+91 9443679373",
  email: "rjgroups2025@gmail.com",
  workingDays: "Mon - Sat",
  workingHours: "9:00 AM – 7:00 PM",
  founded: 2012,
};

/* ==========================================
   PAGE METADATA
   Each route gets unique title, description, keywords
========================================== */

export const PAGES = {
  home: {
    path: "/",
    title: "RJ Groups | World-Class Travel Agency & Tour Operator in Kanyakumari",
    description:
      "RJ Groups Consultancy and Travel Agency Private Limited - Leading travel agency offering domestic & international tour packages, flight/train/bus ticket booking, resort & hotel booking, recruitment services, financial & tax services. Based in Kanyakumari, Tamil Nadu. Plan your journey with trusted experts since 2012.",
    keywords:
      "travel agency, tour packages, domestic tours, international tours, travel agency Kanyakumari, travel agency Tamil Nadu, ticket booking, resort booking, hotel booking, recruitment services, financial services, tax services, honeymoon packages, family packages, adventure tours, Kerala packages, Kashmir packages, Dubai packages, Maldives packages, Singapore packages, Bali packages, business documentation, GST registration",
    type: "TravelAgency",
  },
  about: {
    path: "/about",
    title: "About RJ Groups | Our Journey, Services & Trust Since 2012",
    description:
      "Learn about RJ Groups Consultancy and Travel Agency Private Limited - our story, mission, vision, values, and why trust us for your next journey. Based in Kanyakumari, Tamil Nadu since 2012.",
    keywords:
      "about RJ Groups, travel agency about us, RJ Groups history, travel agency Kanyakumari, travel agency Tamil Nadu, travel company about us, tour operator about page, business travel services, who we are, our story",
    type: "TravelAgency",
  },
  contact: {
    path: "/contact",
    title: "Contact RJ Groups | Plan Your Next Trip | Kanyakumari, Tamil Nadu",
    description:
      "Contact RJ Groups for travel plans, ticket booking, resort & hotel booking, recruitment & financial services. Reach our team in Kanyakumari, Tamil Nadu for your next journey. Call us or fill out the enquiry form.",
    keywords:
      "contact travel agency, travel enquiry, tour booking, RJ Groups contact, contact RJ Groups Kanyakumari, travel agency near me, travel agency Tamil Nadu, enquiry form, business travel contact",
    type: "TravelAgency",
  },
  trips: {
    path: "/trips",
    title: "Trips | Domestic, International & Group Travel | RJ Groups",
    description:
      "Explore RJ Groups trips: domestic getaways, international adventures, group travel. Custom itineraries, verified stays, 24/7 support, easy booking for your perfect getaway. Based in Kanyakumari, Tamil Nadu.",
    keywords:
      "domestic trips, international trips, group travel, travel itineraries, holiday packages, custom trips, family trips, corporate trips, tour packages, travel agency Kanyakumari, travel agency Tamil Nadu, Kerala tours, Kashmir tours, Goa tours, Dubai tours, Maldives packages, Singapore packages, Bali tours",
    type: "TravelAgency",
  },
  packages: {
    path: "/packages",
    title: "Travel Packages | Domestic & International Tours | RJ Groups",
    description:
      "Explore RJ Groups travel packages: domestic getaways, international tours, resort bookings, custom packages. Plan your next journey with trusted experts since 2012. Based in Kanyakumari, Tamil Nadu.",
    keywords:
      "travel packages, tour packages, domestic tours, international tours, beach holidays, hill station tours, honeymoon packages, family packages, custom travel packages, resort booking, travel packages Kanyakumari, travel packages Tamil Nadu, Kerala packages, Kashmir packages, Dubai packages, Maldives packages, Singapore packages, Bali packages, honeymoon packages",
    type: "TravelAgency",
  },
};

/* ==========================================
   DESTINATION DATA - Domestic
========================================== */

export const DOMESTIC_DESTINATIONS = [
  {
    id: "kashmir",
    name: "Kashmir",
    country: "Jammu & Kashmir",
    region: "North India",
    category: "Mountain Escape",
    description:
      "Discover snow-covered mountains, beautiful valleys, and unforgettable Himalayan experiences.",
    image: "/images/domestic-kashmir.jpg",
    imageAlt: "Snow-covered mountains and beautiful valleys of Kashmir",
    bestTimeToVisit: "March to October",
    duration: "5-7 days",
    highlights: [
      "Snow-covered mountains",
      "Beautiful valleys",
      "Himalayan experiences",
      "Dal Lake",
      "Gulmarg",
      "Pahalgam",
    ],
    includes: [
      "Accommodation",
      "Meals",
      "Transport",
      "Sightseeing",
      "Local guide",
    ],
    excludes: [
      "Flight tickets",
      "Personal expenses",
      "Entry fees not mentioned",
    ],
    faqs: [
      {
        question: "What is the best time to visit Kashmir?",
        answer:
          "March to October is the best time to visit Kashmir for pleasant weather and beautiful landscapes.",
      },
      {
        question: "How many days are required for a Kashmir trip?",
        answer:
          "5-7 days is ideal to explore the major attractions of Kashmir comfortably.",
      },
    ],
  },
  {
    id: "kerala",
    name: "Kerala",
    country: "God's Own Country",
    region: "South India",
    category: "Nature & Relaxation",
    description:
      "Experience peaceful backwaters, lush greenery, beaches, and refreshing hill stations.",
    image: "/images/domestic-kerala.jpg",
    imageAlt: "Beautiful backwaters and lush greenery of Kerala",
    bestTimeToVisit: "September to March",
    duration: "5-7 days",
    highlights: [
      "Backwaters",
      "Lush greenery",
      "Beaches",
      "Hill stations",
      "Houseboat stay",
      "Ayurvedic treatments",
    ],
    includes: [
      "Accommodation",
      "Meals",
      "Transport",
      "Houseboat stay",
      "Local guide",
    ],
    excludes: [
      "Flight tickets",
      "Personal expenses",
      "Entry fees not mentioned",
    ],
    faqs: [
      {
        question: "What is the best time to visit Kerala?",
        answer:
          "September to March is the best time to visit Kerala with pleasant weather.",
      },
      {
        question: "Is houseboat stay included in Kerala packages?",
        answer:
          "Yes, houseboat stay in Alleppey backwaters is included in most Kerala packages.",
      },
    ],
  },
  {
    id: "goa",
    name: "Goa",
    country: "Western India",
    region: "West India",
    category: "Beach Holiday",
    description:
      "Relax on golden beaches, enjoy coastal sunsets, and experience vibrant nightlife.",
    image: "/images/domestic-goa.jpg",
    imageAlt: "Beautiful beaches and coastline of Goa",
    bestTimeToVisit: "November to February",
    duration: "4-6 days",
    highlights: [
      "Golden beaches",
      "Coastal sunsets",
      "Vibrant nightlife",
      "Water sports",
      "Portuguese heritage",
    ],
    includes: [
      "Accommodation",
      "Meals",
      "Transport",
      "Sightseeing",
      "Local guide",
    ],
    excludes: [
      "Flight tickets",
      "Personal expenses",
      "Water sports activities",
    ],
    faqs: [
      {
        question: "What is the best time to visit Goa?",
        answer:
          "November to February offers pleasant weather and is the best time to visit Goa.",
      },
      {
        question: "Are water sports included in Goa packages?",
        answer:
          "Water sports are usually not included and can be booked separately at the destination.",
      },
    ],
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    country: "Northwestern India",
    region: "North India",
    category: "Heritage",
    description:
      "Discover royal palaces, historic forts, desert adventures, and rich cultural heritage.",
    image: "/images/domestic-rajasthan.jpg",
    imageAlt: "Royal palaces and historic forts of Rajasthan",
    bestTimeToVisit: "October to March",
    duration: "6-8 days",
    highlights: [
      "Royal palaces",
      "Historic forts",
      "Desert adventures",
      "Rich cultural heritage",
      "Jaipur, Udaipur, Jaisalmer",
    ],
    includes: [
      "Accommodation",
      "Meals",
      "Transport",
      "Sightseeing",
      "Local guide",
    ],
    excludes: [
      "Flight tickets",
      "Personal expenses",
      "Entry fees not mentioned",
    ],
    faqs: [
      {
        question: "What is the best time to visit Rajasthan?",
        answer:
          "October to March offers pleasant weather and is ideal for exploring Rajasthan.",
      },
      {
        question: "Which cities are covered in Rajasthan tours?",
        answer:
          "Jaipur, Udaipur, Jaisalmer, Jodhpur, and Pushkar are major destinations covered.",
      },
    ],
  },
  {
    id: "goa-beach",
    name: "Goa",
    country: "Western India",
    region: "West India",
    category: "Beach Holiday",
    description:
      "Relax on golden beaches, enjoy coastal sunsets, and experience vibrant nightlife.",
    image: "/images/domestic-goa.jpg",
    imageAlt: "Golden beaches and coastline of Goa",
    bestTimeToVisit: "November to February",
    duration: "4-6 days",
    highlights: [
      "Golden beaches",
      "Coastal sunsets",
      "Vibrant nightlife",
      "Water sports",
      "Portuguese heritage",
    ],
    includes: [
      "Accommodation",
      "Meals",
      "Transport",
      "Sightseeing",
      "Local guide",
    ],
    excludes: [
      "Flight tickets",
      "Personal expenses",
      "Water sports activities",
    ],
    faqs: [
      {
        question: "What is the best time to visit Goa?",
        answer:
          "November to February offers pleasant weather and is the best time to visit Goa.",
      },
      {
        question: "Are water sports included in Goa packages?",
        answer:
          "Water sports are usually not included and can be booked separately at the destination.",
      },
    ],
  },
  {
    id: "munnar",
    name: "Munnar",
    country: "Kerala",
    region: "South India",
    category: "Nature Escape",
    description:
      "Escape into endless tea plantations, misty hills, and peaceful natural surroundings.",
    image: "/images/domestic-munnar.jpg",
    imageAlt: "Tea plantations and misty hills of Munnar",
    bestTimeToVisit: "September to March",
    duration: "3-5 days",
    highlights: [
      "Tea plantations",
      "Misty hills",
      "Peaceful surroundings",
      "Eravikulam National Park",
      "Mattupetty Dam",
    ],
    includes: ["Accommodation", "Meals", "Transport", "Sightseeing"],
    excludes: ["Flight tickets", "Personal expenses", "Entry fees not mentioned"],
    faqs: [
      {
        question: "What is the best time to visit Munnar?",
        answer:
          "September to March offers pleasant weather and is ideal for visiting Munnar.",
      },
      {
        question: "Is Munnar suitable for honeymoon?",
        answer:
          "Yes, Munnar's romantic tea gardens and misty hills make it perfect for honeymoon couples.",
      },
    ],
  },
  {
    id: "andaman",
    name: "Andaman",
    country: "Andaman & Nicobar",
    region: "East India",
    category: "Island Holiday",
    description:
      "Explore crystal-clear waters, tropical islands, and beautiful underwater experiences.",
    image: "/images/domestic-andaman.jpg",
    imageAlt: "Crystal-clear waters and tropical islands of Andaman",
    bestTimeToVisit: "October to May",
    duration: "5-7 days",
    highlights: [
      "Crystal-clear waters",
      "Tropical islands",
      "Underwater experiences",
      "Scuba diving",
      "Snorkeling",
    ],
    includes: [
      "Accommodation",
      "Meals",
      "Transport",
      "Sightseeing",
      "Local guide",
    ],
    excludes: [
      "Flight tickets",
      "Personal expenses",
      "Scuba diving equipment",
    ],
    faqs: [
      {
        question: "What is the best time to visit Andaman?",
        answer:
          "October to May offers pleasant weather and is ideal for visiting Andaman.",
      },
      {
        question: "Is scuba diving included in Andaman packages?",
        answer:
          "Scuba diving is usually not included and can be booked separately at the destination.",
      },
    ],
  },
];

/* ==========================================
   INTERNATIONAL DESTINATIONS
========================================== */

export const INTERNATIONAL_DESTINATIONS = [
  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    category: "Luxury Escape",
    description:
      "Discover luxury shopping, iconic skyscrapers, desert adventures and unforgettable city experiences.",
    image: "/images/international-dubai.jpg",
    imageAlt: "Dubai skyline and iconic skyscrapers",
    bestTimeToVisit: "November to March",
    duration: "4-6 days",
    highlights: [
      "Luxury shopping",
      "Iconic skyscrapers",
      "Desert adventures",
      "Burj Khalifa",
      "Palm Jumeirah",
    ],
    includes: ["Accommodation", "Meals", "Transport", "Sightseeing", "Visa assistance"],
    excludes: [
      "Flight tickets",
      "Personal expenses",
      "Visa fees not mentioned",
    ],
    faqs: [
      {
        question: "Do I need a visa for Dubai?",
        answer:
          "Yes, Indian citizens need a visa to visit Dubai. We can assist with visa processing.",
      },
      {
        question: "What is the best time to visit Dubai?",
        answer:
          "November to March offers pleasant weather and is ideal for visiting Dubai.",
      },
    ],
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    region: "Asia",
    category: "City Experience",
    description:
      "Experience modern attractions, beautiful gardens, exciting shopping and vibrant city life.",
    image: "/images/international-singapore.jpg",
    imageAlt: "Singapore skyline and modern cityscape",
    bestTimeToVisit: "February to April",
    duration: "4-6 days",
    highlights: [
      "Modern attractions",
      "Beautiful gardens",
      "Exciting shopping",
      "Vibrant city life",
      "Marina Bay Sands",
    ],
    includes: ["Accommodation", "Meals", "Transport", "Sightseeing", "Visa assistance"],
    excludes: ["Flight tickets", "Personal expenses", "Visa fees not mentioned"],
    faqs: [
      {
        question: "Do I need a visa for Singapore?",
        answer:
          "Yes, Indian citizens need a visa to visit Singapore. We can assist with visa processing.",
      },
      {
        question: "What is the best time to visit Singapore?",
        answer:
          "February to April offers pleasant weather and fewer crowds.",
      },
    ],
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    region: "Indian Ocean",
    category: "Island Paradise",
    description:
      "Relax in crystal-clear waters, private island resorts and beautiful tropical surroundings.",
    image: "/images/international-maldives.jpg",
    imageAlt: "Crystal-clear waters and private island resorts of Maldives",
    bestTimeToVisit: "November to April",
    duration: "4-6 days",
    highlights: [
      "Crystal-clear waters",
      "Private island resorts",
      "Beautiful tropical surroundings",
      "Snorkeling",
      "Romantic getaways",
    ],
    includes: ["Accommodation", "Meals", "Transport", "Sightseeing", "Visa assistance"],
    excludes: ["Flight tickets", "Personal expenses", "Visa fees not mentioned"],
    faqs: [
      {
        question: "Do I need a visa for Maldives?",
        answer:
          "Indian citizens get a free visa on arrival in Maldives for tourism purposes.",
      },
      {
        question: "What is the best time to visit Maldives?",
        answer:
          "November to April offers dry weather and is ideal for visiting Maldives.",
      },
    ],
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    category: "Tropical Getaway",
    description:
      "Explore tropical beaches, peaceful temples, green rice terraces and scenic landscapes.",
    image: "/images/international-bali.jpg",
    imageAlt: "Tropical beaches and rice terraces of Bali",
    bestTimeToVisit: "April to October",
    duration: "5-7 days",
    highlights: [
      "Tropical beaches",
      "Peaceful temples",
      "Green rice terraces",
      "Scenic landscapes",
      "Cultural experiences",
    ],
    includes: ["Accommodation", "Meals", "Transport", "Sightseeing", "Visa assistance"],
    excludes: ["Flight tickets", "Personal expenses", "Visa fees not mentioned"],
    faqs: [
      {
        question: "Do I need a visa for Bali?",
        answer:
          "Indian citizens can get a visa on arrival in Bali for tourism purposes.",
      },
      {
        question: "What is the best time to visit Bali?",
        answer:
          "April to October offers dry weather and is ideal for visiting Bali.",
      },
    ],
  },
];

/* ==========================================
   FAQ DATA FOR AEO
========================================== */

export const DOMESTIC_FAQS = [
  {
    question: "What are the best domestic holiday destinations in India?",
    answer:
      "RJ Groups offers domestic tour packages to Kashmir, Kerala, Goa, Rajasthan, Munnar, Andaman, Ooty, and Manali. Each destination offers unique experiences from hill stations to beaches.",
  },
  {
    question: "How can I book a domestic tour package?",
    answer:
      "You can book a domestic tour package by filling out the enquiry form on our website, calling us at +91 9443679373, or emailing us at rjgroups2025@gmail.com.",
  },
  {
    question: "Can I customize my domestic tour itinerary?",
    answer:
      "Yes, we offer customizable domestic tour packages. Share your requirements, preferred destinations, travel dates, and budget, and our team will design a custom itinerary for you.",
  },
  {
    question: "Do you provide family tour packages in India?",
    answer:
      "Yes, we offer family tour packages to destinations like Kerala, Goa, Kashmir, Rajasthan, and more. Our packages are designed for families with children and senior citizens.",
  },
  {
    question: "How can I get a domestic tour quotation?",
    answer:
      "Submit an enquiry with your destination, travel dates, number of travellers, and preferred trip type. Our team will review your requirements and send you a detailed quotation.",
  },
  {
    question: "What is included in a domestic tour package?",
    answer:
      "Our domestic tour packages typically include accommodation, meals, transport, sightseeing, and local guide services. Flight tickets and personal expenses are usually not included.",
  },
];

export const INTERNATIONAL_FAQS = [
  {
    question: "How can I book an international tour package from India?",
    answer:
      "You can book an international tour package by filling out our enquiry form, calling us at +91 9443679373, or emailing us at rjgroups2025@gmail.com. Our team will guide you through the booking process.",
  },
  {
    question: "Which countries are popular for international holidays?",
    answer:
      "We offer international tour packages to Dubai, Singapore, Maldives, Bali, Thailand, Malaysia, and other popular international destinations.",
  },
  {
    question: "What documents are required for international travel?",
    answer:
      "You need a valid passport, visa (if required), travel insurance, and confirmed return tickets. Visa requirements vary by destination - please check with our team for specific requirements.",
  },
  {
    question: "Do international packages include flights?",
    answer:
      "Flight tickets are typically not included in our international packages and need to be booked separately. We can assist with flight bookings upon request.",
  },
  {
    question: "How can I customize my international holiday?",
    answer:
      "Share your preferred destinations, travel dates, number of travellers, and budget with us. Our travel experts will design a custom international itinerary for you.",
  },
  {
    question: "What is the best time to visit Dubai?",
    answer:
      "November to March offers pleasant weather and is the best time to visit Dubai and other UAE destinations.",
  },
  {
    question: "What is the best time to visit Singapore?",
    answer:
      "February to April offers pleasant weather and fewer crowds, making it ideal for visiting Singapore.",
  },
];

export default { SITE, PAGES, DOMESTIC_DESTINATIONS, INTERNATIONAL_DESTINATIONS, DOMESTIC_FAQS, INTERNATIONAL_FAQS };
