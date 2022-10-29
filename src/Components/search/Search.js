import React, { useState } from "react";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import { useNavigate, useLocation } from "react-router-dom";

function Search() {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  const query = useLocation();

  const searchSubmitHandler = () => {
    if (query.search) {
      if (keyword.trim()) {   // remove space
        navigate(`/shop/${keyword}?category=${query.search.split("=")[1]}`);
      } else {
        navigate(`/shop?category=${query.search.split("=")[1]}`);
      }
    } else {
      if (keyword.trim()) {   // remove space
        navigate(`/shop/${keyword}`);
      } else {
        navigate("/shop");
      }
    }
  };
  return (
    <div className="search">
      <input
        type="text"
        className="searchInput"
        placeholder="Search Here..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <SearchIcon className="searchIcon" onClick={searchSubmitHandler} />
    </div>
  );
}

export default Search;
