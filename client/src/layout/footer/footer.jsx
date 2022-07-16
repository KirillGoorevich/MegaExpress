import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebook , faPinterest , faVk ,faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className="border-top pt-3 text-center bg-light" style={{display: "flex",justifyContent: "space-around"}}>
      <div>
      <h5  style={{color: '#e62e04', textDecoration: 'none',}}>
        MegaExpress
      </h5>
      </div>
      <p >
      Created by Kirill Goorevich &copy; {new Date().getFullYear()}
    </p>
    <p>
      Contact: 555-Call-Me
    </p>
    <p>
      Email: Fake@gmail.com
    </p>
    <div style={{fontSize: "30px",position: "relative",bottom: "0.5vh"}}>
      {/* Source: https://stackoverflow.com/questions/52687229/font-awesome-5-use-social-brand-icons-in-react
                  https://stackoverflow.com/questions/50709625/link-with-target-blank-and-rel-noopener-noreferrer-still-vulnerable
      */}
      <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} style={{marginRight: "1vh",color: "#415a99"}} /></a>
      <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faPinterest} style={{marginRight: "1vh",color: "#cb222a"}} /></a>
      <a href="https://vk.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faVk} style={{marginRight: "1vh",color: "#5b7fa6"}} /></a>
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} style={{marginRight: "1vh",color: "#00caff"}} /></a>
    </div>
    </div>
  );
};

export default Footer;
