import React from 'react'
import './Footer.css';
import footerbg from "../../assets/footer-background.jpg"
export default function Footer() {
  return (
    <>
    <div className='footer'>
      {/* <img src={footerbg} alt="footerbg" /> */}
      <div className='footer-content'>
        <div className='social-media'>
          <h3>Follow Us</h3>
          <ul>
            <li><i className="bi bi-facebook" style={{color: '#112d7a'}}></i></li>
            <li><i className="bi bi-instagram" style={{color: '#C13584'}}></i></li>
            <li><i className="bi bi-twitter-x" style={{color: '#007bff'}}></i></li>
            <li><i className="bi bi-linkedin" style={{color: '#0077B5'}}></i></li>
          </ul>
        </div>
        <div className='quick-links'>
          <h3>Quick Links</h3>
          <ul>
            <li><a href='#'>Top Destination</a></li>
            <li><a href='#'>Top Attraction</a></li>
            <li><a href='#'>Where To</a></li>
            <li><a href='#'>Plan Your Trip</a></li>
          </ul>
        </div>
        <div className='newsletter'>
          <h3>Get exclusive inspiration for your next stay subscribe to our newsletter.</h3>
          
        </div>
      </div>
      <div className='footer-bottom'>
        <p>© 2025 Trip Planner. All rights reserved.</p>
      </div>
    </div>
    </>
  )
}
