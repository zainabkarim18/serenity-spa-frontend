import React from 'react';

const Footer = () => {
  return (
    <footer>
      <p>Serenity Spa</p>
      <p>For more beauty and health tips and tricks, keep up with us on social media and be aware of our offers and discounts</p>
      <div className="social">
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-whatsapp"></i></a>
      </div>
      <p className="end">© Serenity Spa. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
