import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="py-4">
      <div className="container">
        <p className="text-center mb-2">Serenity Spa</p>
        <p className="text-center mb-4">For more beauty and health tips and tricks, keep up with us on social media and be aware of our offers and discounts</p>
        <div className="text-center mb-3">
          <a href="#" className="text-white mx-2"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-white mx-2"><i className="fab fa-instagram"></i></a>
          <a href="#" className="text-white mx-2"><i className="fab fa-whatsapp"></i></a>
        </div>
        <p className="text-center mb-0">© Serenity Spa. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
