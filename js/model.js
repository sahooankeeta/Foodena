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

    state.recipe = createRecipeObject(dataRecipe.meals[0]);

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

  const category = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`
  );

  const dataCategoryRecipes = await category.json();
  const ingredients = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=${query}`
  );
  const dataIngredientRecipes = await ingredients.json();

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
};
export const getSearchResultsPage = function (page = state.search.page) {
  const resperpg = RES_PER_PAGE;
  state.search.page = page;
  const start = (page - 1) * resperpg,
    end = page * resperpg;
  return state.search.results.slice(start, end);
};

export const addLike = function (recipe) {
  if (state.recipe.liked) deleteLike(recipe.id);
  else {
    state.likes.push(recipe);
    if (recipe.id === state.recipe.id) state.recipe.liked = true;
  }
};
export const deleteLike = function (id) {
  const index = state.likes.findIndex((el) => el.id === id);
  state.likes.splice(index, 1);
  state.recipe.liked = false;
};
const init = function () {
  const likes = sessionStorage.getItem("likes");

  if (likes) state.likes = JSON.parse(likes);

  const recipe = sessionStorage.getItem("currentRecipe");
  if (recipe) state.recipe = JSON.parse(recipe);
  const recommendations = sessionStorage.getItem("recommendations");
  if (recommendations) state.recommendations = JSON.parse(recommendations);
};
init();
