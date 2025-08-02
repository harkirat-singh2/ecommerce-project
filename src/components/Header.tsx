import React, { useState } from 'react';
import { ShoppingCart, Search, User, Menu, X, Heart, Bell, Sun, Moon, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';

interface HeaderProps {
  onCartToggle: () => void;
  onLoginToggle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  onWishlistToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onCartToggle, 
  onLoginToggle, 
  searchQuery, 
  onSearchChange,
  selectedCategory = 'All',
  onCategoryChange,
  onWishlistToggle
}) => {
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  // Available categories from products
  const categories = ['All', 'Electronics', 'Photography', 'Furniture', 'Home', 'Kitchen', 'Fashion'];

  const handleCategoryClick = (category: string) => {
    if (onCategoryChange) {
      onCategoryChange(category);
    }
    setIsCategoryMenuOpen(false);
  };

  const handleWishlistClick = () => {
    if (onWishlistToggle) {
      onWishlistToggle();
    }
  };

  return (
    <header className="glass-strong sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold gradient-text">ShopHub</h1>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
                placeholder="Search for amazing products..."
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* Wishlist Button */}
            <button 
              onClick={handleWishlistClick}
              className="relative p-3 text-gray-600 hover:text-red-600 transition-all duration-300 hover:scale-110"
              title="View Wishlist"
            >
              <Heart className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button className="p-3 text-gray-600 hover:text-orange-600 transition-all duration-300 hover:scale-110">
              <Bell className="h-6 w-6" />
            </button>
            
            {/* Cart Button */}
            <button
              onClick={onCartToggle}
              className="relative p-3 text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-105"
                >
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-white/50 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="hidden lg:block font-medium">{user.name}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 card-glass py-2 z-50">
                    <div className="px-4 py-3 border-b border-white/20">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <a href="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-white/10 transition-colors">
                      <div className="flex items-center space-x-3">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </div>
                    </a>
                    <a href="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-white/10 transition-colors">
                      <div className="flex items-center space-x-3">
                        <ShoppingCart className="h-4 w-4" />
                        <span>Orders</span>
                      </div>
                    </a>
                    <a href="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-white/10 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-4 w-4" />
                        <span>Settings</span>
                      </div>
                    </a>
                    <div className="border-t border-white/20 mt-2 pt-2">
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50/10 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <X className="h-4 w-4" />
                          <span>Sign out</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginToggle}
                className="btn-primary flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-110"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="border-t border-white/20 py-4">
          <div className="flex items-center justify-between">
            {/* Desktop Category Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-700 hover:text-purple-600 glass hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Mobile Category Dropdown */}
            <div className="md:hidden relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center space-x-2 px-4 py-2 glass rounded-xl font-medium text-gray-700 hover:text-purple-600 transition-all duration-300"
              >
                <span>{selectedCategory}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 card-glass py-2 z-50">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`block w-full text-left px-4 py-3 text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'text-gray-700 hover:bg-white/10'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Count */}
            <div className="hidden md:block text-sm text-gray-600 glass px-3 py-1 rounded-full">
              <span className="font-medium">{selectedCategory}</span>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-6">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
              placeholder="Search for amazing products..."
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20">
            <div className="px-2 pt-4 pb-6 space-y-3">
              {/* Theme Toggle Mobile */}
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 px-4 py-3 rounded-xl text-base font-medium w-full glass hover:bg-white/10 transition-all duration-300"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
              </button>

              <button
                onClick={onCartToggle}
                className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 px-4 py-3 rounded-xl text-base font-medium w-full glass hover:bg-white/10 transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({itemCount})</span>
              </button>

              <button 
                onClick={handleWishlistClick}
                className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 px-4 py-3 rounded-xl text-base font-medium w-full glass hover:bg-white/10 transition-all duration-300"
              >
                <Heart className="h-5 w-5" />
                <span>Wishlist ({wishlistCount})</span>
              </button>
              
              {user ? (
                <>
                  <div className="flex items-center space-x-3 px-4 py-3 glass rounded-xl">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-white/50"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="block text-red-600 hover:text-red-700 px-4 py-3 rounded-xl text-base font-medium w-full text-left glass hover:bg-red-50/10 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <X className="h-5 w-5" />
                      <span>Sign out</span>
                    </div>
                  </button>
                </>
              ) : (
                <button
                  onClick={onLoginToggle}
                  className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 px-4 py-3 rounded-xl text-base font-medium w-full glass hover:bg-white/10 transition-all duration-300"
                >
                  <User className="h-5 w-5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;