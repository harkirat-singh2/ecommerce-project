import React from 'react';
import { X, Star, ShoppingCart, Heart, Share2, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h2 className="text-2xl font-bold gradient-text">Product Details</h2>
          <button
            onClick={onClose}
            className="p-3 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110 rounded-full hover:bg-white/10"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Category Badge */}
              <div className="absolute top-4 left-4 glass px-4 py-2 rounded-full">
                <span className="text-sm font-semibold text-gray-700">{product.category}</span>
              </div>
              {/* Stock Badge */}
              {product.stock <= 5 && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold">Only {product.stock} left</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current drop-shadow-sm'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg text-gray-600 font-medium">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold gradient-text">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  <span className="text-sm text-gray-500 font-medium">Premium Quality</span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-3 p-4 glass rounded-xl">
                <div className={`w-3 h-3 rounded-full ${
                  product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-orange-500' : 'bg-red-500'
                }`} />
                <span className="text-lg text-gray-700 font-medium">
                  {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}
                </span>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <div
                        key={index}
                        className="glass px-4 py-3 rounded-xl flex items-center space-x-3"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full btn-primary flex items-center justify-center space-x-3 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                </button>

                <div className="flex space-x-4">
                  <button className="flex-1 glass py-3 px-6 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2">
                    <Heart className="h-5 w-5" />
                    <span>Wishlist</span>
                  </button>
                  <button className="flex-1 glass py-3 px-6 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2">
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;