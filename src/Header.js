import React, { useState } from 'react'
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import logo from "./img/logo-white.png";
import { restaurants } from "./constants";


function Header() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();
    const [restaurant, setRestaurant] = useState('');

    //logout 
    const handleAuthentication = () => {
        if (user) 
        {
            auth.signOut();
        }
    }

    const search = () => {
        history.push(`/${restaurant}`);
    }

    const handleKeyPress = key => {
        if(key === "Enter")
        {
            search();
        }
    }

    return (
        <div className='header'>
            <Link to="/">
                {/*logo*/}
                <img className="header__logo" src={logo} alt=""/>
            </Link>
            
            {/*search bar*/}
            <div className="header__search">
                <input 
                    className="header__searchInput" 
                    placeholder="Enter a restaurant"
                    list="header__restaurant"
                    type="text" 
                    value={restaurant} 
                    onChange={e => setRestaurant(e.target.value)} 
                    onKeyDown={e => handleKeyPress(e.key)} 
                />
                <datalist id="header__restaurant">
                {restaurants.map(restaurant => 
                    <option> {restaurant} </option> 
                )}                         
                </datalist>
                <Link to={`/${restaurant}`}>
                    <SearchIcon className="header__searchIcon" />
                </Link>
            </div>

            {/*header options*/}
            <div className="header__nav">
                <Link to={!user && "/login"}>
                    <div onClick={handleAuthentication} className='header__option'>
                        
                            <span className='header__optionLineOne'> Hello {!user ? 'Guest' : user.email} </span>
                            <span className='header__optionLineTwo'> {!user ? "Sign In" : "Sign Out" }</span>
                    </div>
                </Link>

                <Link to="/orders"> 
                    <div className='header__option'>
                        <span className='header__optionLineOne'> Order </span>
                        <span className='header__optionLineTwo'> History </span>
                    </div>
                </Link>

                <Link to="/checkout"> 
                    <div className='header__option'>
                        <div className="header__optionBasket">
                            <ShoppingBasketIcon />
                            <span className="header__optionLineTwo header__basketCount"> {basket.length}  </span>
                        </div>

                    </div>
                </Link>
            </div>
        </div>

    )
}

export default Header
