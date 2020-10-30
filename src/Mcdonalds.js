import React, {useState} from 'react'
import "./Mcdonalds.css";
import Product from "./Product";
import Background from "./img/mcdonalds-banner.jpg";
import { useStateValue } from "./StateProvider";

function Mcdonalds() {
  const [{ allergy, preference, budget }, dispatch] = useStateValue();

  const [allergyString, setAllergyString] = useState('');
  const [preferenceString, setPreferenceString] = useState('');
  const [budgetString, setBudgetString] = useState(null);

  const filter = () => {
    // dispatch the item into the data layer
    let allergyArray = allergyString.split(",");
    let preferenceArray = preferenceString.split(",");
    let budgetValue = budgetString;

    for(let i = 0; i < allergyArray.length; i++)
    {
      allergyArray[i] = allergyArray[i].toLowerCase().trim();
    }
    for(let i = 0; i < preferenceArray.length; i++)
    {
      preferenceArray[i] = preferenceArray[i].toLowerCase().trim();
    }

    dispatch({
      type: "UPDATE_FILTER",
      allergy: allergyArray,
      preference: preferenceArray,
      budget: budgetValue,
    });
  };

  return (

    <div className="mcdonalds">
      <div className="mcdonalds__container">
        {/* banner */}
        <img 
          className="mcdonalds__banner"
          src={Background}
          alt="" 
        />

        {/* Personalization Panel*/}
        <div className="menu__filter">
          <h1> Menu Filter </h1>

          <h3>Allergies / Dietary Restrictions: </h3>
          <input type='text' value={allergyString} onChange={e => setAllergyString(e.target.value)} />
          <h3>Ingredient Preferences:</h3>
          <input type='text' value={preferenceString} onChange={e => setPreferenceString(e.target.value)} />
          <h3>Budget Maximum ($):</h3>
          <input type='text' value={budgetString} onChange={e => setBudgetString(e.target.value)}/>

          <div className="filter__button">
            <button type='submit' onClick={filter}> Filter </button>
          </div> 

        </div>

        {/* Product rows */}
        <div className="mcdonalds__row">
          <Product
            id="12321341"
            title= "Big Mac"
            price={5.69}
            rating={5}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-big-mac.jpg?$Product_Desktop$"
            ingredients="Ingredients: beef, sesame seeds, wheat, gluten, soy, egg, mustard, milk, lettuce, cheese, pickle, onion, salt, spice, oil, sugar, corn starch, sweet relish, yeast, potato, pea"
          />
          <Product
            id="49538094"
            title="Double Big Mac"
            price={7.19}
            rating={4}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-double-big-mac.jpg?$Product_Desktop$"
            ingredients="Ingredients: beef, sesame seeds, wheat, gluten, soy, egg, mustard, milk, lettuce, cheese, pickle, onion, salt, spice, oil, sugar, corn starch, sweet relish, yeast, potato, pea"
          />
        </div>

        <div className="mcdonalds__row">
          <Product
            id="4903851"
            title="Strawberry Triple Thick Milkshake"
            price={3.44}
            rating={4}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-strawberry-milkshake.jpg?$Product_Desktop$"
            ingredients="Ingredients: milk, cream, sugar, artificial vanilla flavour, cocoa, syrup"
          />
          <Product
            id="23445930"
            title="Breakfast Burrito"
            price={2.39}
            rating={1}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-breakfast-burrito.jpg?$Product_Desktop$"
            ingredients="Ingredients: pork, egg, milk, soy, wheat, gluten, oil, salt, spices, tomatoes, onions, flour, cheese"
          />
          <Product
            id="3254354345"
            title="Chicken McMuffin"
            price={2.49}
            rating={3}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-chicken-mcmuffin.jpg?$Product_Desktop$"
            ingredients="Ingredients: chicken, wheat, barley, egg, mustard, milk, flour, oil, butter, salt, spice, garlic, mayonnaise"  
          />
        </div>
    
        <div className="mcdonalds__row">
          <Product
            id="90829332"
            title="McChicken"
            price={5.39}
            rating={3}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-mcchicken.jpg?$Product_Desktop$"
            ingredients="Ingredients: chicken, sesame seeds, milk, egg, wheat, gluten, vegetable oil, corn starch, salt, spices, yeast, sugar, pea, potato, butter, lettuce, mayonnaise"
          />
          <Product
            id="23445931"
            title="4 Chicken McNuggets with Apples Happy Meal"
            price={4.79}
            rating={5}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-chicken-mcnuggets-happy-meal.jpg?$Product_Desktop$"
            ingredients="Ingredients: chicken, milk, vegetable oil, wheat, flour, corn starch, salt, baking powder, yeast, apple, strawberry, sugar, cream, lemon juice"
          />
        </div>

        <div className="mcdonalds__row">
          <Product
            id="12321342"
            title="Poutine"
            price={4.49}
            rating={3}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-poutine.jpg?$Product_Desktop$"
            ingredients="Ingredients: chicken, milk, potatoes, vegetable oil, corn starch, sugar, salt, tomato, onion, garlic"
          />
          <Product
            id="90829330"
            title="World Famous Fries"
            price={2.98}
            rating={5}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-fries-medium.jpg?$Product_Desktop$"
            ingredients="Ingredients: potatoes, vegetable oil, citric acid, salt"
          />

          <Product
            id="49538095"
            title="Chocolate Triple Thick Milkshake"
            price={3.44}
            rating={4}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-chocolate-milkshake.jpg?$Product_Desktop$"
            ingredients="Ingredients: milk, cream, sugar, artificial vanilla flavour, cocoa, syrup"
          />
        </div>
    
        <div className="mcdonalds__row">
          <Product
            id="4903850"
            title="Quarter Pounder BLT"
            price={6.09}
            rating={4}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-quarter-pounder-blt.jpg?$Product_Desktop$"
            ingredients="Ingredients: beef, bacon, sesame seeds, wheat, gluten, soy, milk, egg, mustard, tomato, cheese, vegetable oil, salt, sugar, yeast, mayonnaise"
          />
          <Product
            id="3254354346"
            title="Banana Chocolate Chunk Muffin"
            price={1.49}
            rating={2}
            image="https://www.mcdonalds.com/is/image/content/dam/ca/nfl/web/nutrition/products/header/en/mcdonalds-banana-chocolate-muffin.jpg?$Product_Desktop$"
            ingredients="Ingredients: milk, egg, soy, oat, barley, wheat, gluten, sugar, flour, banana, sugar, chocolate, vegetable oil, syrup, honey, apple, orange, baking soda, spices"
          />
        </div>
      </div>
    </div>
  )
}

export default Mcdonalds
