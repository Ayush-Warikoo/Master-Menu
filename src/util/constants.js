//Restaurant Constants
export const restaurants = ["McDonald's", "PizzaPizza"];

//Restaurant Page Formatting Constants
export const PRODUCTS_PER_ROW = 3;
export const DIET = {
  Vegan: 1,
  Vegetarian: 2,
  Pescetarian: 3,
  Pollopescetarian: 4,
  None: 5,
};

//Dish Constansts
export const STARTING_DISH_ID = 100000;
export const MAX_DISH_NUM = 100;

//Styling Constants
export const BLACK = "rgb(0, 0, 0)";
export const GREEN = "rgb(17, 191, 93)";
export const RED = "rgb(227, 54, 54)";
export const WHITE = "#FFF";
export const LIGHT_GRAY = "#E8E8E8";
export const DARK_GRAY = "#696969";

//Autocomplete Constants
export const ratingOptions = [
  { value: "None", label: "None" },
  { value: "1 Star", label: "1 Star" },
  { value: "2 Stars", label: "2 Stars" },
  { value: "3 Stars", label: "3 Stars" },
  { value: "4 Stars", label: "4 Stars" },
  { value: "5 Stars", label: "5 Stars" },
];

export const dietOptions = [
  { value: "None", label: "None" },
  { value: "Pollopescetarian", label: "Pollopescetarian" },
  { value: "Pescetarian", label: "Pescetarian" },
  { value: "Vegetarian", label: "Vegetarian" },
  { value: "Vegan", label: "Vegan" },
];

export const DEBOUNCE_TIME = 400;

//Orders Constants
export const PAGINATION_LIMIT = 5;
export const BOTTOM_DISTANCE_TOLERANCE = 1000;
export const THROTTLE_TIME = 1000;

//Checkout Constants
export const MAX_STARS = 5;

//Toast Constants
export const LONG_TOAST_DURATION = 2500;
export const MID_TOAST_DURATION = 2000;
export const SHORT_TOAST_DURATION = 1500;
