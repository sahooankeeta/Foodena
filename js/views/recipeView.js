import View from "./View.js";

//viewing a selected recipe
class RecipeView extends View {
  _parentEl = document.querySelector(".recipe");
  _errorMsg = "No such recipe found.Please try again :(";
  _message = "Start by searching for a recipe or an ingredient. Have fun!";
  addHandler(handler) {
    window.addEventListener("load", handler);
  }
  addHandlerRender(handler) {
    ["hashchange"].forEach((e) => window.addEventListener(e, handler));
  }
  _generateMarkup() {
    let recipe = this._data;

    return `
    <figure class="recipe__fig">
    <button data-like=${recipe.id} class="btn--round btn-like">
    <svg class="">
      <use href="images/sprite.svg#icon-${
        recipe.liked ? "heart" : "heart-outlined"
      }"></use>
    </svg>
  </button>
      <img src=${recipe.image} alt="${recipe.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>

   
    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${
        recipe.ingredients
          ? recipe.ingredients
              .map((item) => {
                return ` <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="images/sprite.svg#icon-checkmark"></use>
        </svg>
        <div class="recipe__quantity">${
          item.quantity ? item.quantity : ""
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${item.unit ? item.unit : ""}</span>
          ${item.description}
        </div>
      </li>`;
              })
              .join("")
          : ``
      }

      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">Instructions</h2>
      <ul class="recipe__instructions">
      ${
        recipe.instructions
          ? recipe.instructions
              .map((instruction, i) => `<li>${instruction}</li>`)
              .join("")
          : ``
      }
      </ul>
      <a class="btn--inline" href=${recipe.sourceLink}>know more</a>
      ${
        recipe.videoLink
          ? `
      <div class="recipe__video"> <iframe
      title=${recipe.id}
      width="565"
      height="300"
      src=${recipe.videoLink}
      frameBorder="0"
      gesture="media"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
  ></iframe></div>
      `
          : ""
      }
     
     
    </div>
     
    </div>

 `;
  }
  //controlling like feature of this recipe
  addHandlerLike(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-like");

      if (!btn) return;
      handler();
    });
  }
}
export default new RecipeView();
