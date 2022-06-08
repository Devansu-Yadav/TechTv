import "./NavBar.css";
import { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightToBracket,
    faCircleUser,
    faUser,
    faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { SearchBar, LogoutBtn } from "../index";

const NavBar = () => {
    const userMenuRef = useRef(null);

    return (
        <nav className="navbar flex-row-container shadow-md">
            <Link id="nav-logo" className="flex-row-container" to="/">
                <div className="logo-container">
                    <img className="logo" src="/assets/images/logo.png" alt="techtv logo" />
                </div>
                <p className="logo-txt">TechTv</p>
            </Link>

            <SearchBar />
                
            <div className="nav-icons centered-flex-row-container">
                <div className="nav-submenu-item centered-flex-col-container" 
                onClick={() => userMenuRef.current.classList.toggle("show-menu")} >
                    <div className="user-profile-avatar centered-flex-col-container">
                        <FontAwesomeIcon icon={faCircleUser} className="space-XS profile-icon" />
                    </div>
                    <p>User</p>

                    <div className="nav-dropdown-menu" ref={userMenuRef}>
                        <Link className="nav-icon-item flex-row-container" to="/account">
                            <FontAwesomeIcon icon={faUser} className="nav-icon-margin"/>
                            <div>Profile</div>
                        </Link>

                        <LogoutBtn display={false} />
                        
                        <Link className="nav-icon-item flex-row-container" to="/signup">
                            <FontAwesomeIcon icon={faUserPlus} className="nav-icon-margin"/>
                            <div>Sign Up</div>
                        </Link>

                        <Link className="nav-icon-item flex-row-container" to="/login">
                            <FontAwesomeIcon icon={faArrowRightToBracket} className="nav-icon-margin"/>
                            <div>Login</div>
                        </Link>
                    </div>                       
                </div>
            </div>
        </nav>
    );
}

export { NavBar };
