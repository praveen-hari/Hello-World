import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-secondary text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold mb-4 text-lg">🛒 ShopKart</h3>
          <p className="text-sm text-gray-400">
            India's most trusted online shopping destination. Shop millions of products at the best prices.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="#" className="hover:text-primary transition-colors">Help Center</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Returns & Exchanges</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Track Order</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm">
            {['Mobiles', 'Laptops', 'Fashion', 'Sports'].map((c) => (
              <li key={c}>
                <Link to={`/products?category=${c}`} className="hover:text-primary transition-colors">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="#" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Press</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        © 2024 ShopKart Pvt. Ltd. All rights reserved. Made with ❤️ in India.
      </div>
    </footer>
  );
}
