import React from 'react'
import "./RestaurantPage.css";
import Product from "./Product";
import Background from "./img/mcdonalds-banner.jpg";
import MenuFilter from "./MenuFilter";
import { db } from './firebase';

function Mcdonalds() {
  
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
          {/*db.collection('Restaurant Information').doc('McDonalds').onSnapshot(snapshot => console.log(snapshot.data()["Menu"][0]["id"]))*/}
          <Product
            id="10000000"
            title= "Big Mac"
            price={5.69}
            stars={5}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-big-mac.jpg?$Product_Desktop$"
            ingredients="beef, sesame seeds, wheat, gluten, soy, egg, mustard, milk, lettuce, cheese, pickle, onion, salt, spice, oil, sugar, corn starch, sweet relish, yeast, potato, pea"
            type="None"
          />
          <Product
            id="10000001"
            title="Double Big Mac"
            price={7.19}
            stars={4}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-double-big-mac.jpg?$Product_Desktop$"
            ingredients="beef, sesame seeds, wheat, gluten, soy, egg, mustard, milk, lettuce, cheese, pickle, onion, salt, spice, oil, sugar, corn starch, sweet relish, yeast, potato, pea"
            type="None"
          />
        </div>

        <div className="restaurant__row">
          <Product
            id="10000002"
            title="Strawberry Triple Thick Milkshake"
            price={3.44}
            stars={4}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-strawberry-milkshake.jpg?$Product_Desktop$"
            ingredients="milk, cream, sugar, artificial vanilla flavour, cocoa, syrup"
            type="Vegetarian"
          />
          <Product
            id="10000003"
            title="Breakfast Burrito"
            price={2.39}
            stars={1}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-breakfast-burrito.jpg?$Product_Desktop$"
            ingredients="pork, egg, milk, soy, wheat, gluten, oil, salt, spices, tomatoes, onions, flour, cheese"
            type="None"
          />
          <Product
            id="10000004"
            title="Chicken McMuffin"
            price={2.49}
            stars={3}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-chicken-mcmuffin.jpg?$Product_Desktop$"
            ingredients="chicken, wheat, barley, egg, mustard, milk, flour, oil, butter, salt, spice, garlic, mayonnaise"  
            type="Pollopescetarian"
          />
        </div>
    
        <div className="restaurant__row">
          <Product
            id="10000005"
            title="McChicken"
            price={5.39}
            stars={3}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-mcchicken.jpg?$Product_Desktop$"
            ingredients="chicken, sesame seeds, milk, egg, wheat, gluten, vegetable oil, corn starch, salt, spices, yeast, sugar, pea, potato, butter, lettuce, mayonnaise"
            type="Pollopescetarian"
          />
          <Product
            id="10000006"
            title="4 Chicken McNuggets with Apples Happy Meal"
            price={4.79}
            stars={5}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-chicken-mcnuggets-happy-meal.jpg?$Product_Desktop$"
            ingredients="chicken, milk, vegetable oil, wheat, flour, corn starch, salt, baking powder, yeast, apple, strawberry, sugar, cream, lemon juice"
            type="Pollopescetarian"
          />
        </div>

        <div className="restaurant__row">
          <Product
            id="10000007"
            title="Poutine"
            price={4.49}
            stars={3}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-poutine.jpg?$Product_Desktop$"
            ingredients="chicken, milk, potatoes, vegetable oil, corn starch, sugar, salt, tomato, onion, garlic"
            type="Pollopescetarian"
          />
          <Product
            id="10000008"
            title="World Famous Fries"
            price={2.98}
            stars={5}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-fries-medium.jpg?$Product_Desktop$"
            ingredients="potatoes, vegetable oil, citric acid, salt"
            type="Vegan"
          />

          <Product
            id="10000009"
            title="Chocolate Triple Thick Milkshake"
            price={3.44}
            stars={4}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-chocolate-milkshake.jpg?$Product_Desktop$"
            ingredients="milk, cream, sugar, artificial vanilla flavour, cocoa, syrup"
            type="Vegetarian"
          />
        </div>
    
        <div className="restaurant__row">
          <Product
            id="10000010"
            title="Quarter Pounder BLT"
            price={6.09}
            stars={4}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-quarter-pounder-blt.jpg?$Product_Desktop$"
            ingredients="beef, bacon, sesame seeds, wheat, gluten, soy, milk, egg, mustard, tomato, cheese, vegetable oil, salt, sugar, yeast, mayonnaise"
            type="None"
          />
          <Product
            id="10000011"
            title="Banana Chocolate Chunk Muffin"
            price={1.49}
            stars={2}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-banana-chocolate-muffin.jpg?$Product_Desktop$"
            ingredients="milk, egg, soy, oat, barley, wheat, gluten, sugar, flour, banana, sugar, chocolate, vegetable oil, syrup, honey, apple, orange, baking soda, spices"
            type="Vegetarian"
          />
        </div>
      </div>
    </div>
  )
}

export default Mcdonalds
