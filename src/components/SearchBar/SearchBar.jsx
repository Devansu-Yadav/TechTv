import "./searchbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault();
        if(searchText.trim().length > 0) {
            navigate({
                pathname: "/",
                search: `query=${searchText.trim()}`
            });
            setSearchText("");
        }
    };

    return (
        <form className="searchbar flex-row-container" onSubmit={ searchHandler }>
            <input className="input-search input-primary" type="search" value={searchText}
            onChange={(event) => setSearchText(event.target.value)} placeholder="Search for videos.." />

            <button className="search-btn" type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon space-M" />
            </button>
        </form>
    );
}

export { SearchBar };