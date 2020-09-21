import React from 'react'
import "./Mcdonalds.css";
import Product from "./Product";
import Background from "./img/mcdonalds-banner.jpg";

function Mcdonalds() {
    return (
        <div className="mcdonalds">

            <div className="mcdonalds__container">
                {/* banner */}
                <img 
                  className="mcdonalds__banner"
                  src={Background}
                  alt="" 
                />

                {/* Product rows */}
                <div className="mcdonalds__row">
                <Product
                  id="12321341"
                  title="Big Mac"
                  price={5.69}
                  rating={5}
                  image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-big-mac.jpg?$Product_Desktop$"
                  ingredients="Ingredients: Beef, sesame seeds, wheat, gluten, soy, egg, mustard, milk, lettuce, cheese, pickle, onion, salt, spice, oil, sugar, corn starch, sweet relish, yeast, potato, pea"
                />
                <Product
                  id="49538094"
                  title="Double Big Mac"
                  price={7.19}
                  rating={4}
                  image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-double-big-mac.jpg?$Product_Desktop$"
                  ingredients="Ingredients: Beef, sesame seeds, wheat, gluten, soy, egg, mustard, milk, lettuce, cheese, pickle, onion, salt, spice, oil, sugar, corn starch, sweet relish, yeast, potato, pea"
                />
              </div>
      
              <div className="mcdonalds__row">
                <Product
                  id="4903851"
                  title="Strawberry Triple Thick Milkshake"
                  price={3.44}
                  rating={4}
                  image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-strawberry-milkshake.jpg?$Product_Desktop$"
                  ingredients="Ingredients: Milk, cream, sugar, artificial vanilla flavour, cocoa, syrup"
                />
                <Product
                  id="23445930"
                  title="Breakfast Burrito"
                  price={2.39}
                  rating={1}
                  image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-breakfast-burrito.jpg?$Product_Desktop$"
                  ingredients="Ingredients: Pork, egg, milk, soy, wheat, gluten, oil, salt, spices, tomatoes, onions, flour, cheese"
                />
                <Product
                  id="3254354345"
                  title="Chicken McMuffin"
                  price={2.49}
                  rating={3}
                  image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-chicken-mcmuffin.jpg?$Product_Desktop$"
                  ingredients="Ingredients: Chicken, wheat, barley, egg, mustard, milk, flour, oil, butter, salt, spice, garlic, mayonnaise"  
                />
              </div>
      
              <div className="mcdonalds__row">
                <Product
                  id="90829332"
                  title="McChicken"
                  price={5.39}
                  rating={3}
                  image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-mcchicken.jpg?$Product_Desktop$"
                  ingredients="Ingredients: Chicken, sesame seeds, milk, egg, wheat, gluten, vegetable oil, corn starch, salt, spices, yeast, sugar, pea, potato, butter, lettuce, mayonnaise"
                />
                <Product
                  id="23445931"
                  title="4 Chicken McNuggets with Apples Happy Meal"
                  price={4.79}
                  rating={5}
                  image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-chicken-mcnuggets-happy-meal.jpg?$Product_Desktop$"
                  ingredients="Ingredients: Chicken, milk, vegetable oil, wheat, flour, corn starch, salt, baking powder, yeast, apple, strawberry, sugar, cream, lemon juice"
                />

              </div>

              <div className="mcdonalds__row">
                <Product
                  id="12321342"
                  title="Poutine"
                  price={4.49}
                  rating={3}
                  image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-poutine.jpg?$Product_Desktop$"
                  ingredients="Ingredients: Chicken, milk, potatoes, vegetable oil, corn starch, sugar, salt, tomato, onion, garlic"
                />
                <Product
                  id="90829330"
                  title="World Famous Fries"
                  price={2.98}
                  rating={5}
                  image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-fries-medium.jpg?$Product_Desktop$"
                  ingredients="Ingredients: Potatoes, vegetable oil, citric acid, salt"
                />

                <Product
                  id="49538095"
                  title="Chocolate Triple Thick Milkshake"
                  price={3.44}
                  rating={4}
                  image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-chocolate-milkshake.jpg?$Product_Desktop$"
                  ingredients="Ingredients: Milk, cream, sugar, artificial vanilla flavour, cocoa, syrup"
                />
              </div>
      
              <div className="mcdonalds__row">
                <Product
                  id="4903850"
                  title="Quarter Pounder BLT"
                  price={6.09}
                  rating={4}
                  image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-quarter-pounder-blt.jpg?$Product_Desktop$"
                  ingredients="Ingredients: Beef, bacon, sesame seeds, wheat, gluten, soy, milk, egg, mustard, tomato, cheese, vegetable oil, salt, sugar, yeast, mayonnaise"
                />
                
                <Product
                  id="3254354346"
                  title="Banana Chocolate Chunk Muffin"
                  price={1.49}
                  rating={2}
                  image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-banana-chocolate-muffin.jpg?$Product_Desktop$"
                  ingredients="Ingredients: Milk, egg, soy, oat, barley, wheat, gluten, sugar, flour, banana, sugar, chocolate, vegetable oil, syrup, honey, apple, orange, baking soda, spices"
                />
              </div>
      
            </div>

        </div>
    )
}

export default Mcdonalds
