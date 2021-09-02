import React, { useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async-creatable";
import makeAnimated from "react-select/animated";
import { useStateValue } from "../context/StateProvider";
import "./css/MenuFilter.css";
import { ratingOptions, dietOptions } from "../util/constants";

function MenuFilter() {
  const [{ allergy, preference, budget, rating, diet }, dispatch] =
    useStateValue();

  //Helper function to remember filter options
  const convertToAutocompleteOptions = (options) => {
    if (!options) {
      return "";
    }
    let result;
    //Multi option selects
    if (Array.isArray(options)) {
      result = options.map((option) => {
        return {
          label: option,
          value: option,
        };
      });
    }
    //Single option selects
    else {
      result = {
        label: options,
        value: options,
      };
    }
    return result;
  };

  const [selectedAllergies, setSelectedAllergies] = useState(
    convertToAutocompleteOptions(allergy)
  );
  const [selectedPrefs, setSelectedPrefs] = useState(
    convertToAutocompleteOptions(preference)
  );
  const [selectedBudget, setSelectedBudget] = useState(budget || "");
  const [selectedRating, setSelectedRating] = useState(
    convertToAutocompleteOptions(rating)
  );
  const [selectedDiet, setSelectedDiet] = useState(
    convertToAutocompleteOptions(diet)
  );

  const animatedComponents = makeAnimated();

  const filter = () => {
    let allergyArray = selectedAllergies.map((allergin) => allergin.value);
    let preferenceArray = selectedPrefs.map((pref) => pref.value);
    let budgetValue = selectedBudget;
    let ratingValue = selectedRating.value;
    let dietValue = selectedDiet.value;

    for (let i = 0; i < allergyArray.length; i++) {
      allergyArray[i] = allergyArray[i].toLowerCase().trim();
    }
    for (let i = 0; i < preferenceArray.length; i++) {
      preferenceArray[i] = preferenceArray[i].toLowerCase().trim();
    }

    dispatch({
      type: "UPDATE_FILTER",
      allergy: allergyArray,
      preference: preferenceArray,
      budget: budgetValue,
      rating: ratingValue,
      diet: dietValue,
    });
  };

  const loadOptions = async (query, callback) => {
    const response = await fetch(
      `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${process.env.REACT_APP_SPOONTACULAR_API_KEY}&query=${query}&number=5`
    );
    const json = await response.json();
    callback(
      json.map((ingredient) => ({
        label: ingredient.name,
        value: ingredient.name,
      }))
    );
  };

  const budgetPlaceholder = () => {
    let string;
    if (budget) {
      string = budget;
    } else {
      string = "Select...";
    }
    return string;
  };

  return (
    <div className="menu__filter">
      <h1> Menu Filter </h1>

      <h3>Allergies / Dietary Restrictions: </h3>
      <AsyncSelect
        cacheOptions
        value={selectedAllergies}
        onChange={setSelectedAllergies}
        loadOptions={loadOptions}
        isMulti
        className={"menuFilter__searchBar_allergy"}
        components={animatedComponents}
      />

      <h3>Ingredient Preferences:</h3>
      <AsyncSelect
        cacheOptions
        value={selectedPrefs}
        onChange={setSelectedPrefs}
        loadOptions={loadOptions}
        isMulti
        className={"menuFilter__searchBar_preferences"}
        components={animatedComponents}
      />

      <h3>Rating Minimum (Stars):</h3>
      <div className="filter__rating">
        <Select
          value={selectedRating}
          onChange={setSelectedRating}
          options={ratingOptions}
          className={"filter__rating_bar"}
        />
      </div>

      <h3> Diet Selection:</h3>
      <div className="filter__diet">
        <Select
          value={selectedDiet}
          onChange={setSelectedDiet}
          options={dietOptions}
          className={"filter__diet_bar"}
        />
      </div>

      <h3>Budget Maximum ($):</h3>
      <input
        type="number"
        placeholder={budgetPlaceholder()}
        value={selectedBudget}
        onChange={(e) => setSelectedBudget(e.target.value)}
      />

      <div className="filter__button">
        <button type="submit" onClick={filter}>
          Filter
        </button>
      </div>
    </div>
  );
}

export default MenuFilter;
