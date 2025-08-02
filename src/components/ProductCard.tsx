import React from 'react';
import { ShoppingCart, Star, Heart, Eye, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showNotification } = useNotification();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      addToCart(product);
      showNotification({
        type: 'success',
        title: 'Added to Cart!',
        message: `${product.name} has been added to your cart.`,
        icon: <ShoppingCart className="h-5 w-5 text-green-500" />,
        duration: 3000
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      showNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to add item to cart. Please try again.',
        duration: 4000
      });
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
        showNotification({
          type: 'info',
          title: 'Removed from Wishlist',
          message: `${product.name} has been removed from your wishlist.`,
          icon: <Heart className="h-5 w-5 text-red-500" />,
          duration: 3000
        });
      } else {
        addToWishlist(product);
        showNotification({
          type: 'success',
          title: 'Added to Wishlist!',
          message: `${product.name} has been added to your wishlist.`,
          icon: <Heart className="h-5 w-5 text-red-500 fill-current" />,
          duration: 3000
        });
      }
    } catch (error) {
      console.error('Error handling wishlist:', error);
      showNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to update wishlist. Please try again.',
        duration: 4000
      });
    }
  };

  const handleCardClick = () => {
    onQuickView(product);
  };

  const isWishlisted = isInWishlist(product.id);

  return (
    <div 
      className="group relative cursor-pointer transform transition-all duration-500 hover:scale-105"
      onClick={handleCardClick}
    >
      {/* Main Card Container */}
      <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white dark:bg-gray-800">
        {/* Top Section - Image (60% of card) */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Floating Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
            <button
              onClick={handleQuickView}
              className="glass-strong p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
              title="Quick View"
            >
              <Eye className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            </button>
            <button 
              onClick={handleWishlist}
              className={`glass-strong p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-300 ${
                isWishlisted ? 'bg-red-500/20 border-red-500/30' : ''
              }`}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart 
                className={`h-4 w-4 transition-all duration-300 ${
                  isWishlisted 
                    ? 'text-red-500 fill-current' 
                    : 'text-gray-700 dark:text-gray-300'
                }`} 
              />
            </button>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full">
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{product.category}</span>
          </div>

          {/* Stock Badge */}
          {product.stock <= 5 && (
            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full shadow-lg">
              <span className="text-xs font-semibold">Only {product.stock} left</span>
            </div>
          )}

          {/* Wishlist Indicator */}
          {isWishlisted && (
            <div className="absolute bottom-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full shadow-lg">
              <span className="text-xs font-semibold">♥</span>
            </div>
          )}
        </div>

        {/* Bottom Section - Content (40% of card) */}
        <div className="relative p-6 bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500">
          {/* Content Container */}
          <div className="space-y-4">
            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300 line-clamp-2">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
              {product.description}
            </p>

            {/* Rating and Price Row */}
            <div className="flex items-center justify-between">
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current drop-shadow-sm'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                  {product.rating}
                </span>
              </div>

              {/* Price */}
              <div className="text-right">
                <span className="text-2xl font-bold gradient-text">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full glass py-3 px-4 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 flex items-center justify-center space-x-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                title={product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              >
                <ShoppingCart className="h-4 w-4" />
                <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Features Preview */}
            {product.features && product.features.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {product.features.slice(0, 2).map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs glass px-2 py-1 rounded-full font-medium text-gray-700 dark:text-gray-300"
                  >
                    {feature}
                  </span>
                ))}
                {product.features.length > 2 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    +{product.features.length - 2} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Premium Badge */}
          <div className="absolute top-4 right-4 flex items-center space-x-1">
            <Sparkles className="h-3 w-3 text-purple-500" />
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Premium</span>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
    </div>
  );
};

export default ProductCard;