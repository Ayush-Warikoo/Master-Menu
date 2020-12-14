import React from 'react'
import "./RestaurantPage.css";
import Product from "./Product";
import Background from "./img/pizzapizza-banner.jpg";
import MenuFilter from "./MenuFilter";
import { db } from './firebase';

function Pizzapizza() {
  
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
          <Product
            id="10000100"
            title= "Garden Veggie"
            price={14.59}
            stars={4}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/12500.png"
            ingredients="wheat, mozzarella cheese, tomato sauce, mushroom, green pepper, tomatoes"
            type="Vegetarian"
          />
          <Product
            id="10000101"
            title="Mediterranean Vegetarian"
            price={19.69}
            stars={3}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/grilled-veg-and-goatcheese.png"
            ingredients="wheat, mozzarella cheese, feta cheese, tomato sauce, zucchini, olives, red onions, tomatoes"
            type="Vegetarian"
          />
        </div>

        <div className="restaurant__row">
          <Product
            id="10000102"
            title="Cheese Pizza"
            price={13.89}
            stars={4}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/13988.png"
            ingredients="wheat, mozzarella cheese, feta cheese, parmesan cheese, garlic"
            type="Vegetarian"
          />
          <Product
            id="10000103"
            title="Pepperoni Pizza"
            price={11.19}
            stars={5}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/Pepperoni.png"
            ingredients="wheat, mozzarella cheese, tomato sauce, pepperoni, beef, pork"
            type="None"
          />
          <Product
            id="10000104"
            title="Tropical Hawaiian"
            price={15.59}
            stars={2}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/12700.png"
            ingredients="wheat, bacon, ham, mozzarella cheese, tomato sauce, pineapple" 
            type="None" 
          />
        </div>
    
        <div className="restaurant__row">
          <Product
            id="10000105"
            title="Meat Supreme"
            price={16.29}
            stars={1}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/meat-supreme.png"
            ingredients="wheat, bacon, ham, mozzarella cheese, salt, pepper, tomato sauce, pepperoni, salami, beef, pork, sausage"
            type="None"
          />
          <Product
            id="10000106"
            title="Classic Super"
            price={14.59}
            stars={5}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/12400.png"
            ingredients="wheat, mozzarella cheese, tomato sauce, mushrooms, green pepper, pepperoni, beef, pork"
            type="None"
          />
        </div>

        <div className="restaurant__row">
          <Product
            id="10000107"
            title="Chicken Bruschetta"
            price={17.29}
            stars={2}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/chickenbruschetta.png"
            ingredients="wheat, mozzarella cheese, olive oil, vinegar, parmesan cheese, tomato, tomato sauce, chicken, garlic"
            type="Pollopescetarian"
          />
          <Product
            id="10000108"
            title="Caesar Salad"
            price={5.99}
            stars={4}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/Caesar.png"
            ingredients="romaine lettuce, croutons, wheat, vinegar, oil"
            type="Vegan"
          />

          <Product
            id="10000109"
            title="Bacon Caesar Salad"
            price={7.29}
            stars={5}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/GCCS.png"
            ingredients="bacon, romaine lettuce, parmesan cheese, croutons, wheat, vinegar, oil"
            type="None"
          />
        </div>
    
        <div className="restaurant__row">
          <Product
            id="10000110"
            title="Canadian Panzerotti"
            price={8.99}
            stars={5}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/PANCN.png"
            ingredients="pepperoni, beef, pork, flour, wheat, mushroom, mozzarella cheese, green pepper, tomato sauce, roma tomato, vegetable oil"
            type="None"
          />

          <Product
            id="10000111"
            title="Veggie Panzerotti"
            price={8.99}
            stars={4}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/PANVG.png"
            ingredients="flour, wheat, mushroom, mozzarella cheese, green pepper, tomato sauce, roma tomato, vegetable oil"
            type="Vegetarian"
          />
        </div>
        <div className="restaurant__row">
          <Product
            id="10000112"
            title="Single Potato Wedges"
            price={3.99}
            stars={5}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/wedges.png"
            ingredients="potato, garlic, vegetable oil, salt, wheat, milk, parmesan cheese"
            type="Vegetarian"
          />

          <Product
            id="10000113"
            title="Chicken Wings"
            price={6.29}
            stars={4}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/5W.png"
            ingredients="chicken, butter, garlic, soy sauce, pepper, salt, vegetable oil, vinegar, flour"
            type="Pollopescetarian"
          />
          <Product
            id="10000114"
            title="Single Sweet Potato Fries"
            price={4.99}
            stars={3}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/SPFFS.png"
            ingredients="sweet potatoes, vegetable oil, salt, wheat, milk"
            type="Vegetarian"
          />
        </div>
      </div>
    </div>
  )
}

export default Pizzapizza