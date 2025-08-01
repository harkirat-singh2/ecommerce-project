import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    price: 299.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    stock: 25,
    rating: 4.8,
    reviews: 127,
    features: ['Noise Cancellation', '30h Battery', 'Wireless', 'Premium Audio']
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitoring and GPS functionality.',
    price: 249.99,
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    stock: 18,
    rating: 4.6,
    reviews: 89,
    features: ['Heart Rate Monitor', 'GPS', 'Water Resistant', 'Sleep Tracking']
  },
  {
    id: '3',
    name: 'Professional Camera Lens',
    description: 'High-performance lens for professional photography with exceptional clarity.',
    price: 899.99,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Photography',
    stock: 12,
    rating: 4.9,
    reviews: 43,
    features: ['Professional Grade', 'Ultra Sharp', 'Weather Sealed', 'Fast Autofocus']
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable ergonomic chair designed for long work sessions with lumbar support.',
    price: 399.99,
    image: 'https://images.pexels.com/photos/586799/pexels-photo-586799.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Furniture',
    stock: 8,
    rating: 4.7,
    reviews: 156,
    features: ['Ergonomic Design', 'Lumbar Support', 'Adjustable Height', 'Premium Materials']
  },
  {
    id: '5',
    name: 'Minimalist Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness and wireless charging base.',
    price: 79.99,
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Home',
    stock: 32,
    rating: 4.5,
    reviews: 78,
    features: ['LED Lighting', 'Wireless Charging', 'Adjustable', 'Modern Design']
  },
  {
    id: '6',
    name: 'Premium Coffee Maker',
    description: 'Professional-grade coffee maker with programmable settings and thermal carafe.',
    price: 199.99,
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Kitchen',
    stock: 15,
    rating: 4.4,
    reviews: 92,
    features: ['Programmable', 'Thermal Carafe', 'Auto Shut-off', 'Premium Build']
  },
  {
    id: '7',
    name: 'Luxury Leather Backpack',
    description: 'Handcrafted leather backpack with laptop compartment and premium finish.',
    price: 159.99,
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Fashion',
    stock: 22,
    rating: 4.6,
    reviews: 67,
    features: ['Genuine Leather', 'Laptop Compartment', 'Handcrafted', 'Premium Quality']
  },
  {
    id: '8',
    name: 'Wireless Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with exceptional sound quality and long battery life.',
    price: 89.99,
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    stock: 45,
    rating: 4.3,
    reviews: 134,
    features: ['Wireless', 'Portable', '12h Battery', 'High Quality Audio']
  }
];

export const categories = [
  'All',
  'Electronics',
  'Photography',
  'Furniture',
  'Home',
  'Kitchen',
  'Fashion'
];