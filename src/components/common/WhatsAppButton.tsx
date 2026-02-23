import React from 'react';
import { MessageCircle } from 'lucide-react';
import { sendWhatsAppMessage } from '../../utils/helpers';
import { useData } from '../../context/DataContext';
import './WhatsAppButton.css';

const WhatsAppButton: React.FC = () => {
  const { settings } = useData();

  const handleClick = () => {
    const message = `Hi ${settings.brandName}, I would like to know more about your products!`;
    sendWhatsAppMessage(settings.whatsappNumber, message);
  };

  return (
    <button className="whatsapp-button" onClick={handleClick} aria-label="Contact on WhatsApp" title="Chat with us on WhatsApp">
      <MessageCircle size={28} />
    </button>
  );
};

export default WhatsAppButton;
