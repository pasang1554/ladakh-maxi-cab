import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, image, price, category, features } = body;

    const service = await prisma.service.create({
      data: {
        title,
        description,
        image,
        price: parseFloat(price),
        category: category || 'general',
        features: JSON.stringify(Array.isArray(features) ? features : []) as any,
        isAvailable: true,
      },
    });

    // Parse features before returning
    return NextResponse.json({ ...service, features: JSON.parse(service.features || '[]') }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating service" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Try to get services from database first
    let services: any[] = [];
    try {
      const dbServices = await prisma.service.findMany({
        where: {
          isAvailable: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      
      // Parse features from JSON strings back to arrays
      services = dbServices.map(service => ({
        ...service,
        features: JSON.parse(service.features || '[]')
      }));
    } catch (dbError) {
      console.log('Database not available, using mock data');
    }

    // If no services from database, return mock data
    if (services.length === 0) {
      let mockData = [
        // BIKES - 10 options
        {
          id: "1",
          title: "Royal Enfield Himalayan",
          description: "Perfect adventure bike for Ladakh's challenging terrain. Built for comfort and reliability on long journeys.",
          image: "/services/bike.jpg",
          price: 1500,
          category: "bike",
          features: JSON.stringify(["411cc engine", "Full safety gear included", "24/7 roadside assistance", "GPS tracking", "Insurance coverage"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "2",
          title: "KTM Duke 390",
          description: "High-performance bike for thrill-seekers. Perfect for experienced riders who want power and agility.",
          image: "/services/bike.jpg",
          price: 2000,
          category: "bike",
          features: JSON.stringify(["373cc engine", "Premium safety gear", "Performance tires", "Emergency support", "Fuel included"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "3",
          title: "BMW G310R",
          description: "Premium German engineering for the ultimate riding experience in Ladakh's majestic landscapes.",
          image: "/services/bike.jpg",
          price: 2500,
          category: "bike",
          features: JSON.stringify(["313cc engine", "BMW branded gear", "Premium service", "Helmet and jacket", "Breakdown assistance"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "4",
          title: "Honda CB350",
          description: "Classic cruiser with modern technology. Perfect for comfortable long-distance rides.",
          image: "/services/bike.jpg",
          price: 1200,
          category: "bike",
          features: JSON.stringify(["348cc engine", "Classic design", "Comfortable seating", "Fuel efficient", "Easy handling"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "5",
          title: "Yamaha MT-15",
          description: "Sporty naked bike with aggressive styling. Ideal for city and highway riding.",
          image: "/services/bike.jpg",
          price: 1800,
          category: "bike",
          features: JSON.stringify(["155cc engine", "Sporty design", "LED lighting", "Digital display", "Sport tires"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "6",
          title: "Suzuki Gixxer SF",
          description: "Sport touring bike with aerodynamic fairing. Perfect for high-speed touring.",
          image: "/services/bike.jpg",
          price: 1600,
          category: "bike",
          features: JSON.stringify(["155cc engine", "Sport fairing", "Digital console", "LED headlamps", "Touring comfort"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "7",
          title: "Bajaj Dominar 400",
          description: "Powerful touring bike with excellent highway performance and comfort.",
          image: "/services/bike.jpg",
          price: 2200,
          category: "bike",
          features: JSON.stringify(["373cc engine", "Touring focused", "LED lighting", "Digital display", "Premium comfort"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "8",
          title: "TVS Apache RTR 200",
          description: "Racing-inspired bike with track-focused features and aggressive styling.",
          image: "/services/bike.jpg",
          price: 1400,
          category: "bike",
          features: JSON.stringify(["197cc engine", "Racing DNA", "Sporty exhaust", "Digital cluster", "Performance focused"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "9",
          title: "Hero Xpulse 200",
          description: "Adventure bike designed for off-road exploration and rough terrain.",
          image: "/services/bike.jpg",
          price: 1300,
          category: "bike",
          features: JSON.stringify(["200cc engine", "Off-road capable", "High ground clearance", "Adventure ready", "Durable build"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "10",
          title: "Jawa Perak",
          description: "Classic bobber style bike with modern engineering and retro appeal.",
          image: "/services/bike.jpg",
          price: 1700,
          category: "bike",
          features: JSON.stringify(["334cc engine", "Bobber design", "Classic styling", "Modern tech", "Unique appeal"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // CARS - 10 options including van, scorpio, cresta, tempo
        {
          id: "11",
          title: "Toyota Innova",
          description: "Comfortable and spacious SUV perfect for family trips and group tours in Ladakh.",
          image: "/services/car.jpg",
          price: 3500,
          category: "car",
          features: JSON.stringify(["7-seater capacity", "Professional driver", "AC and heating", "Fuel included", "Insurance coverage"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "12",
          title: "Mahindra Scorpio",
          description: "Rugged SUV built for Ladakh's challenging roads. Perfect for adventure seekers.",
          image: "/services/car.jpg",
          price: 4000,
          category: "car",
          features: JSON.stringify(["4x4 capability", "High ground clearance", "Experienced driver", "Off-road ready", "Emergency kit"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "13",
          title: "Tata Safari",
          description: "Luxury SUV with modern amenities for a comfortable journey through Ladakh.",
          image: "/services/car.jpg",
          price: 4500,
          category: "car",
          features: JSON.stringify(["Premium interior", "Advanced safety features", "Professional chauffeur", "WiFi hotspot", "Refreshments included"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "14",
          title: "Toyota Fortuner",
          description: "Premium SUV with powerful performance and luxury features for discerning travelers.",
          image: "/services/car.jpg",
          price: 5000,
          category: "car",
          features: JSON.stringify(["2.8L diesel engine", "7-seater luxury", "Premium audio", "Climate control", "All-terrain capability"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "15",
          title: "Mahindra XUV700",
          description: "Modern SUV with advanced technology and safety features for family adventures.",
          image: "/services/car.jpg",
          price: 4200,
          category: "car",
          features: JSON.stringify(["ADAS features", "7-seater comfort", "Panoramic sunroof", "Premium sound", "Smart connectivity"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "16",
          title: "Tempo Traveller",
          description: "Large passenger van perfect for group tours and family gatherings in Ladakh.",
          image: "/services/car.jpg",
          price: 6000,
          category: "car",
          features: JSON.stringify(["12-seater capacity", "Spacious interior", "Professional driver", "Luggage space", "Group friendly"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "17",
          title: "Toyota Hiace Van",
          description: "Premium van with comfortable seating and modern amenities for group travel.",
          image: "/services/car.jpg",
          price: 5500,
          category: "car",
          features: JSON.stringify(["15-seater luxury", "Premium upholstery", "Climate control", "Entertainment system", "Professional service"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "18",
          title: "Mahindra Bolero",
          description: "Reliable and economical SUV perfect for budget-conscious travelers.",
          image: "/services/car.jpg",
          price: 2800,
          category: "car",
          features: JSON.stringify(["7-seater capacity", "Fuel efficient", "Rugged build", "Experienced driver", "Cost effective"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "19",
          title: "Toyota Camry",
          description: "Luxury sedan with premium comfort and sophisticated features for executive travel.",
          image: "/services/car.jpg",
          price: 4800,
          category: "car",
          features: JSON.stringify(["Executive comfort", "Premium interior", "Advanced safety", "Professional chauffeur", "Business ready"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "20",
          title: "Honda City",
          description: "Comfortable sedan with excellent fuel efficiency and modern features.",
          image: "/services/car.jpg",
          price: 3200,
          category: "car",
          features: JSON.stringify(["5-seater comfort", "Fuel efficient", "Modern features", "Professional driver", "Reliable service"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // HOMESTAYS - 10 options
        {
          id: "21",
          title: "Traditional Ladakhi Homestay",
          description: "Experience authentic Ladakhi hospitality in traditional homes with local families.",
          image: "/services/homestay.jpg",
          price: 1000,
          category: "homestay",
          features: JSON.stringify(["Traditional architecture", "Home-cooked meals", "Cultural experiences", "Local family interaction", "Authentic atmosphere"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "22",
          title: "Mountain View Homestay",
          description: "Comfortable homestay with stunning mountain views and modern amenities.",
          image: "/services/homestay.jpg",
          price: 1500,
          category: "homestay",
          features: JSON.stringify(["Mountain views", "Private bathroom", "Heating facilities", "Local cuisine", "Cultural activities"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "23",
          title: "Monastery View Homestay",
          description: "Peaceful homestay with views of ancient monasteries and spiritual atmosphere.",
          image: "/services/homestay.jpg",
          price: 1200,
          category: "homestay",
          features: JSON.stringify(["Monastery views", "Spiritual atmosphere", "Traditional meals", "Meditation space", "Cultural insights"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "24",
          title: "Luxury Ladakhi Homestay",
          description: "Premium homestay with modern amenities while maintaining traditional Ladakhi charm.",
          image: "/services/homestay.jpg",
          price: 2500,
          category: "homestay",
          features: JSON.stringify(["Luxury amenities", "Private balcony", "Premium meals", "Cultural experiences", "Personalized service"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "25",
          title: "Riverside Homestay",
          description: "Serene homestay located by the river with peaceful surroundings and nature views.",
          image: "/services/homestay.jpg",
          price: 1800,
          category: "homestay",
          features: JSON.stringify(["Riverside location", "Nature views", "Peaceful atmosphere", "Local cuisine", "Outdoor seating"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "26",
          title: "Village Homestay Experience",
          description: "Immerse yourself in village life with authentic Ladakhi family experience.",
          image: "/services/homestay.jpg",
          price: 800,
          category: "homestay",
          features: JSON.stringify(["Village life", "Traditional farming", "Local activities", "Simple comfort", "Authentic experience"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "27",
          title: "Garden Homestay",
          description: "Beautiful homestay with lush gardens and organic produce from the backyard.",
          image: "/services/homestay.jpg",
          price: 1400,
          category: "homestay",
          features: JSON.stringify(["Garden views", "Organic meals", "Fresh produce", "Peaceful setting", "Family atmosphere"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "28",
          title: "Heritage Homestay",
          description: "Stay in a centuries-old Ladakhi house with rich cultural heritage and stories.",
          image: "/services/homestay.jpg",
          price: 2000,
          category: "homestay",
          features: JSON.stringify(["Heritage building", "Cultural stories", "Traditional architecture", "Historical significance", "Premium experience"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "29",
          title: "Adventure Base Homestay",
          description: "Perfect base for adventure activities with experienced guides and equipment storage.",
          image: "/services/homestay.jpg",
          price: 1600,
          category: "homestay",
          features: JSON.stringify(["Adventure base", "Equipment storage", "Guide services", "Activity planning", "Mountain access"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "30",
          title: "Family Homestay",
          description: "Warm and welcoming family homestay perfect for families with children.",
          image: "/services/homestay.jpg",
          price: 1100,
          category: "homestay",
          features: JSON.stringify(["Family friendly", "Child activities", "Safe environment", "Home-like comfort", "Cultural learning"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // FOOD TOURS - 10 options
        {
          id: "31",
          title: "Ladakhi Food Tour",
          description: "Explore the rich flavors of Ladakhi cuisine with guided food tours and cooking classes.",
          image: "/services/food.jpg",
          price: 500,
          category: "food",
          features: JSON.stringify(["Local restaurant visits", "Traditional cooking classes", "Street food exploration", "Cultural food stories", "Dietary accommodations"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "32",
          title: "Monastery Kitchen Experience",
          description: "Learn traditional Ladakhi cooking from monastery kitchens and monks.",
          image: "/services/food.jpg",
          price: 800,
          category: "food",
          features: JSON.stringify(["Monastery kitchen", "Monk teachings", "Traditional recipes", "Spiritual cooking", "Cultural immersion"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "33",
          title: "Street Food Adventure",
          description: "Explore Ladakh's vibrant street food scene with local food experts.",
          image: "/services/food.jpg",
          price: 400,
          category: "food",
          features: JSON.stringify(["Street food tour", "Local markets", "Food tasting", "Cultural insights", "Photography spots"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "34",
          title: "Organic Farm to Table",
          description: "Experience farm-to-table dining with fresh organic produce from local farms.",
          image: "/services/food.jpg",
          price: 600,
          category: "food",
          features: JSON.stringify(["Organic farming", "Fresh produce", "Farm visits", "Cooking classes", "Sustainable dining"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "35",
          title: "Tibetan Cuisine Workshop",
          description: "Learn authentic Tibetan cooking techniques and traditional recipes.",
          image: "/services/food.jpg",
          price: 700,
          category: "food",
          features: JSON.stringify(["Tibetan recipes", "Cooking workshop", "Traditional techniques", "Cultural history", "Hands-on learning"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "36",
          title: "Tea House Experience",
          description: "Visit traditional tea houses and learn about Ladakhi tea culture and brewing methods.",
          image: "/services/food.jpg",
          price: 300,
          category: "food",
          features: JSON.stringify(["Tea culture", "Traditional brewing", "Tea house visits", "Cultural stories", "Relaxing experience"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "37",
          title: "Festival Food Tour",
          description: "Experience Ladakhi festivals through their traditional festival foods and celebrations.",
          image: "/services/food.jpg",
          price: 900,
          category: "food",
          features: JSON.stringify(["Festival foods", "Cultural celebrations", "Traditional recipes", "Community participation", "Seasonal specialties"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "38",
          title: "Mountain Cafe Hopping",
          description: "Visit the best mountain cafes in Ladakh with stunning views and local delicacies.",
          image: "/services/food.jpg",
          price: 450,
          category: "food",
          features: JSON.stringify(["Mountain cafes", "Scenic views", "Local delicacies", "Cafe culture", "Photography"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "39",
          title: "Spice Trail Adventure",
          description: "Discover the spices and flavors that make Ladakhi cuisine unique and aromatic.",
          image: "/services/food.jpg",
          price: 550,
          category: "food",
          features: JSON.stringify(["Spice exploration", "Aromatic flavors", "Traditional spices", "Cooking techniques", "Flavor profiles"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "40",
          title: "Dessert and Sweet Tour",
          description: "Explore Ladakh's traditional desserts and sweet delicacies with local bakers.",
          image: "/services/food.jpg",
          price: 350,
          category: "food",
          features: JSON.stringify(["Traditional desserts", "Sweet delicacies", "Local bakers", "Baking techniques", "Sweet culture"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // TREKKING - 10 options
        {
          id: "41",
          title: "Markha Valley Trek",
          description: "Embark on an unforgettable trek through one of Ladakh's most beautiful valleys.",
          image: "/services/treeking.jpg",
          price: 2000,
          category: "trekking",
          features: JSON.stringify(["Expert guides", "All equipment provided", "Accommodation included", "Meals provided", "Safety equipment"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "42",
          title: "Stok Kangri Trek",
          description: "Challenge yourself with this high-altitude trek to one of Ladakh's highest peaks.",
          image: "/services/treeking.jpg",
          price: 3000,
          category: "trekking",
          features: JSON.stringify(["High-altitude training", "Professional guides", "Complete equipment", "Medical support", "Permit assistance"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "43",
          title: "Zanskar Valley Trek",
          description: "Explore the remote and pristine Zanskar Valley with its dramatic landscapes.",
          image: "/services/treeking.jpg",
          price: 2500,
          category: "trekking",
          features: JSON.stringify(["Remote valley", "Dramatic landscapes", "Expert guides", "Camping equipment", "Local permits"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "44",
          title: "Lamayuru to Alchi Trek",
          description: "Cultural trek connecting ancient monasteries with stunning mountain views.",
          image: "/services/treeking.jpg",
          price: 1800,
          category: "trekking",
          features: JSON.stringify(["Cultural trek", "Monastery visits", "Mountain views", "Expert guides", "Cultural insights"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "45",
          title: "Kang Yatse Trek",
          description: "Challenging trek to the majestic Kang Yatse peak with breathtaking views.",
          image: "/services/treeking.jpg",
          price: 2800,
          category: "trekking",
          features: JSON.stringify(["Peak climbing", "Breathtaking views", "Professional guides", "Technical equipment", "High-altitude experience"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "46",
          title: "Sham Valley Trek",
          description: "Easy to moderate trek through the beautiful Sham Valley with cultural experiences.",
          image: "/services/treeking.jpg",
          price: 1200,
          category: "trekking",
          features: JSON.stringify(["Easy trek", "Cultural experiences", "Village visits", "Local interaction", "Scenic beauty"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "47",
          title: "Rupshu Valley Trek",
          description: "High-altitude desert trek through the unique Rupshu Valley landscape.",
          image: "/services/treeking.jpg",
          price: 2200,
          category: "trekking",
          features: JSON.stringify(["Desert landscape", "High altitude", "Unique terrain", "Expert guides", "Specialized equipment"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "48",
          title: "Nubra Valley Trek",
          description: "Trek through the beautiful Nubra Valley with sand dunes and mountain views.",
          image: "/services/treeking.jpg",
          price: 1900,
          category: "trekking",
          features: JSON.stringify(["Sand dunes", "Mountain views", "Valley trek", "Expert guides", "Scenic beauty"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "49",
          title: "Tso Moriri Lake Trek",
          description: "Trek to the pristine Tso Moriri Lake with stunning high-altitude lake views.",
          image: "/services/treeking.jpg",
          price: 2400,
          category: "trekking",
          features: JSON.stringify(["High-altitude lake", "Pristine beauty", "Wildlife spotting", "Expert guides", "Lake camping"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "50",
          title: "Chadar Trek",
          description: "Unique winter trek on the frozen Zanskar River - one of the most challenging treks.",
          image: "/services/treeking.jpg",
          price: 3500,
          category: "trekking",
          features: JSON.stringify(["Winter trek", "Frozen river", "Extreme adventure", "Professional guides", "Specialized gear"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        // TOURS - 10 options including Nubra Valley, Lamayuru, Zanskar
        {
          id: "51",
          title: "Pangong Lake Tour",
          description: "Visit the famous Pangong Lake, featured in many Bollywood movies, with guided tours.",
          image: "/services/tours.jpg",
          price: 1500,
          category: "tours",
          features: JSON.stringify(["Professional guide", "Transportation included", "Photography spots", "Cultural insights", "Refreshments"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "52",
          title: "Nubra Valley Tour",
          description: "Explore the beautiful Nubra Valley with its sand dunes and monasteries.",
          image: "/services/tours.jpg",
          price: 1800,
          category: "tours",
          features: JSON.stringify(["Valley exploration", "Monastery visits", "Sand dune activities", "Local interactions", "Scenic photography"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "53",
          title: "Lamayuru Monastery Tour",
          description: "Visit the ancient Lamayuru Monastery, known as the 'Moonland' of Ladakh.",
          image: "/services/tours.jpg",
          price: 1200,
          category: "tours",
          features: JSON.stringify(["Ancient monastery", "Moonland landscape", "Cultural history", "Professional guide", "Photography"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "54",
          title: "Zanskar Valley Tour",
          description: "Explore the remote Zanskar Valley with its dramatic landscapes and ancient culture.",
          image: "/services/tours.jpg",
          price: 2200,
          category: "tours",
          features: JSON.stringify(["Remote valley", "Dramatic landscapes", "Ancient culture", "Expert guide", "Cultural immersion"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "55",
          title: "Leh Palace & Old Town Tour",
          description: "Discover the historic Leh Palace and explore the charming old town of Leh.",
          image: "/services/tours.jpg",
          price: 800,
          category: "tours",
          features: JSON.stringify(["Historic palace", "Old town exploration", "Cultural heritage", "Local guide", "Historical insights"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "56",
          title: "Monastery Circuit Tour",
          description: "Visit the most important monasteries of Ladakh including Thiksey, Hemis, and Diskit.",
          image: "/services/tours.jpg",
          price: 1600,
          category: "tours",
          features: JSON.stringify(["Multiple monasteries", "Cultural insights", "Spiritual experience", "Expert guide", "Transportation"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "57",
          title: "Khardungla Pass Tour",
          description: "Visit the highest motorable pass in the world with breathtaking mountain views.",
          image: "/services/tours.jpg",
          price: 1000,
          category: "tours",
          features: JSON.stringify(["Highest pass", "Mountain views", "Adventure experience", "Professional guide", "Safety equipment"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "58",
          title: "Tso Kar Lake Tour",
          description: "Visit the beautiful Tso Kar Lake, a high-altitude salt lake with stunning views.",
          image: "/services/tours.jpg",
          price: 1400,
          category: "tours",
          features: JSON.stringify(["Salt lake", "High altitude", "Wildlife spotting", "Scenic beauty", "Expert guide"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "59",
          title: "Cultural Village Tour",
          description: "Experience authentic Ladakhi village life with local families and cultural activities.",
          image: "/services/tours.jpg",
          price: 900,
          category: "tours",
          features: JSON.stringify(["Village life", "Cultural activities", "Local families", "Traditional crafts", "Authentic experience"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "60",
          title: "Photography Tour",
          description: "Professional photography tour to capture the best landscapes and cultural moments.",
          image: "/services/tours.jpg",
          price: 2000,
          category: "tours",
          features: JSON.stringify(["Professional photographer", "Best locations", "Equipment guidance", "Photo editing", "Cultural insights"]),
          isAvailable: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      // Ensure all features fields are strings
      mockData = mockData.map(service => ({
        ...service,
        features: typeof service.features === 'string' ? service.features : JSON.stringify(service.features || [])
      }));
      services = mockData;
      // Parse features from JSON string to array for all mock services
      services = services.map(service => ({
        ...service,
        features: JSON.parse(service.features || '[]')
      }));
    }

    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching services" },
      { status: 500 }
    );
  }
} 