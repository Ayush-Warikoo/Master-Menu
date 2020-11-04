import React from 'react'
import "./RestaurantPage.css";
import Product from "./Product";
import Background from "./img/mcdonalds-banner.jpg";
import MenuFilter from "./MenuFilter";

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
            ingredients="Ingredients: wheat, mozzarella cheese, tomato sauce, mushroom, green pepper, tomatoes"
          />
          <Product
            id="10000101"
            title="Mediterranean Vegetarian"
            price={19.69}
            stars={3}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/grilled-veg-and-goatcheese.png"
            ingredients="Ingredients: wheat, mozzarella cheese, feta cheese, tomato sauce, zucchini, olives, red onions,  tomatoes"
          />
        </div>

        <div className="restaurant__row">
          <Product
            id="10000102"
            title="Cheese Pizza"
            price={13.89}
            stars={4}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/13988.png"
            ingredients="Ingredients: wheat, mozzarella cheese, feta cheese, parmesan cheese, garlic"
          />
          <Product
            id="10000103"
            title="Pepperoni Pizza"
            price={11.19}
            stars={5}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/Pepperoni.png"
            ingredients="Ingredients: wheat, mozzarella cheese, tomato sauce, pepperoni, beef, pork"
          />
          <Product
            id="10000104"
            title="Tropical Hawaiian"
            price={15.59}
            stars={2}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/12700.png"
            ingredients="Ingredients: wheat, bacon, ham, mozzarella cheese, tomato sauce, pineapple"  
          />
        </div>
    
        <div className="restaurant__row">
          <Product
            id="10000105"
            title="Meat Supreme"
            price={16.29}
            stars={1}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/meat-supreme.png"
            ingredients="Ingredients: wheat, bacon, ham, mozzarella cheese, salt, pepper, tomato sauce, pepperoni, salami, beef, pork, sausage"
          />
          <Product
            id="10000106"
            title="Classic Super"
            price={14.59}
            stars={5}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/12400.png"
            ingredients="Ingredients: wheat, mozzarella cheese, tomato sauce, mushrooms, green pepper, pepperoni, beef, pork"
          />
        </div>

        <div className="restaurant__row">
          <Product
            id="10000107"
            title="Chicken Bruschetta"
            price={17.29}
            stars={2}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/chickenbruschetta.png"
            ingredients="Ingredients: wheat, mozzarella cheese, olive oil, vinegar, parmesan cheese, tomato, tomato sauce, chicken, garlic"
          />
          <Product
            id="10000108"
            title="Caesar Salad"
            price={5.99}
            stars={4}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/Caesar.png"
            ingredients="Ingredients: romaine lettuce, parmesan cheese, croutons, wheat, vinegar, oil"
          />

          <Product
            id="10000109"
            title="Bacon Caesar Salad"
            price={7.29}
            stars={5}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/GCCS.png"
            ingredients="Ingredients: bacon, romaine lettuce, parmesan cheese, croutons, wheat, vinegar, oil"
          />
        </div>
    
        <div className="restaurant__row">
          <Product
            id="10000113"
            title="Canadian Panzerotti"
            price={8.99}
            stars={5}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/PANCN.png"
            ingredients="Ingredients: pepperoni, beef, pork, flour, wheat, mushroom, mozzarella cheese, green pepper, tomato sauce, roma tomato, vegetable oil"
          />

          <Product
            id="10000114"
            title="Veggie Panzerotti"
            price={8.99}
            stars={4}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/PANVG.png"
            ingredients="Ingredients: flour, wheat, mushroom, mozzarella cheese, green pepper, tomato sauce, roma tomato, vegetable oil"
          />
        </div>
        <div className="restaurant__row">
          <Product
            id="10000112"
            title="Single Potato Wedges"
            price={3.99}
            stars={5}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/wedges.png"
            ingredients="Ingredients: potato, garlic, vegetable oil, salt, wheat, milk, parmesan cheese"
          />

          <Product
            id="10000110"
            title="Chicken Wings"
            price={6.29}
            stars={4}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/5W.png"
            ingredients="Ingredients: chicken, butter, garlic, soy sauce, pepper, salt, vegetable oil, vinegar, flour"
          />
          <Product
            id="10000111"
            title="Single Sweet Potato Fries"
            price={4.99}
            stars={3}
            image="https://storage.pizzapizza.ca/phx2/ppl_images/products/en/2x/SPFFS.png"
            ingredients="Ingredients: sweet potatoes, vegetable oil, salt, wheat, milk"
          />
        </div>
      </div>
    </div>
  )
}

export default Pizzapizza
