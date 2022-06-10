import React, { useState } from "react";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import { useNavigate } from "react-router-dom";

function Search() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = () => {
    if (keyword.trim()) {   // remove space
      //   window.location.replace(`/shop/${keyword}`);
      navigate(`/shop/${keyword}`);
    } else {
      //   window.location.replace("/shop");
      navigate("/shop");
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
