import React from 'react';

import "./Home.css"; // Add styles for the homepage
// import "./spinningimages.css"
import Navbar from '../Navbar/Navbar';

const HomePage = () => {
    return (
      
        <div className="homepage">
              <Navbar />
              {/* <div>
              <div id="drag-container" ref={dragContainerRef}>
      <div id="spin-container" ref={spinContainerRef}>
        <img src="imgs/1.jpg" alt="" />
        <img src="imgs/2.jpg" alt="" />
        <img src="imgs/3.jpg" alt="" />
        <img src="imgs/4.jpg" alt="" />
        <img src="imgs/5.jpg" alt="" />
        <img src="imgs/6.jpg" alt="" />
        <img src="imgs/7.jpg" alt="" />
        <p><mark>VCE LIBRARY</mark></p>
      </div>
      <div id="ground"></div>
      <div id="music-container"></div>
    </div>
              </div> */}

            {/* Header Section */}
            
            <header className="homepage-header">
                <h1>Welcome to the Digital Library</h1>
                <p>Your portal to thousands of books, journals, and more!</p>
            </header>

            {/* Search Bar Section */}
            <section className="search-section">
                <h2>Find a Book</h2>
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search by title, author, or genre..."
                />
                <button className="search-button">Search</button>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <h2>Categories</h2>
                <div className="categories">
                    <div className="category-item">Fiction</div>
                    <div className="category-item">Non-Fiction</div>
                    <div className="category-item">Science</div>
                    <div className="category-item">History</div>
                    <div className="category-item">Biographies</div>
                    <div className="category-item">Fantasy</div>
                    <div className="category-item">Mystery</div>
                </div>
            </section>

            {/* New Arrivals Section */}
            <section className="new-arrivals-section">
                <h2>New Arrivals</h2>
                <div className="book-list">
                    <div className="book-item">
                        <img src="/images/book1.jpg" alt="Book 1" />
                        <p>Title: Book One</p>
                        <p>Author: Author A</p>
                    </div>
                    <div className="book-item">
                        <img src="/images/book2.jpg" alt="Book 2" />
                        <p>Title: Book Two</p>
                        <p>Author: Author B</p>
                    </div>
                    <div className="book-item">
                        <img src="/images/book3.jpg" alt="Book 3" />
                        <p>Title: Book Three</p>
                        <p>Author: Author C</p>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="homepage-footer">
                <p>© 2024 Digital Library | All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default HomePage;
