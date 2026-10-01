const raw = [
  ['iPhone 15', 'Mobiles', 79999, 'Apple'],
  ['Galaxy S24', 'Mobiles', 74999, 'Samsung'],
  ['Pixel 8', 'Mobiles', 59999, 'Google'],
  ['OnePlus 12', 'Mobiles', 64999, 'OnePlus'],
  ['Redmi Note 13', 'Mobiles', 17999, 'Xiaomi'],
  ['MacBook Air M2', 'Laptops', 114999, 'Apple'],
  ['Dell XPS 13', 'Laptops', 99999, 'Dell'],
  ['HP Pavilion 15', 'Laptops', 58999, 'HP'],
  ['Lenovo ThinkPad E14', 'Laptops', 72999, 'Lenovo'],
  ['ASUS TUF Gaming', 'Laptops', 84999, 'ASUS'],
  ['Sony WH-1000XM5', 'Audio', 29999, 'Sony'],
  ['AirPods Pro', 'Audio', 24900, 'Apple'],
  ['boAt Rockerz 450', 'Audio', 1499, 'boAt'],
  ['JBL Flip 6', 'Audio', 9999, 'JBL'],
  ['Bose SoundLink', 'Audio', 14999, 'Bose'],
  ['Apple Watch SE', 'Wearables', 29900, 'Apple'],
  ['Fitbit Charge 6', 'Wearables', 14999, 'Fitbit'],
  ['Noise ColorFit Pro', 'Wearables', 2999, 'Noise'],
  ['Galaxy Watch 6', 'Wearables', 25999, 'Samsung'],
  ['Mi Band 8', 'Wearables', 3499, 'Xiaomi'],
  ["Levi's Denim Jacket", 'Fashion', 3999, "Levi's"],
  ['Nike Air Max', 'Fashion', 8995, 'Nike'],
  ['Puma Running Tee', 'Fashion', 1299, 'Puma'],
  ['Adidas Hoodie', 'Fashion', 2999, 'Adidas'],
  ['Raymond Formal Shirt', 'Fashion', 1799, 'Raymond'],
  ['LG Front Load Washer', 'Home Appliances', 32999, 'LG'],
  ['Philips Air Fryer', 'Home Appliances', 7999, 'Philips'],
  ['Dyson V11 Vacuum', 'Home Appliances', 44999, 'Dyson'],
  ['Samsung Microwave', 'Home Appliances', 12499, 'Samsung'],
  ['Prestige Induction', 'Home Appliances', 2499, 'Prestige'],
  ['Atomic Habits', 'Books', 499, 'James Clear'],
  ['The Alchemist', 'Books', 299, 'Paulo Coelho'],
  ['Rich Dad Poor Dad', 'Books', 349, 'Robert Kiyosaki'],
  ['Clean Code', 'Books', 2999, 'Robert C. Martin'],
  ['Deep Work', 'Books', 450, 'Cal Newport'],
  ['Yonex Badminton Racket', 'Sports', 2199, 'Yonex'],
  ['SG Cricket Bat', 'Sports', 5499, 'SG'],
  ['Nivia Football', 'Sports', 899, 'Nivia'],
  ['Decathlon Yoga Mat', 'Sports', 799, 'Decathlon'],
  ['Cosco Dumbbell Set', 'Sports', 3499, 'Cosco'],
]

export const categories = ['Mobiles', 'Laptops', 'Audio', 'Wearables', 'Fashion', 'Home Appliances', 'Books', 'Sports']

const products = raw.map(([name, category, price, brand], i) => ({
  id: i + 1,
  name,
  category,
  brand,
  price,
  rating: (3 + ((i * 7) % 20) / 10).toFixed(1),
  stock: (i * 3) % 15,
  description: `${name} by ${brand}. A popular pick in ${category} with great reviews and fast delivery.`,
  image: `https://picsum.photos/seed/product${i + 1}/400/300`,
}))

products[13].image = 'https://picsum.photos/seed/product14/broken.jpg.png'
products[27].image = 'https://images.invalid/dyson.jpg'

export default products
