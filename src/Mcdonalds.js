import React, { useState, useEffect } from 'react';
import "./RestaurantPage.css";
import Product from "./Product";
import Background from "./img/mcdonalds-banner.jpg";
import MenuFilter from "./MenuFilter";
import { db } from './firebase';

function Mcdonalds() {
  const [row1, setRow1] = useState([]);
  const [row2, setRow2] = useState([]);
  const [row3, setRow3] = useState([]);
  const [row4, setRow4] = useState([]);
  const [row5, setRow5] = useState([]);

  useEffect(() => {
    db.collection('Restaurant Information').doc('McDonalds').onSnapshot(snapshot => setRow1(snapshot.data()["Menu"].slice(0,2)));
    db.collection('Restaurant Information').doc('McDonalds').onSnapshot(snapshot => setRow2(snapshot.data()["Menu"].slice(2,5)));
    db.collection('Restaurant Information').doc('McDonalds').onSnapshot(snapshot => setRow3(snapshot.data()["Menu"].slice(5,7)));
    db.collection('Restaurant Information').doc('McDonalds').onSnapshot(snapshot => setRow4(snapshot.data()["Menu"].slice(7,10)));
    db.collection('Restaurant Information').doc('McDonalds').onSnapshot(snapshot => setRow5(snapshot.data()["Menu"].slice(10,12)));
  }, [])

  /*
      {db.collection('Restaurant Information').doc('McDonalds').onSnapshot(snapshot => setProducts(snapshot.data()["Menu"]))}
    {products.map(prod => (
      <Product
        id= {prod.id} //"10000000"
        title= {prod.title}
        price= {prod.price}
        stars= {prod.stars}
        image= {prod.image}
        ingredients= {prod.ingredients}
        type= {prod.type}
      />
    ))}
  */

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
          {row1.map(prod => (
            <Product
              id= {prod.id} 
              title= {prod.title}
              price= {prod.price}
              stars= {prod.stars}
              image= {prod.image}
              ingredients= {prod.ingredients}
              type= {prod.type}
            />
          ))}
        </div>

        <div className="restaurant__row">
          {row2.map(prod => (
            <Product
              id= {prod.id} 
              title= {prod.title}
              price= {prod.price}
              stars= {prod.stars}
              image= {prod.image}
              ingredients= {prod.ingredients}
              type= {prod.type}
            />
          ))}
        </div>
    
        <div className="restaurant__row">
          {row3.map(prod => (
            <Product
              id= {prod.id} 
              title= {prod.title}
              price= {prod.price}
              stars= {prod.stars}
              image= {prod.image}
              ingredients= {prod.ingredients}
              type= {prod.type}
            />
          ))}
        </div>

        <div className="restaurant__row">
          {row4.map(prod => (
            <Product
              id= {prod.id} 
              title= {prod.title}
              price= {prod.price}
              stars= {prod.stars}
              image= {prod.image}
              ingredients= {prod.ingredients}
              type= {prod.type}
            />
          ))}
        </div>

        <div className="restaurant__row">
          {row5.map(prod => (
            <Product
              id= {prod.id} 
              title= {prod.title}
              price= {prod.price}
              stars= {prod.stars}
              image= {prod.image}
              ingredients= {prod.ingredients}
              type= {prod.type}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Mcdonalds
