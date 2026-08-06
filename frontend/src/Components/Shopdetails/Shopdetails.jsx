import React from 'react';
import './Shopdetails.css';
import { FaStar, FaRegStar } from 'react-icons/fa';

// Sample background image imports from src/assets (adjust names as needed in your project)
import img1 from '../../assets/pic1.jpg';
import img2 from '../../assets/pic2.jpg';
import img3 from '../../assets/pic3.jpg';
import img4 from '../../assets/pic4.jpg';
import img5 from '../../assets/pic5.jpg';
import img6 from '../../assets/pic6.jpg';
import img7 from '../../assets/pic7.jpg';
import img8 from '../../assets/pic8.jpg';
import img9 from '../../assets/pic9.jpg';
import img10 from '../../assets/pic10.jpg';
import img11 from '../../assets/pic11.jpg';
import img12 from '../../assets/pic12.jpg';

const products = [
  {
    id: 1,
    title: 'Creative Arts',
    image: img1,
    price: '$45.00',
    onSale: false,
  },
  {
    id: 2,
    title: 'Discovery Lab',
    image: img2,
    originalPrice: '$100.00',
    price: '$50.00',
    onSale: true,
    rating: 4,
  },
  {
    id: 3,
    title: 'Fine Motor',
    image: img3,
    price: '$75.00',
    onSale: false,
  },
  {
    id: 4,
    title: 'Groove Fitness',
    image: img4,
    price: '$45.00',
    onSale: false,
  },
  {
    id: 5,
    title: 'Group Work',
    image: img5,
    originalPrice: '$89.00',
    price: '$34.00',
    onSale: true,
  },
  {
    id: 6,
    title: 'Language Fun',
    image: img6,
    originalPrice: '$140.00',
    price: '$89.00',
    onSale: true,
  },
  {
    id: 7,
    title: 'Little Scientists',
    image: img7,
    price: '$35.00',
    onSale: false,
  },
  {
    id: 8,
    title: 'Logic Games',
    image: img8,
    price: '$99.00',
    onSale: false,
  },
  {
    id: 9,
    title: 'Motor Skills',
    image: img9,
    price: '$47.00',
    onSale: false,
  },
  {
    id: 10,
    title: 'Nature Explorers',
    image: img10,
    price: '$75.00',
    onSale: false,
  },
  {
    id: 11,
    title: 'Puzzle Play',
    image: img11,
    originalPrice: '$93.00',
    price: '$78.00',
    onSale: true,
  },
  {
    id: 12,
    title: 'Sensory Playtime',
    image: img12,
    price: '$120.00',
    onSale: false,
  },
];

const Shopdetails = () => {
  const renderRating = (rating) => {
    return (
      <div className="Shopdetails-rating">
        {[...Array(5)].map((_, index) => (
          index < rating ? (
            <FaStar key={index} className="Shopdetails-star-filled" />
          ) : (
            <FaRegStar key={index} className="Shopdetails-star-empty" />
          )
        ))}
      </div>
    );
  };

  return (
    <div className="Shopdetails">
      <div className="Shopdetails-container">
        <div className="Shopdetails-grid">
          {products.map((item) => (
            <div className="Shopdetails-card" key={item.id}>
              <div className="Shopdetails-image-wrapper">
                <img src={item.image} alt={item.title} className="Shopdetails-image" />
                {item.onSale && <span className="Shopdetails-sale-badge">Sale!</span>}
              </div>

              <div className="Shopdetails-info">
                <h3 className="Shopdetails-card-title">{item.title}</h3>
                
                {item.rating && renderRating(item.rating)}

                <div className="Shopdetails-price-wrapper">
                  {item.originalPrice && (
                    <span className="Shopdetails-original-price">{item.originalPrice}</span>
                  )}
                  <span className={`Shopdetails-price ${item.originalPrice ? 'Shopdetails-sale-price' : ''}`}>
                    {item.price}
                  </span>
                </div>

                <button className="Shopdetails-btn">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shopdetails;