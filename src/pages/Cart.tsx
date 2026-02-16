import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../utils/Toast';
import { sendWhatsAppMessage, formatCurrency, generateOrderMessage, getBrandName } from '../utils/helpers';
import './Pages.css';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const { addToast } = useToast();
  const brandName = getBrandName();
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '1234567890';

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    addToast(`${name} removed from cart`, 'info');
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      addToast('Your cart is empty', 'warning');
      return;
    }

    const message = generateOrderMessage(cart, brandName);
    sendWhatsAppMessage(phoneNumber, message);
    clearCart();
    addToast('Order sent! Check WhatsApp for confirmation.', 'success');
  };

  return (
    <div className="cart-page">
      <div className="container">
        <Link to="/shop" className="btn btn-outline" style={{ marginBottom: '1rem' }}>
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>

        <h1>Shopping Cart</h1>

        {cart.length > 0 ? (
          <div className="cart-content">
            {/* Cart Items */}
            <div className="cart-items">
              <h2 style={{ marginTop: 0 }}>Your Items ({cart.length})</h2>

              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image_url} alt={item.name} />
                  </div>

                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p style={{ marginBottom: '0.5rem' }}>
                      Price: {formatCurrency(item.price)}
                    </p>
                    <div className="quantity-selector" style={{ width: 'fit-content' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        −
                      </button>
                      <input
                        type="number"
                        className="quantity-input"
                        value={item.quantity}
                        readOnly
                      />
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    <div className="cart-item-price">
                      <p style={{ textAlign: 'right', fontWeight: 600, fontSize: '1.1rem' }}>
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                    <button
                      className="cart-item-remove"
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      title="Remove from cart"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="cart-summary">
              <h2 style={{ marginTop: 0 }}>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping:</span>
                <span style={{ color: 'var(--text-light)' }}>Confirm via WhatsApp</span>
              </div>

              <div style={{
                borderTop: '2px solid var(--border-color)',
                paddingTop: '1rem',
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--primary-color)'
              }}>
                <span>Estimated Total:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              <p style={{
                color: 'var(--text-light)',
                fontSize: '0.9rem',
                marginBottom: '1.5rem'
              }}>
                Final price and shipping will be confirmed on WhatsApp.
              </p>

              <div className="checkout-buttons">
                <button onClick={handleCheckout} className="btn btn-primary btn-lg">
                  Order on WhatsApp
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear your cart?')) {
                      clearCart();
                      addToast('Cart cleared', 'info');
                    }
                  }}
                  className="btn btn-outline"
                >
                  Clear Cart
                </button>
              </div>

              {/* Info Box */}
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                backgroundColor: 'var(--light-bg)',
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: 'var(--text-light)'
              }}>
                <h4 style={{ marginTop: 0, color: 'var(--text-dark)' }}>How it works:</h4>
                <ol style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  <li>Click "Order on WhatsApp"</li>
                  <li>Chat with our team</li>
                  <li>Confirm final price & shipping</li>
                  <li>Complete payment</li>
                  <li>Receive tracking info</li>
                </ol>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet.</p>
            <Link to="/shop" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
