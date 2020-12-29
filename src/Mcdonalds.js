import React, { useState, useEffect } from 'react';
import "./RestaurantPage.css";
import Product from "./Product";
import Background from "./img/McDonaldsBanner.png";
import MenuFilter from "./MenuFilter";
import { db } from './firebase';

function Mcdonalds() {
  const [row1, setRow1] = useState([]);
  const [row2, setRow2] = useState([]);
  const [row3, setRow3] = useState([]);
  const [row4, setRow4] = useState([]);

  useEffect(() => {
    db.collection('Restaurant Information').doc('McDonalds').onSnapshot(snapshot => setRow1(snapshot.data()["Menu"].slice(0,3)));
    db.collection('Restaurant Information').doc('McDonalds').onSnapshot(snapshot => setRow2(snapshot.data()["Menu"].slice(3,6)));
    db.collection('Restaurant Information').doc('McDonalds').onSnapshot(snapshot => setRow3(snapshot.data()["Menu"].slice(6,9)));
    db.collection('Restaurant Information').doc('McDonalds').onSnapshot(snapshot => setRow4(snapshot.data()["Menu"].slice(9,12)));
  }, [])

  return (  

    <div className="restaurant">
      <div className="restaurant__container">
        {/* banner */}
        <img 
          className="restaurant__banner"
          src={Background}
          alt="" 
        />

        <MenuFilter />
        {/* Product rows */}
        <div className="restaurant__row">
          {row1.map(prod => (<Product product = {prod} />))}
        </div>

        <div className="restaurant__row">
          {row2.map(prod => (<Product product = {prod} />))}
        </div>

        <div className="restaurant__row">
          {row3.map(prod => (<Product product = {prod} />))}
        </div>

        <div className="restaurant__row">
          {row4.map(prod => (<Product product = {prod} />))}
        </div>

      </div>
    </div>
  )
}

export default Mcdonalds
