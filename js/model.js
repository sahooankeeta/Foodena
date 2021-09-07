//import { async } from './regenerator-runtime/runtime';
import { API_URL, RES_PER_PAGE, TIMEOUT } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
  },
  likes: [],
};
const createRecipeObject = function (data) {
  let items = [],
    quantity = [];

  for (let key of Object.keys(data)) {
    if (key.startsWith("strIngredient") && data[key] != null) {
      items.push(data[key]);
    }
    if (key.startsWith("strMeasure") && data[key] != null) {
      quantity.push(data[key]);
    }
  }
  let ingredients = [];
  for (let i = 0; i < items.length; i++) {
    if (quantity[i].length > 0 && items[i].length > 0)
      ingredients.push({ quantity: quantity[i], description: items[i] });
  }
  return {
    id: data.idMeal,
    title: data.strMeal,
    image: data.strMealThumb,
    ingredients: ingredients,
    videoLink: data.strYoutube,
    liked: false,
  };
};
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    console.log(data.meals);
    state.recipe = createRecipeObject(data.meals[0]);

    let recipe = data.meals[0];

    if (state.likes.some((b) => b.id === id)) state.recipe.liked = true;
    else state.recipe.liked = false;
    console.log("recipe loaded");
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const loadSearchResults = async function (query) {
  //console.log(`${API_URL}${query}`);
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const data = await res.json();

  //console.log(data.meals);
  state.search.results = data.meals.map((recipe) => {
    return {
      id: recipe.idMeal,
      title: recipe.strMeal,
      image: recipe.strMealThumb,
    };
  });
  // console.log(state.search);
};
export const getSearchResultsPage = function (page = state.search.page) {
  const resperpg = RES_PER_PAGE;
  state.search.page = page;
  const start = (page - 1) * resperpg,
    end = page * resperpg;
  // console.log(start);
  return state.search.results.slice(start, end);
};
const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};
export const addLike = function (recipe) {
  if (state.recipe.liked) deleteLike(recipe.id);
  else {
    state.likes.push(recipe);
    if (recipe.id === state.recipe.id) state.recipe.liked = true;
  }
  persistBookmarks();
};
export const deleteBookmark = function (id) {
  const index = state.likes.findIndex((el) => el.id === id);
  state.likes.splice(index, 1);
  state.recipe.liked = false;
  persistBookmarks();
};
