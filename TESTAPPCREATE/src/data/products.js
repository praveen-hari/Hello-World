const raw = {
  Mobiles: [
    ['iPhone 14', 69999, 'Apple'], ['Galaxy S23', 64999, 'Samsung'], ['Pixel 7', 49999, 'Google'],
    ['OnePlus 11', 56999, 'OnePlus'], ['Redmi Note 12', 15999, 'Xiaomi'],
  ],
  Laptops: [
    ['MacBook Air M2', 99999, 'Apple'], ['Dell XPS 13', 109999, 'Dell'], ['HP Pavilion 15', 55999, 'HP'],
    ['Lenovo IdeaPad 3', 38999, 'Lenovo'], ['ASUS TUF F15', 72999, 'ASUS'],
  ],
  Audio: [
    ['Sony WH-1000XM5', 29990, 'Sony'], ['AirPods Pro', 24900, 'Apple'], ['boAt Rockerz 450', 1499, 'boAt'],
    ['JBL Flip 6', 9999, 'JBL'], ['Bose SoundLink', 14999, 'Bose'],
  ],
  Wearables: [
    ['Apple Watch SE', 29900, 'Apple'], ['Fitbit Charge 5', 15999, 'Fitbit'], ['Noise ColorFit', 2499, 'Noise'],
    ['Galaxy Watch 5', 24999, 'Samsung'], ['Mi Band 7', 3499, 'Xiaomi'],
  ],
  Fashion: [
    ["Levi's Slim Jeans", 2999, "Levi's"], ['Nike Air Max', 8995, 'Nike'], ['Allen Solly Shirt', 1599, 'Allen Solly'],
    ['Puma Hoodie', 2499, 'Puma'], ['Ray-Ban Aviator', 6990, 'Ray-Ban'],
  ],
  'Home Appliances': [
    ['Dyson V11 Vacuum', 44900, 'Dyson'], ['LG Microwave 28L', 12990, 'LG'], ['Philips Air Fryer', 8999, 'Philips'],
    ['Samsung Washing Machine', 31990, 'Samsung'], ['Prestige Induction', 2799, 'Prestige'],
  ],
  Books: [
    ['Atomic Habits', 499, 'James Clear'], ['The Alchemist', 299, 'Paulo Coelho'], ['Clean Code', 2999, 'Robert Martin'],
    ['Rich Dad Poor Dad', 350, 'Robert Kiyosaki'], ['Deep Work', 599, 'Cal Newport'],
  ],
  Sports: [
    ['Yonex Badminton Racket', 2199, 'Yonex'], ['SG Cricket Bat', 4999, 'SG'], ['Nivia Football', 899, 'Nivia'],
    ['Decathlon Yoga Mat', 799, 'Decathlon'], ['Cosco Dumbbell Set', 3499, 'Cosco'],
  ],
}

let id = 1
const products = []
Object.entries(raw).forEach(([category, items]) => {
  items.forEach(([name, price, brand]) => {
    const discount = (id * 7) % 30
    products.push({
      id,
      name,
      brand,
      category,
      price,
      originalPrice: Math.round(price * (1 + discount / 100)),
      rating: Number((3 + ((id * 13) % 20) / 10).toFixed(1)),
      reviews: 50 + id * 37,
      stock: id % 6 === 0 ? 0 : 5 + (id % 15),
      image: id === 9 || id === 22 ? `/images/product-${id}.jpg` : `https://picsum.photos/seed/shop${id}/400/400`,
      description: `${name} by ${brand}. A top choice in ${category} with great quality, warranty and fast delivery.`,
    })
    id++
  })
})

export const categories = Object.keys(raw)
export default products
