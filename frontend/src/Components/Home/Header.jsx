import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import Filter from "./Filter";

const Header = () => {
  return (
    <>
      <nav className='header row sticky-top '>
        <img src='/assets/logo.png' alt='logo' className='logo' />
        <div className='search_filter'>
          <Search />
          <Filter />
        </div>
        <Link to='/login'>
          <span class='material-symbols-outlined web_logo'>account_circle</span>
        </Link>
      </nav>
    </>
  );
};
export default Header;
