import React from 'react';
import { Filter, X, Sliders, Sparkles } from 'lucide-react';

interface ProductFilterProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
  isOpen,
  onToggle
}) => {
  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={onToggle}
          className="btn-secondary flex items-center space-x-3 w-full justify-center"
        >
          <Sliders className="h-4 w-4" />
          <span>Filters & Sort</span>
        </button>
      </div>

      {/* Filter Panel */}
      <div className={`card-glass p-6 ${isOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h3 className="text-xl font-bold gradient-text">Filters</h3>
          <button onClick={onToggle} className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Price Range */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-bold text-gray-900">Price Range</h3>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer custom-slider"
                />
                <div className="absolute inset-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg pointer-events-none" 
                     style={{ width: `${(priceRange[1] / 1000) * 100}%` }}></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-medium">${priceRange[0]}</span>
                <span className="text-gray-600 font-medium">${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sliders className="h-5 w-5 text-green-500" />
              <h3 className="text-lg font-bold text-gray-900">Sort By</h3>
            </div>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="input-glass w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              onPriceRangeChange([0, 1000]);
              onSortChange('name');
            }}
            className="w-full btn-secondary flex items-center justify-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Clear All Filters</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;