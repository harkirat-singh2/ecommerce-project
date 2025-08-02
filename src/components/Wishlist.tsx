import React from 'react';
import { X, Heart, ShoppingCart, Trash2, Eye } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickView?: (product: any) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ isOpen, onClose, onQuickView }) => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  if (!isOpen) return null;

  const handleAddToCart = (product: any) => {
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
      showNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to add item to cart. Please try again.',
        duration: 4000
      });
    }
  };

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    try {
      removeFromWishlist(productId);
      showNotification({
        type: 'info',
        title: 'Removed from Wishlist',
        message: `${productName} has been removed from your wishlist.`,
        icon: <Heart className="h-5 w-5 text-red-500" />,
        duration: 3000
      });
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to remove item from wishlist. Please try again.',
        duration: 4000
      });
    }
  };

  const handleClearWishlist = () => {
    try {
      clearWishlist();
      showNotification({
        type: 'info',
        title: 'Wishlist Cleared',
        message: 'All items have been removed from your wishlist.',
        icon: <Heart className="h-5 w-5 text-red-500" />,
        duration: 3000
      });
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to clear wishlist. Please try again.',
        duration: 4000
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">My Wishlist</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {wishlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Heart className="h-16 w-16 mb-4 text-red-400" />
                <p className="text-lg font-medium">Your wishlist is empty</p>
                <p className="text-sm">Add some products to your wishlist</p>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlist.map((product) => (
                  <div key={product.id} className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-20 w-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                        <p className="text-lg font-semibold text-gray-900 mt-2">
                          ${product.price.toFixed(2)}
                        </p>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2 mt-3">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                          >
                            <ShoppingCart className="h-3 w-3" />
                            <span>Add to Cart</span>
                          </button>
                          
                          {onQuickView && (
                            <button
                              onClick={() => onQuickView(product)}
                              className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white text-xs rounded-md hover:bg-gray-700 transition-colors"
                            >
                              <Eye className="h-3 w-3" />
                              <span>View</span>
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleRemoveFromWishlist(product.id, product.name)}
                            className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 transition-colors"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Clear Wishlist Button */}
                {wishlist.length > 0 && (
                  <button
                    onClick={handleClearWishlist}
                    className="w-full text-center text-sm text-red-600 hover:text-red-800 transition-colors py-2 border border-red-200 rounded-md hover:bg-red-50"
                  >
                    Clear Wishlist
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between text-lg font-semibold mb-4">
                <span>Total Items:</span>
                <span>{wishlist.length}</span>
              </div>
              
              <button
                onClick={onClose}
                className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist; 