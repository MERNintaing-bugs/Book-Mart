import React from 'react';
import './Deals.css';

const deals = [
  {
    id: 1,
    title: 'Atomic Habits',
    price: '₹199',
    discount: '40% OFF',
    image: 'https://m.media-amazon.com/images/I/91bYsX41DVL._SY466_.jpg'
  },
  {
    id: 2,
    title: 'Deep Work',
    price: '₹249',
    discount: '35% OFF',
    image: 'https://5.imimg.com/data5/SELLER/Default/2022/2/JN/OT/TH/147304712/whatsapp-image-2022-02-11-at-3-26-48-pm.jpeg'
  },
  {
    id: 3,
    title: 'The Subtle Art',
    price: '₹179',
    discount: '50% OFF',
    image: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY466_.jpg'
  },
  {
    id: 4,
    title: 'Think Like a Monk',
    price: '₹299',
    discount: '25% OFF',
    image: 'https://m.media-amazon.com/images/I/71g2ednj0JL._SY466_.jpg'
  }
];

const Deals = () => {
  return (
    <div className="deals-section">
      <h2>🔥 Book Deals of the Day</h2>
      <div className="slider">
        <div className="slider-track">
          {deals.concat(deals).map((deal, index) => (
            <div className="deal-card" key={index}>
              <img src={deal.image} alt={deal.title} />
              <h4>{deal.title}</h4>
              <p className="price">{deal.price} <span className="discount">{deal.discount}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deals;
