import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../utils/Toast';
import { sendWhatsAppMessage, formatCurrency, getBrandName } from '../utils/helpers';
import './Pages.css';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById } = useData();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id || '');
  const brandName = getBrandName();
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '1234567890';

  if (!product) {
    return (
      <div className="container" style={{ paddingTop: '2rem', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button onClick={() => navigate('/shop')} className="btn btn-primary">
          Back to Shop
        </button>
      </div>
    );
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    addToast(`${product.name} x${quantity} added to cart!`, 'success');
    setQuantity(1);
  };

  const handleWhatsAppOrder = () => {
    const message = `Hi {{BRAND_NAME}}, I'm interested in:\n\n${product.name} x${quantity}\n\nPrice: ${formatCurrency(product.price_estimate * quantity)}\n\nPlease confirm final price and shipping cost to my country.`;
    sendWhatsAppMessage(phoneNumber, message);
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      addToast('Link copied to clipboard!', 'success');
    }
  };

  return (
    <div className="product-details">
      <div className="container">
        <button onClick={() => navigate('/shop')} className="btn btn-outline" style={{ marginBottom: '1rem' }}>
          <ArrowLeft size={18} />
          Back to Shop
        </button>

        <div className="product-details-container">
          {/* Product Image */}
          <div className="product-details-image">
            <img src={product.image_url} alt={product.name} />
          </div>

          {/* Product Info */}
          <div className="product-details-info">
            <h1>{product.name}</h1>

            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Price</span>
                <span className="meta-value">{formatCurrency(product.price_estimate)}</span>
              </div>

              <div className="meta-item">
                <span className="meta-label">Status</span>
                <span className={`meta-value status-${product.status}`}>
                  {product.status === 'preorder' ? 'Pre-order' : 'In Stock'}
                </span>
              </div>

              {product.estimated_delivery && (
                <div className="meta-item">
                  <span className="meta-label">Delivery</span>
                  <span className="meta-value">{product.estimated_delivery}</span>
                </div>
              )}

              {product.is_featured && (
                <div className="meta-item">
                  <span className="meta-label">Featured</span>
                  <span className="meta-value">⭐ Featured</span>
                </div>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            {/* Quantity Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                Quantity
              </label>
              <div className="quantity-selector">
                <button onClick={() => handleQuantityChange(quantity - 1)}>−</button>
                <input type="number" className="quantity-input" value={quantity} readOnly />
                <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="product-actions">
              <button onClick={handleAddToCart} className="btn btn-primary btn-lg">
                Add to Cart
              </button>
              <button onClick={handleWhatsAppOrder} className="btn btn-secondary btn-lg">
                Order via WhatsApp
              </button>
              <button onClick={handleShare} className="btn btn-outline" style={{ justifyContent: 'center' }}>
                <Share2 size={18} />
                Share
              </button>
            </div>

            {/* Additional Info */}
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              backgroundColor: 'var(--light-bg)',
              borderRadius: '8px'
            }}>
              <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Why Choose {brandName}?</h3>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-light)' }}>
                <li>Competitive pricing from China suppliers</li>
                <li>Global shipping available</li>
                <li>Easy WhatsApp communication</li>
                <li>Quality assured products</li>
                <li>Flexible order quantities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
