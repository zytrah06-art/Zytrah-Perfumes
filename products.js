/**
 * ZYTRAH Luxury Attars - Product Database
 * File: products.js
 * Description: Contains 30 premium attar products with multi-size pricing and categories.
 */

const products = [
  // --- OUD CATEGORY ---
  {
    id: "zytrah-001",
    name: "Royal Oud",
    category: "Oud",
    description: "Classic royal oud with luxurious woody richness.",
    image: "assets/images/royal-oud.jpg",
    bestseller: true,
    featured: true,
    rating: 4.9,
    prices: { "3ml": 35, "6ml": 65, "12ml": 110, "24ml": 200 }
  },
  {
    id: "zytrah-002",
    name: "Oud Cambodi",
    category: "Oud",
    description: "Premium Cambodian oud with rich woody depth.",
    image: "assets/images/oud-cambodi.jpg",
    bestseller: false,
    featured: false,
    rating: 4.8,
    prices: { "3ml": 40, "6ml": 75, "12ml": 135, "24ml": 250 }
  },
  {
    id: "zytrah-003",
    name: "Cambodian Aged Oud",
    category: "Oud",
    description: "Rich aged Cambodian oud with woody smoky elegance.",
    image: "assets/images/cambodian-aged-oud.jpg",
    bestseller: true,
    featured: true,
    rating: 5.0,
    prices: { "3ml": 45, "6ml": 85, "12ml": 150, "24ml": 280 }
  },

  // --- MUSK CATEGORY ---
  {
    id: "zytrah-004",
    name: "Black Musk",
    category: "Musk",
    description: "Bold black musk with a smooth, long-lasting finish.",
    image: "assets/images/black-musk.jpg",
    bestseller: true,
    featured: true,
    rating: 4.9,
    prices: { "3ml": 25, "6ml": 45, "12ml": 80, "24ml": 145 }
  },
  {
    id: "zytrah-005",
    name: "Cashmere Musk",
    category: "Musk",
    description: "Soft cashmere musk with creamy powdery warmth.",
    image: "assets/images/cashmere-musk.jpg",
    bestseller: false,
    featured: false,
    rating: 4.7,
    prices: { "3ml": 30, "6ml": 55, "12ml": 95, "24ml": 175 }
  },
  {
    id: "zytrah-006",
    name: "Musk Silk Chiffon",
    category: "Musk",
    description: "Silky white musk with an elegant powdery finish.",
    image: "assets/images/musk-silk-chiffon.jpg",
    bestseller: false,
    featured: false,
    rating: 4.8,
    prices: { "3ml": 28, "6ml": 50, "12ml": 90, "24ml": 160 }
  },

  // --- AMBER CATEGORY ---
  {
    id: "zytrah-007",
    name: "Amber Gold",
    category: "Amber",
    description: "Warm golden resin infused with sweet labdanum, vanilla bean, and toasted clove.",
    image: "assets/images/amber-gold.jpg",
    bestseller: true,
    featured: true,
    rating: 4.9,
    prices: { "3ml": 30, "6ml": 55, "12ml": 95, "24ml": 175 }
  },
  {
    id: "zytrah-008",
    name: "Amber Nectar",
    category: "Amber",
    description: "Sweet amber blended with smooth floral honey accords.",
    image: "assets/images/amber-nectar.jpg",
    bestseller: false,
    featured: false,
    rating: 4.6,
    prices: { "3ml": 32, "6ml": 60, "12ml": 105, "24ml": 190 }
  },
  {
    id: "zytrah-009",
    name: "Amber Sandali",
    category: "Amber",
    description: "Warm amber blended with creamy sandalwood for a rich, elegant aroma.",
    image: "assets/images/amber-sandali.jpg",
    bestseller: true,
    featured: false,
    rating: 4.8,
    prices: { "3ml": 35, "6ml": 65, "12ml": 115, "24ml": 210 }
  },

  // --- ROSE CATEGORY ---
  {
    id: "zytrah-010",
    name: "Taif Rose",
    category: "Rose",
    description: "Authentic Taif rose with rich floral elegance.",
    image: "assets/images/taif-rose.jpg",
    bestseller: true,
    featured: true,
    rating: 4.9,
    prices: { "3ml": 28, "6ml": 50, "12ml": 90, "24ml": 165 }
  },
  {
    id: "zytrah-011",
    name: "Turkish Rose",
    category: "Rose",
    description: "Soft Turkish rose blended with delicate musk.",
    image: "assets/images/turkish-rose.jpg",
    bestseller: true,
    featured: false,
    rating: 5.0,
    prices: { "3ml": 50, "6ml": 95, "12ml": 180, "24ml": 320 }
  },
  {
    id: "zytrah-012",
    name: "Damascus Rose Velvet",
    category: "Rose",
    description: "Luxurious Damascus rose wrapped in velvety softness.",
    image: "assets/images/damascus-rose-velvet.jpg",
    bestseller: false,
    featured: false,
    rating: 4.7,
    prices: { "3ml": 30, "6ml": 55, "12ml": 98, "24ml": 180 }
  },

  // --- SANDALWOOD CATEGORY ---
  {
    id: "zytrah-013",
    name: "Sacred Wood",
    category: "Sandalwood",
    description: "Warm sacred woods blended for a calming aroma.",
    image: "assets/images/sacred-wood.jpg",
    bestseller: true,
    featured: true,
    rating: 4.9,
    prices: { "3ml": 38, "6ml": 70, "12ml": 125, "24ml": 230 }
  },
  {
    id: "zytrah-014",
    name: "Bosque Dorado",
    category: "Sandalwood",
    description: "Rich woody notes with warm golden amber elegance.",
    image: "assets/images/bosque-dorado.jpg",
    bestseller: false,
    featured: false,
    rating: 4.8,
    prices: { "3ml": 35, "6ml": 65, "12ml": 115, "24ml": 210 }
  },
  {
    id: "zytrah-015",
    name: "Sándalo Dorado",
    category: "Sandalwood",
    description: "Creamy sandalwood enriched with warm golden amber notes.",
    image: "assets/images/sandalo-dorado.jpg",
    bestseller: false,
    featured: false,
    rating: 4.6,
    prices: { "3ml": 32, "6ml": 60, "12ml": 105, "24ml": 195 }
  },

  // --- LUXURY CATEGORY ---
  {
    id: "zytrah-016",
    name: "Aura Noir",
    category: "Luxury",
    description: "A mysterious blend of dark woods and soft musk.",
    image: "assets/images/aura-noir.jpg",
    bestseller: true,
    featured: true,
    rating: 5.0,
    prices: { "3ml": 42, "6ml": 78, "12ml": 140, "24ml": 260 }
  },
  {
    id: "zytrah-017",
    name: "Grandeur",
    category: "Luxury",
    description: "A premium blend that reflects elegance and prestige.",
    image: "assets/images/grandeur.jpg",
    bestseller: true,
    featured: true,
    rating: 5.0,
    prices: { "3ml": 60, "6ml": 115, "12ml": 210, "24ml": 380 }
  },
  {
    id: "zytrah-018",
    name: "Notte D'Oro",
    category: "Luxury",
    description: "Italian-inspired warm amber fragrance with golden elegance.",
    image: "assets/images/notte-d'oro.jpg",
    bestseller: false,
    featured: true,
    rating: 4.9,
    prices: { "3ml": 55, "6ml": 100, "12ml": 190, "24ml": 340 }
  },

  // --- ARABIC CATEGORY ---
  {
    id: "zytrah-019",
    name: "Arabian Nights",
    category: "Arabic",
    description: "Deep oriental fragrance inspired by Arabian luxury.",
    image: "assets/images/arabian-nights.jpg",
    bestseller: true,
    featured: false,
    rating: 4.8,
    prices: { "3ml": 32, "6ml": 60, "12ml": 110, "24ml": 200 }
  },
  {
    id: "zytrah-020",
    name: "Majestic Blend",
    category: "Arabic",
    description: "An exclusive oriental blend with luxurious character.",
    image: "assets/images/majestic-blend.jpg",
    bestseller: false,
    featured: false,
    rating: 4.7,
    prices: { "3ml": 26, "6ml": 48, "12ml": 88, "24ml": 160 }
  },
  {
    id: "zytrah-021",
    name: "Signature",
    category: "Arabic",
    description: "A timeless signature scent for every occasion.",
    image: "assets/images/signature.jpg",
    bestseller: true,
    featured: false,
    rating: 4.9,
    prices: { "3ml": 36, "6ml": 68, "12ml": 120, "24ml": 220 }
  },

  // --- FLORAL CATEGORY ---
  {
    id: "zytrah-022",
    name: "Royal Jesmine Attar",
    category: "Floral",
    description: "Fresh royal jasmine with soft floral sophistication.",
    image: "assets/images/royal-jesmine-attar.jpg",
    bestseller: false,
    featured: false,
    rating: 4.7,
    prices: { "3ml": 24, "6ml": 44, "12ml": 78, "24ml": 140 }
  },
  {
    id: "zytrah-023",
    name: "Lotus Blossom",
    category: "Floral",
    description: "Delicate lotus petals blended with fresh floral notes.",
    image: "assets/images/lotus-blossom.jpg",
    bestseller: false,
    featured: false,
    rating: 4.6,
    prices: { "3ml": 22, "6ml": 40, "12ml": 72, "24ml": 130 }
  },
  {
    id: "zytrah-024",
    name: "Open Love",
    category: "Saffron Sandal",
    description: "Romantic floral fragrance with soft sweet musk.",
    image: "assets/images/open-love.jpg",
    bestseller: false,
    featured: false,
    rating: 4.8,
    prices: { "3ml": 27, "6ml": 50, "12ml": 88, "24ml": 155 }
  },

  // --- WOODY CATEGORY ---
  {
    id: "zytrah-025",
    name: "Saffron Sandal",
    category: "Woody",
    description: "Exotic saffron meets creamy Mysore sandalwood.",
    image: "assets/images/saffron-sandal.jpg",
    bestseller: false,
    featured: false,
    rating: 4.6,
    prices: { "3ml": 25, "6ml": 45, "12ml": 82, "24ml": 150 }
  },
  {
    id: "zytrah-026",
    name: "Legno Eterno",
    category: "Woody",
    description: "Timeless woody fragrance with deep earthy elegance.",
    image: "assets/images/legno-eterno.jpg",
    bestseller: false,
    featured: false,
    rating: 4.7,
    prices: { "3ml": 28, "6ml": 52, "12ml": 92, "24ml": 165 }
  },
  {
    id: "zytrah-027",
    name: "Bosco Reale",
    category: "Woody",
    description: "A majestic forest blend with rich woody sophistication.",
    image: "assets/images/bosco-reale.jpg",
    bestseller: true,
    featured: false,
    rating: 4.9,
    prices: { "3ml": 34, "6ml": 64, "12ml": 115, "24ml": 210 }
  },

  // --- FRESH CATEGORY ---
  {
    id: "zytrah-028",
    name: "Sapphire",
    category: "Fresh",
    description: "Fresh aquatic fragrance with a refined luxurious finish.",
    image: "assets/images/sapphire.jpg",
    bestseller: false,
    featured: false,
    rating: 4.5,
    prices: { "3ml": 22, "6ml": 40, "12ml": 70, "24ml": 125 }
  },
  {
    id: "zytrah-029",
    name: "Mahzim Élite ",
    category: "Fresh",
    description: "An elegant fresh fragrance with vibrant citrus and refined aquatic notes.",
    image: "assets/images/mahzim-elite.jpg",
    bestseller: true,
    featured: false,
    rating: 4.8,
    prices: { "3ml": 36, "6ml": 68, "12ml": 122, "24ml": 225 }
  },
  {
    id: "zytrah-030",
    name: "Blue Aura",
    category: "Fresh",
    description: "Cool aquatic freshness with a clean, long-lasting finish.",
    image: "assets/images/blue-aura.jpg",
    bestseller: false,
    featured: false,
    rating: 4.6,
    prices: { "3ml": 24, "6ml": 44, "12ml": 78, "24ml": 140 }
  }
];

// Helper function to get product by ID
function getProductById(id) {
  return products.find(product => product.id === id);
}