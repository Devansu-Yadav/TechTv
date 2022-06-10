import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NavBar, Footer, SideBar } from "components";
import "styles/NotFound404Page.css";

const NotFound404Page = () => {
    // Updating title on rendering 404 Page comp
    useEffect(() => {
        document.title = "TechTv - 404 Not Found";
    }, []);

    return (
        <div>
            <NavBar />
            <div className={`page-not-found-container centered-flex-col-container dark-container-bg`}>
                <h3 className="page-not-found-heading">404 Page Not Found :(</h3>
                <img className="page-not-found-img" src="https://res.cloudinary.com/bluekart/image/upload/v1654776386/page-not-found_uoqq1i.svg" alt="404 Page Not Found" />
                <Link to="/"><button className="btn btn-outline-primary home-btn rounded-med">{"<- Back To Home Page"}</button></Link>
            </div>
            <Footer />
        </div>
    );
}

export { NotFound404Page };
