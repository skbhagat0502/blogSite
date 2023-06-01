import { AiOutlineTwitter, AiFillLinkedin } from "react-icons/ai";
import { RxInstagramLogo } from "react-icons/rx";
import { FaPinterestP } from "react-icons/fa";
import { BsPhone, BsGlobe, BsFacebook } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import classes from "../css/Footer.module.css";
import Contact from "./Contact";
function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.mainFooter}>
        <div className={classes.about}>
          <h3>SiteName</h3>
          <p>
            Cras fermentum odio eu feugiat. Justo eget magna fermentum iaculis
            eu non diam phasellus. Scelerisque felis imperdiet proin fermentum
            leo. Amet volutpat consequat mauris nunc congue.
          </p>
          <span>
            <AiOutlineTwitter className={classes.icons} />
            <BsFacebook className={classes.icons} />
            <RxInstagramLogo className={classes.icons} />
            <FaPinterestP className={classes.icons} />
            <AiFillLinkedin className={classes.icons} />
          </span>
        </div>
        <div className={classes.contactInfo}>
          <p>
            <BsGlobe className={classes.altIcon} />
            www.sitename.com
          </p>
          <p>
            <TfiEmail className={classes.altIcon} />
            info@example.com
          </p>
          <p>
            <BsPhone className={classes.altIcon} />
            +1 5589 55488 55s
          </p>
        </div>
        <Contact />
      </div>
      <div className={classes.impLinks}>
        <p>Copyright SiteName. All rights reserved.</p>
        <p>Developed by Sandeep</p>
      </div>
    </footer>
  );
}
export default Footer;
