import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Blogpicture.css';

// Import reference images
import img1 from "../../assets/c-4.webp";
import img2 from "../../assets/c-5.webp";
import img3 from "../../assets/c-6.webp";

// All Posts Data
const allBlogPosts = [
  // Page 1 Data
  {
    id: 1,
    image: img1,
    author: 'Jack John',
    date: '25 Dec 2026',
    title: 'Red Green Color Blindness',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 2,
    image: img2,
    author: 'Jack John',
    date: '25 Dec 2026',
    title: '8 Ways to Learning Lesson',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 3,
    image: img3,
    author: 'Jack John',
    date: '25 Dec 2026',
    title: 'Full-Day Session With Activities',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  // Page 2 Dummy Data
  {
    id: 4,
    image: 'https://picsum.photos/seed/child1/600/400',
    author: 'Jack John',
    date: '26 Dec 2026',
    title: 'Early Childhood Development Activities',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 5,
    image: 'https://picsum.photos/seed/child2/600/400',
    author: 'Jack John',
    date: '26 Dec 2026',
    title: 'Creative Arts and Crafts for Kids',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 6,
    image: 'https://picsum.photos/seed/child3/600/400',
    author: 'Jack John',
    date: '26 Dec 2026',
    title: 'Interactive Learning in Classroom',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  // Page 3 Dummy Data
  {
    id: 7,
    image: 'https://picsum.photos/seed/child4/600/400',
    author: 'Jack John',
    date: '27 Dec 2026',
    title: 'Outdoor Play & Physical Growth',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 8,
    image: 'https://picsum.photos/seed/child5/600/400',
    author: 'Jack John',
    date: '27 Dec 2026',
    title: 'Social Skill Building Workshops',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 9,
    image: 'https://picsum.photos/seed/child6/600/400',
    author: 'Jack John',
    date: '27 Dec 2026',
    title: 'Music and Movement Program',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  // Page 4 Dummy Data
  {
    id: 10,
    image: 'https://picsum.photos/seed/child7/600/400',
    author: 'Jack John',
    date: '28 Dec 2026',
    title: 'Reading and Storytelling Sessions',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 11,
    image: 'https://picsum.photos/seed/child8/600/400',
    author: 'Jack John',
    date: '28 Dec 2026',
    title: 'Healthy Habits and Nutrition',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 12,
    image: 'https://picsum.photos/seed/child9/600/400',
    author: 'Jack John',
    date: '28 Dec 2026',
    title: 'Science Experiments for Beginners',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
];

const Blogpicture = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const totalPages = Math.ceil(allBlogPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allBlogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <section className="Blogpicture">
      <div className="Blogpicture-container">
        
        {/* Blog Cards Grid */}
        <div className="Blogpicture-grid">
          {currentPosts.map((post) => (
            <div key={post.id} className="Blogpicture-card">
              
              {/* Image */}
              <div className="Blogpicture-image-wrapper">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="Blogpicture-image" 
                />
              </div>

              {/* Content Body */}
              <div className="Blogpicture-content">
                <div className="Blogpicture-meta">
                  <span>
                    <strong className="Blogpicture-accent">By Admin:</strong> {post.author}
                  </span>
                  <span>
                    <strong className="Blogpicture-accent">Date:</strong> {post.date}
                  </span>
                </div>

                <h3 className="Blogpicture-title">{post.title}</h3>
                <p className="Blogpicture-excerpt">{post.excerpt}</p>

                {/* Button with Top Slide Effect */}
                <button className="Blogpicture-readmore-btn">
                  <span>Read More</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Pagination Section */}
        <div className="Blogpicture-pagination">
          <button 
            className="Blogpicture-page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous Page"
          >
            <FiChevronLeft />
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              className={`Blogpicture-page-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <button 
            className="Blogpicture-page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
          >
            <FiChevronRight />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Blogpicture;