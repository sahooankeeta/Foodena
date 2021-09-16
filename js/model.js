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
  recommendations: [],
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
    area: data.strArea,
    category: data.strCategry,
    image: data.strMealThumb,
    ingredients: ingredients,
    instructions: data.strInstructions
      .split("/d*\\r\\n/g")[0]
      .split(".")
      .filter((i) => i !== ""),
    tags: data.strTags ? data.strTags.split(",") : null,
    sourceLink: data.strSource,
    videoLink: data.strYoutube
      ? `https://www.youtube.com/embed/${data.strYoutube.split("=")[1]}`
      : null,
    liked: false,
  };
};
export const loadRecipe = async function (id) {
  window.scroll({ top: 0, left: 0 });
  try {
    const dataRecipe = await getJSON(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const dataRecommendation = await getJSON(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${dataRecipe.meals[0].strArea}`
    );
    // console.log(dataRecommendation.meals.slice(6));

    state.recipe = createRecipeObject(dataRecipe.meals[0]);
    persistRecipe();
    console.log(state.recipe);
    let recommendations = dataRecommendation.meals.filter(
      (meal) => meal.idMeal != state.recipe.id
    );

    state.recommendations = recommendations.map((recipe) => {
      return {
        id: recipe.idMeal,
        title: recipe.strMeal,
        image: recipe.strMealThumb,
      };
    });
    persistRecommendations();
    console.log(state);
    let recipe = dataRecipe.meals[0];

    if (state.likes.some((b) => b.id === id)) state.recipe.liked = true;
    else state.recipe.liked = false;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const loadSearchResults = async function (query) {
  const recipes = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const dataRecipes = await recipes.json();
  const area = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`
  );

  const dataAreaRecipes = await area.json();
  // console.log(dataRecipes.meals);
  const category = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`
  );

  const dataCategoryRecipes = await category.json();
  const ingredients = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=${query}`
  );
  const dataIngredientRecipes = await ingredients.json();

  //console.log(data.meals);
  if (dataRecipes.meals != null)
    state.search.results = dataRecipes.meals.map((recipe) => {
      return {
        id: recipe.idMeal,
        title: recipe.strMeal,
        image: recipe.strMealThumb,
      };
    });
  if (dataAreaRecipes.meals != null)
    dataAreaRecipes.meals.forEach((recipe) => {
      if (recipe.idMeal)
        state.search.results.push({
          id: recipe.idMeal,
          title: recipe.strMeal,
          image: recipe.strMealThumb,
        });
    });
  if (dataCategoryRecipes.meals != null)
    dataCategoryRecipes.meals.forEach((recipe) => {
      if (recipe.idMeal)
        state.search.results.push({
          id: recipe.idMeal,
          title: recipe.strMeal,
          image: recipe.strMealThumb,
        });
    });
  if (dataIngredientRecipes.meals != null)
    dataIngredientRecipes.meals.forEach((recipe) => {
      if (recipe.idMeal)
        state.search.results.push({
          id: recipe.idMeal,
          title: recipe.strMeal,
          image: recipe.strMealThumb,
        });
    });
  console.log(state.search.results);
};
export const getSearchResultsPage = function (page = state.search.page) {
  const resperpg = RES_PER_PAGE;
  state.search.page = page;
  const start = (page - 1) * resperpg,
    end = page * resperpg;
  // console.log(start);
  return state.search.results.slice(start, end);
};

const persistLikes = function () {
  localStorage.setItem("likes", JSON.stringify(state.likes));
};

const persistRecipe = function () {
  localStorage.setItem("currentRecipe", JSON.stringify(state.recipe));
};
const persistRecommendations = function () {
  localStorage.setItem(
    "recommendations",
    JSON.stringify(state.recommendations)
  );
};
export const addLike = function (recipe) {
  if (state.recipe.liked) deleteLike(recipe.id);
  else {
    state.likes.push(recipe);
    if (recipe.id === state.recipe.id) state.recipe.liked = true;
  }
  persistLikes();
};
export const deleteLike = function (id) {
  const index = state.likes.findIndex((el) => el.id === id);
  state.likes.splice(index, 1);
  state.recipe.liked = false;
  persistLikes();
};
const init = function () {
  const likes = localStorage.getItem("likes");

  if (likes) state.likes = JSON.parse(likes);
  console.log(state);

  const recipe = localStorage.getItem("currentRecipe");
  if (recipe) state.recipe = JSON.parse(recipe);
  const recommendations = localStorage.getItem("recommendations");
  if (recommendations) state.recommendations = JSON.parse(recommendations);
};
init();
