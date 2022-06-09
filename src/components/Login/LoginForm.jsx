import "./LoginForm.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useLoginHandler } from "common/helpers";
import { useFormError } from "common/context";
import { FormError, SideBar } from "../index";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { loginHandler, loginAsGuestHandler, loginFormData, setLoginFormData } = useLoginHandler();
    const { formDataErr, setFormDataErr, isFormError, setIsFormError} = useFormError();

    const handlePasswordDisplay = (e) => {
        e.preventDefault();
        showPassword ? setShowPassword(false): setShowPassword(true);
    }

    const formInputOnChangeHandler = (event) => {
        setLoginFormData({...loginFormData, [event.target.name]: event.target.value });
    }

    // Resetting Form errors on loading Login Form
    useEffect(() => {
        setIsFormError(false);
        setFormDataErr("");
    }, []);

    return (
    <main className="main-container grid-2-column dark-container-bg">
        <SideBar />
        
        <div className="form-container centered-flex-col-container">
            <form className="log-in-form centered-flex-col-container" onSubmit={(event) => loginHandler(event, loginFormData)}>
                <h2 className="form-heading heading-2 space-S">Log In</h2>
                <div className="login-form-fields centered-flex-col-container">
                    <label className="input-label" htmlFor="username">Username*</label>
                    <input type="email" id="username" className="input-primary login-input space-S" name="email" value={loginFormData.email} placeholder="Enter your email"
                    onChange={(event) => formInputOnChangeHandler(event)} required/>
                </div>
                <div className="login-form-fields centered-flex-col-container">
                    <label className="input-label" htmlFor="password">Password*</label>
                    <div className="password-input centered-flex-row-container">
                        <input type={showPassword ? "text": "password" } id="password" className="input-primary login-input space-S" name="password" value={loginFormData.password} placeholder="Enter your password"
                        onChange={(event) => formInputOnChangeHandler(event)} required/>
                        
                        <button className="btn-icon password-toggle-btn" onClick={(e) => handlePasswordDisplay(e)}>
                            {showPassword && <FontAwesomeIcon icon={faEye} /> }
                            {!showPassword && <FontAwesomeIcon icon={faEyeSlash} /> }
                        </button>
                    </div>
                </div>
                { isFormError && formDataErr && <FormError />}
                <input type="submit" value="Log in" className="btn btn-primary login-btn rounded-med space-M" />
                <input type="submit" value="Login As Guest" className="btn btn-primary login-btn rounded-med space-M" onClick={(event) => loginAsGuestHandler(event)}/>
                <div className="login-form-text flex-col-container">
                    <p className="signup-text">Don't have an account? <Link to="/signup">Create One</Link></p>

                    <p className="password-reset-text">Forget Password? <Link to="/passwordReset">Reset here</Link></p>
                </div>
            </form>
        </div>
    </main>
    );
}

export { LoginForm };