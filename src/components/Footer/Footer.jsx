import "./footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGithub,
    faTwitter,
    faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
    <footer className="footer-container centered-flex-col-container">
        <p className="footer-header">Made with 
            <span> &lt;/&gt; </span>
            by Devansu Yadav
        </p>

        <ul className="social-icons centered-flex-row-container space-S">
            <li className="footer-social-item">
                <Link to="https://github.com/Devansu-Yadav" target="_blank">
                    <FontAwesomeIcon icon={faGithub} className="footer-icon" />
                </Link>
            </li>
            <li className="footer-social-item">
                <Link to="https://twitter.com/DevanshYtweets" target="_blank">
                    <FontAwesomeIcon icon={faTwitter} className="footer-icon" />
                </Link>
            </li>
            <li className="footer-social-item">
                <Link to="https://www.linkedin.com/in/devansu-yadav/" target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} className="footer-icon" />
                </Link>
            </li>
        </ul>
        <p className="copyright">
            © 2022 | TechTv
        </p>
    </footer>
    );
}

export { Footer };