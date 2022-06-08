import React, {useState} from 'react'
import "./Search.css"
import SearchIcon from "@material-ui/icons/Search";

function Search() {
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = () => {
        if (keyword.trim()) { // remove space
          window.location.replace(`/shop/${keyword}`);
          // history.push(`/shop/${keyword}`);
        } else {
          window.location.replace("/shop");
        }
      }
  return (
    <div>
      <input
            type="text"
            className="searchInput"
            placeholder="Search Here..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <SearchIcon className="searchIcon" onClick={searchSubmitHandler} />
    </div>
  )
}

export default Search
