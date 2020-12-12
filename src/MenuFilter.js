import React, {useState} from 'react'
import "./MenuFilter.css";
import { useStateValue } from "./StateProvider";

function MenuFilter()
{
    const [{allergy, preference, budget, rating, diet}, dispatch] = useStateValue();

  const [allergyString, setAllergyString] = useState('');
  const [preferenceString, setPreferenceString] = useState('');
  const [dietString, setDietString] = useState(null);
  const [budgetString, setBudgetString] = useState(null);
  const [ratingString, setRatingString] = useState(null);

  const filter = () => {
    // dispatch the item into the data layer   
    let allergyArray = allergyString.split(",");
    let preferenceArray = preferenceString.split(",");
    let budgetValue = budgetString;
    let ratingValue = ratingString;
    let dietValue = dietString;

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
      rating: ratingValue,
      diet: dietValue
    });
  };

  const allergyPlaceholder = () => {
    let string = "";
    for(let i = 0; i < allergy.length; i++)
    {
      if(i === 0)
      {
        string += allergy[i];
      }
      else
      {
        string += ", " + allergy[i];
      }
    }
    return string;
  }
  const preferencePlaceholder = () => {
    let string = "";
    for(let i = 0; i < preference.length; i++)
    {
      if(i === 0)
      {
        string += preference[i];
      }
      else
      {
        string += ", " + preference[i];
      }
    }
    return string;
  }
  const budgetPlaceholder = () => {
    let string = "";
    if(budget)
    {
      string = budget;
    }
    return string;
  }
  const ratingPlaceholder = () => {
    let string = "";
    if(rating)
    {
      string = rating;
    }
    return string;
  }
  const dietPlaceholder = () => {
    let string = "";
    if(diet)
    {
      string = diet;
    }
    return string;
  }

  return(
    <div className="menu__filter">
        <h1> Menu Filter </h1>

        <h3>Allergies / Dietary Restrictions: </h3>
        <input type='text' placeholder={allergyPlaceholder()} value={allergyString} onChange={e => setAllergyString(e.target.value)} />
        <h3>Ingredient Preferences:</h3>
        <input type='text' placeholder={preferencePlaceholder()} value={preferenceString} onChange={e => setPreferenceString(e.target.value)} />
        <h3>Budget Maximum ($):</h3>
        <input type='number' placeholder={budgetPlaceholder()} value={budgetString} onChange={e => setBudgetString(e.target.value)}/>
        <h3>Rating Minimum (Stars):</h3>
        <div className="filter__rating">
          <select type="rating" value={ratingString} onChange={e => setRatingString(e.target.value)}> 
            <option class="default" selected disabled hidden> {ratingPlaceholder() } </option>
            <option class="1"> 1 </option>, <option class="2"> 2 </option>, <option class="3"> 3 </option>, <option class="4"> 4 </option>, <option class="5"> 5 </option>
          </select>
        </div>

        <h3> Diet Selection:</h3>
        <div className="filter__diet">
          <select type="diet" value={dietString} onChange={e => setDietString(e.target.value)}> 
            <option class="default" selected disabled hidden> {dietPlaceholder()} </option>
            <option class="None"> None </option>, 
            <option class="Pollopescetarian"> Pollopescetarian </option>, 
            <option class="Pescetarian"> Pescetarian </option>, 
            <option class="Vegetarian"> Vegetarian </option>, 
            <option class="Vegan"> Vegan </option>
          </select>
        </div>       

        <div className="filter__button">
            <button type='submit' onClick={filter}> Filter </button>
        </div> 
    </div>
)}

export default MenuFilter

