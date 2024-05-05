import React from "react";
import './TodoContent.css'


const Search = ({search, setSearch}) => {
    return(
        <form className="Scontainer" onSubmit={(e)=>e.preventDefault()}> 
            <input
                type="text"
                className="SearchBox"
                placeholder="Search"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
            />
        </form>
    )
}

export default Search