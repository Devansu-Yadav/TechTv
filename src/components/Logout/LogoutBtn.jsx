import "./Logout.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const LogoutBtn = ({ display }) => {
    // Initializing User Data and Auth token when logging out
    const logoutBtnClickHandler = () => {
        console.log("Clicked logout btn");
    }

    return (
        display && <Link className={`nav-icon-item logout-btn`} onClick={logoutBtnClickHandler} to="/login">
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="nav-icon-margin" />
            <div>Logout</div>
        </Link>
    );
}

export { LogoutBtn };