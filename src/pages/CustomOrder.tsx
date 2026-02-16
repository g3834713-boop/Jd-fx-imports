import React, { useState } from 'react';
import { useToast } from '../utils/Toast';
import { sendWhatsAppMessage, generateCustomOrderMessage, getBrandName } from '../utils/helpers';
import './Pages.css';

const CustomOrder: React.FC = () => {
  const [formData, setFormData] = useState({
    productLink: '',
    description: '',
    quantity: 1,
    country: '',
    referenceImage: ''
  });

  const { addToast } = useToast();
  const brandName = getBrandName();
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '1234567890';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.productLink.trim()) {
      addToast('Please provide a product link', 'error');
      return;
    }

    if (!formData.description.trim()) {
      addToast('Please describe your custom order', 'error');
      return;
    }

    if (formData.quantity < 1) {
      addToast('Quantity must be at least 1', 'error');
      return;
    }

    if (!formData.country.trim()) {
      addToast('Please select your country', 'error');
      return;
    }

    // Generate and send message
    const message = generateCustomOrderMessage(formData, brandName);
    sendWhatsAppMessage(phoneNumber, message);

    // Reset form
    setFormData({
      productLink: '',
      description: '',
      quantity: 1,
      country: '',
      referenceImage: ''
    });

    addToast('Custom order sent! Check WhatsApp for update.', 'success');
  };

  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia',
    'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados',
    'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina',
    'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia',
    'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China',
    'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
    'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt',
    'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji',
    'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada',
    'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary',
    'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan',
    'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea North', 'Korea South', 'Kuwait', 'Kyrgyzstan',
    'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania',
    'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands',
    'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro',
    'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand',
    'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau',
    'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar',
    'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
    'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles',
    'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa',
    'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
    'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia',
    'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
    'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
    'Yemen', 'Zambia', 'Zimbabwe'
  ];

  return (
    <div className="custom-order-page">
      <div className="container">
        <h1>Custom Order</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '2rem' }}>
          Can't find what you're looking for? Submit a custom order request and we'll help you find it from China!
        </p>

        <div className="custom-order-container">
          <form onSubmit={handleSubmit} className="custom-order-form">
            {/* Product Link */}
            <div className="form-group">
              <label htmlFor="productLink">Product Link or Name *</label>
              <input
                type="text"
                id="productLink"
                name="productLink"
                value={formData.productLink}
                onChange={handleInputChange}
                placeholder="e.g., https://aliexpress.com/... or Describe the product you want"
                required
              />
              <div className="form-info">
                Share a link to the product (AliExpress, Amazon, etc.) or describe what you're looking for
              </div>
            </div>

            {/* Reference Image URL */}
            <div className="form-group">
              <label htmlFor="referenceImage">Reference Image (optional)</label>
              <input
                type="url"
                id="referenceImage"
                name="referenceImage"
                value={formData.referenceImage}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
              <div className="form-info">
                Add a link to an image if you have a specific design in mind
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Tell us more details about what you need - color, size, specifications, etc."
                required
              />
              <div className="form-info">
                The more details you provide, the better we can help!
              </div>
            </div>

            {/* Quantity */}
            <div className="form-group">
              <label htmlFor="quantity">Quantity *</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
              <div className="form-info">
                How many units do you need? Bulk orders get better pricing!
              </div>
            </div>

            {/* Country */}
            <div className="form-group">
              <label htmlFor="country">Shipping Country *</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your country...</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <div className="form-info">
                We ship worldwide! Select your destination country
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="form-submit">
              Send Custom Order Request
            </button>

            {/* Info Box */}
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              backgroundColor: 'var(--light-bg)',
              borderRadius: '8px',
              color: 'var(--text-light)'
            }}>
              <h3 style={{ marginTop: 0, color: 'var(--text-dark)' }}>What happens next?</h3>
              <ol style={{ margin: 0, paddingLeft: '1.5rem' }}>
                <li>We receive your custom order request</li>
                <li>Our team searches for the product from trusted suppliers</li>
                <li>We send you a WhatsApp message with pricing and availability</li>
                <li>You confirm and we arrange payment & shipping</li>
                <li>Your product is shipped directly to you!</li>
              </ol>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomOrder;
