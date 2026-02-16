import React from 'react';
import { MessageCircle } from 'lucide-react';
import { sendWhatsAppMessage } from '../../utils/helpers';
import './WhatsAppButton.css';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '1234567890';

  const handleClick = () => {
    const message = `Hi {{BRAND_NAME}}, I would like to know more about your products!`;
    sendWhatsAppMessage(phoneNumber, message);
  };

  return (
    <button className="whatsapp-button" onClick={handleClick} aria-label="Contact on WhatsApp" title="Chat with us on WhatsApp">
      <MessageCircle size={28} />
    </button>
  );
};

export default WhatsAppButton;
