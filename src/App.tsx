import React, { useState, useMemo } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import { NotificationProvider } from './context/NotificationContext';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductFilter from './components/ProductFilter';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import { products } from './data/products';
import { Product } from './types';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('name');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default: // 'name'
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="min-h-screen relative overflow-hidden">
                {/* Floating Background Elements */}
                <div className="floating-bg"></div>
                
                {/* Additional Animated Background */}
                <div className="fixed inset-0 -z-10">
                  <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
                  <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-yellow-400/15 to-red-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '6s'}}></div>
                  <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-indigo-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '8s'}}></div>
                </div>

                <Header
                  onCartToggle={() => setIsCartOpen(true)}
                  onLoginToggle={() => setIsAuthModalOpen(true)}
                  onWishlistToggle={() => setIsWishlistOpen(true)}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />

                <main className="relative z-10">
                  {/* Hero Section */}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="card-glass p-8 mb-12 relative overflow-hidden">
                      <div className="absolute inset-0 animated-gradient opacity-10"></div>
                      <div className="relative z-10 max-w-4xl">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
                          Discover Amazing Products
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                          Shop the latest trends with unbeatable prices and lightning-fast shipping
                        </p>
                        <div className="flex flex-wrap gap-6 text-sm">
                          <div className="flex items-center space-x-3 glass px-4 py-2 rounded-full">
                            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
                            <span className="font-medium">Free shipping over $50</span>
                          </div>
                          <div className="flex items-center space-x-3 glass px-4 py-2 rounded-full">
                            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                            <span className="font-medium">30-day returns</span>
                          </div>
                          <div className="flex items-center space-x-3 glass px-4 py-2 rounded-full">
                            <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                            <span className="font-medium">24/7 support</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Filters and Products Section */}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Product Grid Header */}
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-3xl font-bold gradient-text">
                        Products ({filteredAndSortedProducts.length})
                      </h2>
                      <div className="text-sm text-gray-600 glass px-4 py-2 rounded-full">
                        Showing {filteredAndSortedProducts.length} of {products.length} products
                      </div>
                    </div>

                    {/* Main Content Layout - Full Width */}
                    <div className="space-y-8">
                      {/* Product Grid - Full Width */}
                      <div className="w-full">
                        {filteredAndSortedProducts.length === 0 ? (
                          <div className="text-center py-16">
                            <div className="glass-strong rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                              <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                              </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
                            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                            <button
                              onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('All');
                                setPriceRange([0, 1000]);
                              }}
                              className="btn-primary"
                            >
                              Clear Filters
                            </button>
                          </div>
                        ) : (
                          <div className="card-grid-container">
                            {filteredAndSortedProducts.map((product) => (
                              <ProductCard
                                key={product.id}
                                product={product}
                                onQuickView={handleQuickView}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </main>

                {/* Modals */}
                <Cart
                  isOpen={isCartOpen}
                  onClose={() => setIsCartOpen(false)}
                  onCheckout={handleCheckout}
                />

                <Wishlist
                  isOpen={isWishlistOpen}
                  onClose={() => setIsWishlistOpen(false)}
                  onQuickView={handleQuickView}
                />

                <AuthModal
                  isOpen={isAuthModalOpen}
                  onClose={() => setIsAuthModalOpen(false)}
                />

                <CheckoutModal
                  isOpen={isCheckoutModalOpen}
                  onClose={() => setIsCheckoutModalOpen(false)}
                />

                <ProductModal
                  product={selectedProduct}
                  isOpen={isProductModalOpen}
                  onClose={() => setIsProductModalOpen(false)}
                />
              </div>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;