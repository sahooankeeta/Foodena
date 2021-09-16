import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import recommendationView from "./views/recommendationView.js";
import likesView from "./views/likesView.js";
import View from "./views/View.js";
const recipeContainer = document.querySelector(".recipe");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".search__btn");
const searchResultsContainer = document.querySelector(".results");

const controlRecipes = async function () {
  try {
    //const id = '5ed6604591c37cdc054bc886';
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());

    likesView.update(model.state.likes);
    console.log("rec");
    await model.loadRecipe(id);

    let recipe = model.state.recipe;

    recipeView.render(recipe);
    recommendationView.render(model.state.recommendations);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};
const controlSearch = async function () {
  try {
    // let query = 'pizza';

    resultsView.renderSpinner();
    const query = searchView.getQuery();

    await model.loadSearchResults(query);
    let res = model.state.search.results;
    // console.log(res);
    if (res.length == 0)
      resultsView.renderError("no such item found.try again ");
    else resultsView.render(model.getSearchResultsPage(1));
    paginationView.render(model.state.search);
    //console.log(res);
  } catch (err) {
    resultsView.renderError();
  }
};
const controlPagination = function (page = 1) {
  // paginationView.getPage();
  console.log("clicked");
  resultsView.render(model.getSearchResultsPage());
  paginationView.render(model.state.search);

  resultsView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
};

//window.addEventListener('hashchange', showRecipe);
console.log("running");

const controlLike = function () {
  model.addLike(model.state.recipe);
  recipeView.update(model.state.recipe);
  likesView.render(model.state.likes);
};
const controlLikes = function () {
  likesView.render(model.state.likes);
};
const controlRecipe = function () {
  recipeView.render(model.state.recipe);
};
const controlRecommendation = function () {
  recommendationView.render(model.state.recommendations);
};
const init = function () {
  likesView.addHandler(controlLikes);
  recipeView.addHandler(controlRecipe);
  recipeView.addHandler(controlRecommendation);
  searchView.addHandlerSearch(controlSearch);
  recipeView.addHandlerRender(controlRecipes);
  paginationView.addHandleClick(controlPagination);

  recipeView.addHandlerLike(controlLike);
};
init();
