import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);

  // BUG #6: Product detail page crashes on invalid product ID — no null check before rendering
  const product = getProductById(id);

  // BUG #7: Missing loading state handling — no loading indicator while product is being "fetched"
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/cart');
  };

  const mockImages = [product.image, product.image, product.image];

  const mockReviews = [
    { id: 1, user: 'Arjun M.', rating: 5, comment: 'Excellent product! Totally worth the price. Build quality is superb.', date: '12 Mar 2024' },
    { id: 2, user: 'Priya S.', rating: 4, comment: 'Good product overall. Delivery was fast. Minor packaging issue but product is fine.', date: '8 Mar 2024' },
    { id: 3, user: 'Rohit K.', rating: 3, comment: 'Average. Expected better performance for this price range.', date: '1 Mar 2024' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>›</span>
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-primary">
          {product.category}
        </Link>
        <span>›</span>
        <span className="text-gray-700 truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <div className="bg-gray-50 rounded-xl p-8 mb-4 flex items-center justify-center h-80">
              <img
                src={mockImages[selectedImage]}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex gap-3">
              {mockImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-lg border-2 overflow-hidden flex items-center justify-center bg-gray-50 ${
                    selectedImage === i ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="text-sm text-primary font-semibold mb-1">{product.brand}</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full font-bold">
                ★ {product.rating}
              </span>
              <StarRating rating={product.rating} />
              <span className="text-sm text-gray-500">{product.reviews.toLocaleString()} ratings</span>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                <span className="text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="text-lg font-bold text-green-600">{discount}% off</span>
              </div>
              <p className="text-xs text-gray-500">Inclusive of all taxes. Free delivery available.</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-5">
              {product.stock > 0 ? (
                <>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-sm text-green-600 font-medium">
                    In Stock ({product.stock} left)
                  </span>
                </>
              ) : (
                <>
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="text-sm text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <label className="text-sm font-medium text-gray-700">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-lg"
                >
                  −
                </button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-yellow-500 text-black py-3 rounded-xl font-bold text-sm transition-colors"
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product);
                  navigate('/checkout');
                }}
                className="flex-1 bg-secondary hover:bg-gray-700 text-white py-3 rounded-xl font-bold text-sm transition-colors"
              >
                ⚡ Buy Now
              </button>
              <button
                onClick={() =>
                  isInWishlist(product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product)
                }
                className={`px-4 py-3 rounded-xl border-2 transition-colors ${
                  isInWishlist(product.id)
                    ? 'border-red-400 text-red-500 bg-red-50'
                    : 'border-gray-300 text-gray-500 hover:border-red-400 hover:text-red-400'
                }`}
              >
                ❤️
              </button>
            </div>

            {/* Offers */}
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Available Offers</h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex gap-2"><span className="text-green-500">🏷️</span> 10% Instant Discount on SBI Credit Cards. T&C apply.</li>
                <li className="flex gap-2"><span className="text-green-500">🏷️</span> Get ₹200 cashback on first UPI transaction.</li>
                <li className="flex gap-2"><span className="text-green-500">🚚</span> Free delivery on orders above ₹499.</li>
                <li className="flex gap-2"><span className="text-green-500">↩️</span> Easy 30-day return & exchange policy.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="flex border-b border-gray-200">
          {['description', 'specifications', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-semibold capitalize transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'description' && (
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✅ Genuine product from authorized seller</li>
                <li>✅ Brand warranty included</li>
                <li>✅ Easy EMI options available</li>
                <li>✅ Free delivery on this order</li>
              </ul>
            </div>
          )}
          {activeTab === 'specifications' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ['Brand', product.brand],
                    ['Category', product.category],
                    ['Model', product.name],
                    ['In Stock', product.stock > 0 ? 'Yes' : 'No'],
                    ['Rating', `${product.rating} / 5`],
                    ['Total Reviews', product.reviews.toLocaleString()],
                  ].map(([key, val]) => (
                    <tr key={key} className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-medium text-gray-600 w-1/3">{key}</td>
                      <td className="py-3 text-gray-800">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl mb-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900">{product.rating}</div>
                  <StarRating rating={product.rating} />
                  <div className="text-xs text-gray-500 mt-1">{product.reviews.toLocaleString()} ratings</div>
                </div>
              </div>
              {mockReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-secondary text-white text-xs w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        {review.user.charAt(0)}
                      </span>
                      <span className="font-medium text-sm">{review.user}</span>
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-5">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
