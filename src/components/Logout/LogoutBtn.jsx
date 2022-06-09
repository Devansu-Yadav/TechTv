import "./Logout.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useLogoutHandler } from "common/helpers";

const LogoutBtn = ({ display }) => {
    const { logoutHandler } = useLogoutHandler();

    // Initializing User Data and Auth token when logging out
    const logoutBtnClickHandler = () => {
        logoutHandler();
    }

    return (
        display && <Link className={`nav-icon-item logout-btn`} onClick={logoutBtnClickHandler} to="/login">
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="nav-icon-margin" />
            <div>Logout</div>
        </Link>
    );
}

export { LogoutBtn };