const raw = [
  // Mobiles
  ['Galaxy S24 5G', 'Mobiles', 74999, 12, 4.6, 'Samsung', 'Flagship 6.2" AMOLED display, 50MP camera and all-day battery.'],
  ['iPhone 15', 'Mobiles', 79900, 5, 4.7, 'Apple', 'A16 Bionic chip with a 48MP main camera and USB-C.'],
  ['Redmi Note 13 Pro', 'Mobiles', 23999, 18, 4.3, 'Xiaomi', '200MP camera, 120Hz AMOLED display and fast charging.'],
  ['OnePlus 12R', 'Mobiles', 39999, 8, 4.5, 'OnePlus', 'Snapdragon 8 Gen 2 with 5500mAh battery and 100W charging.'],
  ['Pixel 8a', 'Mobiles', 52999, 10, 4.4, 'Google', 'Clean Android experience with great computational photography.'],
  // Laptops
  ['MacBook Air M2', 'Laptops', 99900, 7, 4.8, 'Apple', '13.6" Liquid Retina display, M2 chip and 18 hour battery life.'],
  ['Dell XPS 13', 'Laptops', 109990, 0, 4.4, 'Dell', 'Ultra-thin InfinityEdge display with 13th gen Intel Core i7.'],
  ['HP Pavilion 15', 'Laptops', 58990, 15, 4.1, 'HP', 'Everyday laptop with Ryzen 5, 16GB RAM and 512GB SSD.'],
  ['Lenovo IdeaPad Slim 3', 'Laptops', 42990, 20, 4.0, 'Lenovo', 'Lightweight student laptop with full HD anti-glare display.'],
  ['ASUS TUF Gaming F15', 'Laptops', 72990, 9, 4.5, 'ASUS', 'RTX 4050 graphics and 144Hz display for gaming on the go.'],
  // Audio
  ['Sony WH-1000XM5', 'Audio', 29990, 6, 4.7, 'Sony', 'Industry leading noise cancelling wireless headphones.'],
  ['boAt Rockerz 450', 'Audio', 1499, 30, 4.0, 'boAt', 'On-ear Bluetooth headphones with 15 hour playback.'],
  ['AirPods Pro 2', 'Audio', 24900, 11, 4.8, 'Apple', 'Active noise cancellation with adaptive transparency.'],
  ['JBL Flip 6', 'Audio', 9999, 14, 4.5, 'JBL', 'Portable waterproof speaker with powerful sound.'],
  ['Noise Buds VS104', 'Audio', 999, 50, 3.9, 'Noise', 'True wireless earbuds with 30 hour battery life.'],
  // Wearables
  ['Apple Watch SE', 'Wearables', 29900, 9, 4.6, 'Apple', 'Fitness and safety features in a lightweight aluminium case.'],
  ['Fitbit Charge 6', 'Wearables', 14999, 13, 4.2, 'Fitbit', 'Built-in GPS, heart rate tracking and 7 day battery.'],
  ['Noise ColorFit Pro 4', 'Wearables', 3499, 25, 4.0, 'Noise', '1.78" AMOLED display smartwatch with Bluetooth calling.'],
  ['Mi Band 8', 'Wearables', 2999, 40, 4.3, 'Xiaomi', 'Slim fitness band with 16 day battery life.'],
  // Fashion
  ["Levi's 511 Slim Jeans", 'Fashion', 2999, 35, 4.2, "Levi's", 'Classic slim fit stretch denim for everyday wear.'],
  ['Nike Air Max 270', 'Fashion', 12995, 16, 4.5, 'Nike', 'Lifestyle sneakers with a large Air unit heel.'],
  ['Allen Solly Formal Shirt', 'Fashion', 1299, 45, 4.0, 'Allen Solly', 'Regular fit cotton formal shirt for office wear.'],
  ['Puma Hoodie', 'Fashion', 2499, 22, 4.1, 'Puma', 'Soft fleece hoodie with kangaroo pocket.'],
  // Home Appliances
  ['LG 7kg Front Load Washer', 'Home Appliances', 32990, 4, 4.4, 'LG', 'Inverter direct drive washing machine with steam wash.'],
  ['Philips Air Fryer HD9200', 'Home Appliances', 7995, 19, 4.5, 'Philips', 'Rapid air technology for healthy frying with little oil.'],
  ['Dyson V8 Vacuum', 'Home Appliances', 34900, 3, 4.6, 'Dyson', 'Cordless vacuum cleaner with up to 40 minutes runtime.'],
  ['Prestige Induction Cooktop', 'Home Appliances', 2799, 28, 4.1, 'Prestige', '2000W induction cooktop with preset menus.'],
  ['Voltas 1.5 Ton Split AC', 'Home Appliances', 36990, 6, 4.2, 'Voltas', '3 star inverter split air conditioner with copper coil.'],
  // Gadgets
  ['Kindle Paperwhite', 'Gadgets', 13999, 17, 4.6, 'Amazon', 'Glare-free 6.8" display with adjustable warm light.'],
  ['GoPro Hero 12', 'Gadgets', 39990, 5, 4.5, 'GoPro', 'Waterproof action camera with 5.3K video.'],
  ['Instant Mini Polaroid Camera', 'Gadgets', 6499, 21, 4.3, 'Fujifilm', 'Fun instant camera that prints credit card sized photos.'],
  // Books
  ['Atomic Habits', 'Books', 499, 100, 4.8, 'James Clear', 'An easy and proven way to build good habits.'],
  ['The Psychology of Money', 'Books', 399, 80, 4.7, 'Morgan Housel', 'Timeless lessons on wealth, greed and happiness.'],
  ['Deep Work', 'Books', 450, 60, 4.5, 'Cal Newport', 'Rules for focused success in a distracted world.'],
  ['Clean Code', 'Books', 2800, 25, 4.6, 'Robert C. Martin', 'A handbook of agile software craftsmanship.'],
  // Sports
  ['Yonex Astrox Badminton Racquet', 'Sports', 3299, 14, 4.4, 'Yonex', 'Lightweight graphite racquet for attacking players.'],
  ['Nivia Football Size 5', 'Sports', 699, 60, 4.0, 'Nivia', 'Durable machine stitched football.'],
  ['Cosco Yoga Mat', 'Sports', 599, 70, 4.1, 'Cosco', '6mm anti-skid yoga mat with carry strap.'],
  ['SG Cricket Bat', 'Sports', 5499, 8, 4.3, 'SG', 'English willow bat with a thick edge profile.'],
  ['Decathlon Dumbbell Set 20kg', 'Sports', 2199, 0, 4.2, 'Decathlon', 'Adjustable dumbbell kit for home workouts.'],
];

export const categories = [
  'Mobiles', 'Laptops', 'Audio', 'Wearables', 'Fashion', 'Home Appliances', 'Gadgets', 'Books', 'Sports',
];

const products = raw.map(([name, category, price, stock, rating, brand, description], i) => ({
  id: i + 1,
  name,
  category,
  price,
  originalPrice: Math.round(price * (1.1 + (i % 4) * 0.05)),
  stock,
  rating,
  reviews: 50 + ((i * 37) % 900),
  brand,
  description,
  image: i % 9 === 4 ? `/images/products/${i + 1}.jpg` : `https://picsum.photos/seed/shopzone${i + 1}/400/400`,
}));

export default products;
