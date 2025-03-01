import React from 'react'
import '../resources/Footer.css'

const Footer = () => {
  return (
    <div className="footersection">
    <div className="footersection-main">
      <div className="footer" id="footer">
        <div className="footer-content-left">
          
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            dolorum dicta officiis, quos ea similique, dolore tempore autem
            veniam est unde, corporis recusandae ducimus dolor? Dignissimos
            officia voluptatibus nihil rem!
          </p>
          <div className="footer-social-icons">
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </div>
        <div className="footer-content-right">
          <div className="footer-content-right-company">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div className="footer-content-right-contact">
            <h2>GET IN TOUCH</h2>
            <li>+1-212-456-7890</li>
            <li>contact@foodies.com</li>
          </div>
        </div>
      </div>
      <hr />
      <div className="footer-copyright">
        <p className="footer-copyright-p">
          copyright 2024 Snapkart.com - All Right Reserved
        </p>
      </div>
    </div>
    </div>
  )
}

export default Footer
