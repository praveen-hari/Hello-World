import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 8;

const sortOptions = [
  { value: 'default', label: 'Relevance' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Avg. Customer Review' },
  { value: 'newest', label: 'Newest Arrivals' },
];

export default function ProductListing() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [category, search, sortBy]);

  // BUG #5: Search filtering case sensitivity issue — strict case-sensitive search
  let filtered = products.filter((p) => {
    const matchCategory = category ? p.category === category : true;
    const matchSearch = search
      ? p.name.includes(search) || p.brand.includes(search) || p.category.includes(search)
      : true;
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const matchBrand = selectedBrands.length > 0 ? selectedBrands.includes(p.brand) : true;
    return matchCategory && matchSearch && matchPrice && matchBrand;
  });

  // BUG #11: Incorrect sorting implementation — sort mutates original array reference
  if (sortBy === 'price_asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'newest') {
    filtered.sort((a, b) => b.id - a.id);
  }

  const totalItems = filtered.length;
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Get unique brands from filtered products
  const allBrands = [...new Set(products.filter(p => category ? p.category === category : true).map((p) => p.brand))];

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {category || (search ? `Results for "${search}"` : 'All Products')}
          </h1>
          <p className="text-sm text-gray-500 mt-1">{totalItems} products found</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="md:hidden bg-primary text-black px-3 py-2 rounded-lg text-sm font-semibold"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            Filters
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <aside className={`w-64 flex-shrink-0 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
          <div className="bg-white rounded-xl shadow-sm p-5 sticky top-24">
            <h3 className="font-bold text-gray-800 mb-4">Filters</h3>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Price Range</h4>
              <div className="space-y-2">
                {[
                  [0, 1000],
                  [1000, 10000],
                  [10000, 50000],
                  [50000, 200000],
                ].map(([min, max]) => (
                  <label key={`${min}-${max}`} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange[0] === min && priceRange[1] === max}
                      onChange={() => { setPriceRange([min, max]); setCurrentPage(1); }}
                      className="accent-primary"
                    />
                    <span className="text-sm text-gray-600">
                      {min === 0 ? 'Under' : `${formatPrice(min)} –`} {formatPrice(max)}
                    </span>
                  </label>
                ))}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange[0] === 0 && priceRange[1] === 200000}
                    onChange={() => { setPriceRange([0, 200000]); setCurrentPage(1); }}
                    className="accent-primary"
                  />
                  <span className="text-sm text-gray-600">All Prices</span>
                </label>
              </div>
            </div>

            {/* Brands */}
            {allBrands.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Brand</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {allBrands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="accent-primary"
                      />
                      <span className="text-sm text-gray-600">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSelectedBrands([]);
                setPriceRange([0, 200000]);
                setCurrentPage(1);
              }}
              className="mt-4 w-full text-sm text-red-500 hover:underline"
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {paginatedProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🔍</p>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {paginatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalItems={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
