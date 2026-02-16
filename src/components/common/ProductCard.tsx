import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import type { Product } from '../../context/DataContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../utils/Toast';
import { formatCurrency } from '../../utils/helpers';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    addToast(`${product.name} added to cart!`, 'success');
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    addToast(isFavorite ? 'Removed from favorites' : 'Added to favorites', 'info');
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card-wrapper">
      <div
        className="product-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="product-image-container">
          <img
            src={product.image_url}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />

          {product.is_featured && <span className="featured-badge">Featured</span>}

          {product.status && (
            <span className={`status-badge status-${product.status}`}>
              {product.status === 'preorder' ? 'Pre-order' : 'In Stock'}
            </span>
          )}

          {isHovered && (
            <div className="product-overlay">
              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                aria-label="Add to cart"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button
                className={`btn-icon ${isFavorite ? 'active' : ''}`}
                onClick={handleToggleFavorite}
                aria-label="Add to favorites"
              >
                <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>
          )}
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description.substring(0, 60)}...</p>

          <div className="product-footer">
            <span className="product-price">{formatCurrency(product.price_estimate)}</span>
            {product.estimated_delivery && (
              <span className="product-delivery">Est. {product.estimated_delivery}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
