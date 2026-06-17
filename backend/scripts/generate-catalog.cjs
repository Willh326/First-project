// One-off generator for the mock product catalog. Run with: node scripts/generate-catalog.cjs
const fs = require('fs');
const path = require('path');

const categories = {
  home: {
    label: 'Home & decor',
    items: [
      ['Ceramic Table Lamp', 'lighting'],
      ['Linen Throw Pillow Set', 'textiles'],
      ['Wool Area Rug', 'textiles'],
      ['Wall-Mounted Shelf Unit', 'storage'],
      ['Hand-Blown Glass Vase', 'decor'],
      ['Boucle Accent Chair', 'furniture'],
      ['Marble Coasters (Set of 4)', 'decor'],
      ['Rattan Storage Baskets', 'storage'],
      ['Brass Drawer Pulls', 'hardware'],
      ['Linen Duvet Cover', 'bedding'],
      ['Concrete Planter Trio', 'decor'],
      ['Walnut Side Table', 'furniture'],
      ['Scented Soy Candle', 'decor'],
      ['Velvet Curtain Panels', 'textiles'],
      ['Cast Iron Bookends', 'decor'],
      ['Stoneware Dinnerware Set', 'kitchen'],
    ],
  },
  fashion: {
    label: 'Fashion & apparel',
    items: [
      ['Oversized Wool Coat', 'outerwear'],
      ['Cropped Denim Jacket', 'outerwear'],
      ['Silk Slip Dress', 'dresses'],
      ['Tailored Trousers', 'bottoms'],
      ['Graphic Print Hoodie', 'tops'],
      ['Cashmere Crewneck Sweater', 'tops'],
      ['Pleated Midi Skirt', 'bottoms'],
      ['Leather Chelsea Boots', 'footwear'],
      ['Canvas High-Top Sneakers', 'footwear'],
      ['Structured Tote Bag', 'accessories'],
      ['Gold Hoop Earrings', 'accessories'],
      ['Striped Cotton Button-Down', 'tops'],
      ['Wide-Leg Linen Pants', 'bottoms'],
      ['Puffer Vest', 'outerwear'],
      ['Statement Belt', 'accessories'],
      ['Knit Beanie', 'accessories'],
    ],
  },
  tech: {
    label: 'Tech & gadgets',
    items: [
      ['Wireless Noise-Cancelling Headphones', 'audio'],
      ['Smart Home Speaker', 'audio'],
      ['Mechanical Keyboard', 'computer-accessories'],
      ['Portable Power Bank', 'accessories'],
      ['Fitness Tracker Watch', 'wearables'],
      ['Compact Mirrorless Camera', 'cameras'],
      ['Wireless Charging Pad', 'accessories'],
      ['Smart LED Desk Lamp', 'home-tech'],
      ['Bluetooth Tracker Tags', 'accessories'],
      ['Tablet Stand with Hub', 'computer-accessories'],
      ['Noise-Isolating Earbuds', 'audio'],
      ['Smart Plug 4-Pack', 'home-tech'],
      ['Ergonomic Wireless Mouse', 'computer-accessories'],
      ['Portable Bluetooth Speaker', 'audio'],
      ['Action Camera', 'cameras'],
      ['Smart Video Doorbell', 'home-tech'],
    ],
  },
  fitness: {
    label: 'Fitness & outdoors',
    items: [
      ['Adjustable Dumbbell Set', 'strength'],
      ['Yoga Mat with Strap', 'yoga'],
      ['Insulated Trail Backpack', 'outdoors'],
      ['Trail Running Shoes', 'footwear'],
      ['Foam Roller', 'recovery'],
      ['Resistance Band Set', 'strength'],
      ['Insulated Water Bottle', 'accessories'],
      ['Packable Rain Jacket', 'outerwear'],
      ['Camping Hammock', 'outdoors'],
      ['Compression Leggings', 'apparel'],
      ['Moisture-Wicking Tee', 'apparel'],
      ['Collapsible Hiking Poles', 'outdoors'],
      ['Jump Rope', 'cardio'],
      ['Gym Duffel Bag', 'accessories'],
      ['Pull-Up Bar', 'strength'],
      ['Cycling Gloves', 'apparel'],
    ],
  },
  beauty: {
    label: 'Beauty & wellness',
    items: [
      ['Vitamin C Serum', 'skincare'],
      ['Clay Face Mask', 'skincare'],
      ['Mineral Sunscreen SPF 50', 'skincare'],
      ['Dry Shampoo', 'haircare'],
      ['Bristle Hair Brush', 'haircare'],
      ['Essential Oil Diffuser', 'wellness'],
      ['Weighted Sleep Mask', 'wellness'],
      ['Jade Facial Roller', 'tools'],
      ['Lip Oil Trio', 'makeup'],
      ['Cruelty-Free Mascara', 'makeup'],
      ['Bath Soak Salts', 'wellness'],
      ['Retinol Night Cream', 'skincare'],
      ['Bamboo Toothbrush Set', 'wellness'],
      ['Hydrating Lip Mask', 'skincare'],
      ['Scalp Massage Brush', 'tools'],
      ['Refillable Perfume Oil', 'fragrance'],
    ],
  },
};

const aesthetics = ['minimalist', 'maximalist', 'classic', 'streetwear', 'eclectic'];
const colorTags = ['neutral', 'bold', 'pastel', 'monochrome'];
const priceTiers = [
  { id: 'budget', min: 8, max: 35 },
  { id: 'midRange', min: 35, max: 90 },
  { id: 'premium', min: 90, max: 220 },
  { id: 'luxury', min: 220, max: 650 },
];
const brandTypes = ['wellKnown', 'indie'];
const retailers = ['Northfield & Co', 'Lumen Goods', 'Stitch & Stone', 'Pathways Supply', 'Holt Market'];

function pick(arr, seed) {
  return arr[seed % arr.length];
}

function round(n) {
  return Math.round(n * 100) / 100;
}

let products = [];
let counter = 0;

for (const [categoryId, { items }] of Object.entries(categories)) {
  items.forEach(([title, subcategory], index) => {
    counter += 1;
    const id = `${categoryId}-${String(index + 1).padStart(2, '0')}`;
    const tier = pick(priceTiers, counter);
    const price = round(tier.min + ((counter * 37) % 100) / 100 * (tier.max - tier.min));
    const aesthetic = pick(aesthetics, counter + index);
    const color = pick(colorTags, counter * 2 + index);
    const brandType = pick(brandTypes, counter);
    const sustainable = counter % 3 === 0;
    const retailer = pick(retailers, counter + 3);

    products.push({
      id,
      title,
      category: categoryId,
      subcategory,
      priceTier: tier.id,
      price,
      aesthetic,
      colorTag: color,
      brandType,
      sustainable,
      retailer,
      image: `https://picsum.photos/seed/${id}/600/600`,
      retailerUrl: `https://example-shop.com/${categoryId}/${id}`,
      tags: [categoryId, subcategory, aesthetic, color, tier.id, brandType, sustainable ? 'sustainable' : null].filter(Boolean),
    });
  });
}

const outPath = path.join(__dirname, '..', 'src', 'catalog', 'catalog.json');
fs.writeFileSync(outPath, JSON.stringify(products, null, 2) + '\n');
console.log(`Wrote ${products.length} products to ${outPath}`);
