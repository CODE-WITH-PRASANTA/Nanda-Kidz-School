import React from 'react';
import './Blogpicture.css';

const blogPosts = [
  {
    id: 1,
    title: 'Feel the Joy',
    date: 'January 31, 2025',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Happy Hearts',
    date: 'January 31, 2025',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Time to Cuddle',
    date: 'January 31, 2025',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Quiet Moments',
    date: 'January 31, 2025',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Little Smiles',
    date: 'January 31, 2025',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Shine Bright',
    date: 'January 31, 2025',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop',
  },
];

const Blogpicture = () => {
  return (
    <section className="blog-section-container">
      <div className="blog-grid flex-grid">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-card">
            <img src={post.image} alt={post.title} className="blog-card-img" />
            
            {/* कार्ड के नीचे डार्क ग्रेडिएंट ओवरले ताकि टेक्स्ट साफ़ दिखे */}
            <div className="blog-card-overlay">
              <span className="blog-date-tag">{post.date}</span>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-desc">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogpicture;