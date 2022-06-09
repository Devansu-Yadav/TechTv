import "./searchbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
    return (
        <form className="searchbar flex-row-container">
            <input className="input-search input-primary" type="search" placeholder="Search for videos.." />

            <button className="search-btn" type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon space-M" />
            </button>
        </form>
    );
}

export { SearchBar };