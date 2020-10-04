import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
    const history = useHistory();
    const [restaurant, setRestaurant] = useState('');

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
        <div className="homepage">
            <form> 
                <h1 className="homepage__text"> Begin your food journey here!</h1> 
                <div className="homepage__form">
                    <input 
                        className="homepage__searchbar" 
                        type="text" 
                        placeholder="Enter a restaurant" 
                        value={restaurant} 
                        onChange={e => setRestaurant(e.target.value)}
                        onKeyDown={e => handleKeyPress(e.key)}
                    />
                    <button className="homepage__button" type="button" onClick={search} > Search </button>
                </div>
            </form>
        </div>
    )
}

export default HomePage
