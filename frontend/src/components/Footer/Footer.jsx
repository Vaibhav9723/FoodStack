import { assets } from '../../assets/frontend_assets/assets'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo_1} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quidem beatae laudantium fuga ipsum est dolores molestias dolorem, odio non magnam officia, at obcaecati voluptatem dicta voluptatibus voluptas unde. Enim omnis nobis, beatae ad pariatur tenetur autem, facilis quae itaque adipisci vel.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Private Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 9856321478</li>
                <li>contact@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <div className="footer-copyright">
        <p>
        Copyright  2025 Tomato.com - All Right Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
