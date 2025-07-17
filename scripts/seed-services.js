const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const services = [
  {
    title: "Royal Enfield Himalayan",
    description: "Perfect adventure bike for Ladakh's challenging terrain. Built for comfort and reliability on long journeys.",
    image: "/services/bike.jpg",
    price: 1500,
    category: "bike",
    features: [
      "411cc engine",
      "Full safety gear included",
      "24/7 roadside assistance",
      "GPS tracking",
      "Insurance coverage"
    ]
  },
  {
    title: "KTM Duke 390",
    description: "High-performance bike for thrill-seekers. Perfect for experienced riders who want power and agility.",
    image: "/services/bike.jpg",
    price: 2000,
    category: "bike",
    features: [
      "373cc engine",
      "Premium safety gear",
      "Performance tires",
      "Emergency support",
      "Fuel included"
    ]
  },
  {
    title: "BMW G310R",
    description: "Premium German engineering for the ultimate riding experience in Ladakh's majestic landscapes.",
    image: "/services/bike.jpg",
    price: 2500,
    category: "bike",
    features: [
      "313cc engine",
      "BMW branded gear",
      "Premium service",
      "Helmet and jacket",
      "Breakdown assistance"
    ]
  },
  {
    title: "Toyota Innova",
    description: "Comfortable and spacious SUV perfect for family trips and group tours in Ladakh.",
    image: "/services/car.jpg",
    price: 3500,
    category: "car",
    features: [
      "7-seater capacity",
      "Professional driver",
      "AC and heating",
      "Fuel included",
      "Insurance coverage"
    ]
  },
  {
    title: "Mahindra Scorpio",
    description: "Rugged SUV built for Ladakh's challenging roads. Perfect for adventure seekers.",
    image: "/services/car.jpg",
    price: 4000,
    category: "car",
    features: [
      "4x4 capability",
      "High ground clearance",
      "Experienced driver",
      "Off-road ready",
      "Emergency kit"
    ]
  },
  {
    title: "Tata Safari",
    description: "Luxury SUV with modern amenities for a comfortable journey through Ladakh.",
    image: "/services/car.jpg",
    price: 4500,
    category: "car",
    features: [
      "Premium interior",
      "Advanced safety features",
      "Professional chauffeur",
      "WiFi hotspot",
      "Refreshments included"
    ]
  },
  {
    title: "Traditional Ladakhi Homestay",
    description: "Experience authentic Ladakhi hospitality in traditional homes with local families.",
    image: "/services/homestay.jpg",
    price: 1000,
    category: "homestay",
    features: [
      "Traditional architecture",
      "Home-cooked meals",
      "Cultural experiences",
      "Local family interaction",
      "Authentic atmosphere"
    ]
  },
  {
    title: "Mountain View Homestay",
    description: "Comfortable homestay with stunning mountain views and modern amenities.",
    image: "/services/homestay.jpg",
    price: 1500,
    category: "homestay",
    features: [
      "Mountain views",
      "Private bathroom",
      "Heating facilities",
      "Local cuisine",
      "Cultural activities"
    ]
  },
  {
    title: "Ladakhi Food Tour",
    description: "Explore the rich flavors of Ladakhi cuisine with guided food tours and cooking classes.",
    image: "/services/food.jpg",
    price: 500,
    category: "food",
    features: [
      "Local restaurant visits",
      "Traditional cooking classes",
      "Street food exploration",
      "Cultural food stories",
      "Dietary accommodations"
    ]
  },
  {
    title: "Markha Valley Trek",
    description: "Embark on an unforgettable trek through one of Ladakh's most beautiful valleys.",
    image: "/services/treeking.jpg",
    price: 2000,
    category: "trekking",
    features: [
      "Expert guides",
      "All equipment provided",
      "Accommodation included",
      "Meals provided",
      "Safety equipment"
    ]
  },
  {
    title: "Stok Kangri Trek",
    description: "Challenge yourself with this high-altitude trek to one of Ladakh's highest peaks.",
    image: "/services/treeking.jpg",
    price: 3000,
    category: "trekking",
    features: [
      "High-altitude training",
      "Professional guides",
      "Complete equipment",
      "Medical support",
      "Permit assistance"
    ]
  },
  {
    title: "Pangong Lake Tour",
    description: "Visit the famous Pangong Lake, featured in many Bollywood movies, with guided tours.",
    image: "/services/tours.jpg",
    price: 1500,
    category: "tours",
    features: [
      "Professional guide",
      "Transportation included",
      "Photography spots",
      "Cultural insights",
      "Refreshments"
    ]
  },
  {
    title: "Nubra Valley Tour",
    description: "Explore the beautiful Nubra Valley with its sand dunes and monasteries.",
    image: "/services/tours.jpg",
    price: 1800,
    category: "tours",
    features: [
      "Valley exploration",
      "Monastery visits",
      "Sand dune activities",
      "Local interactions",
      "Scenic photography"
    ]
  }
];

async function seedServices() {
  try {
    console.log('Starting to seed services...');
    
    // Create new services (skip clearing existing ones to avoid MongoDB replica set requirement)
    for (const service of services) {
      // Check if service already exists
      const existingService = await prisma.service.findFirst({
        where: {
          title: service.title,
          category: service.category
        }
      });
      
      if (!existingService) {
        await prisma.service.create({
          data: {
            ...service,
            features: JSON.stringify(service.features) // Convert array to JSON string
          }
        });
        console.log(`Created service: ${service.title}`);
      } else {
        console.log(`Service already exists: ${service.title}`);
      }
    }
    
    console.log('All services seeded successfully!');
  } catch (error) {
    console.error('Error seeding services:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedServices(); 