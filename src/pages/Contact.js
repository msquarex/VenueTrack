import React, { useState } from 'react';
import './Contact.css';
import backgroundImage from '../assets/call.jpg';

const Contact = () => {
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    setFormStatus('Sending...');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      const result = await response.json();
      if (response.status === 200) {
        setFormStatus(result.message);
        e.target.reset();
      } else {
        setFormStatus(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setFormStatus('Something went wrong!');
    }

    setTimeout(() => setFormStatus(''), 3000);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Get in touch!</p>
        
        <div className="contact-content">
          <div className="contact-form-container" >
            <form className="contact-form" onSubmit={handleSubmit}>
              <input type="hidden" name="access_key" value="0fec707e-b81d-4158-9fff-7f81f91b06b5" />
              <input type="hidden" name="subject" value="New Contact Form Submission" />
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <input type="text" name="phone" placeholder="Your Phone" required />
              <textarea name="message" placeholder="Message" rows="5" required></textarea>
              <button type="submit">Send Message</button>
            </form>
            {formStatus && <p className="form-status">{formStatus}</p>}
          </div>

          <div className="map-container">
            <iframe
              className="map-embed"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.0661505711896!2d80.15293081482233!3d12.842212990944416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUwJzMxLjkiTiA4MMKwMDknMTguNCJF!5e0!3m2!1sen!2sus!4v1631234567890!5m2!1sen!2sus&zoom=15&maptype=roadmap&markers=color:red%7Clabel:VIT%7C12.8422129,80.1551188"
              allowFullScreen=""
              loading="lazy"
              title="Vellore Institute of Technology, Chennai Location"
            ></iframe>
          </div>
        </div>

        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
        </div>
        
      </section>
    </div>
  );
};

export default Contact;