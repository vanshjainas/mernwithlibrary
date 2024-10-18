import Navbar from '../Navbar/Navbar';
import React, { useState } from 'react';
import './Contact.css'; // Importing CSS for styling
function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Your message has been sent!');
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div>
        <Navbar />
        <div className="container">
           
        <h1>Contact Us</h1>
        <form id="contactForm" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Send Message</button>
        </form>
    </div>
    </div>
    );
};

export default ContactUs;
