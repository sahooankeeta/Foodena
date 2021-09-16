import View from "./View.js";

class RecommendationView extends View {
  _parentEl = document.querySelector(".recommendations-list");
  _errorMsg = "No such recipe found.Please try again :(";
  _message = "Start by searching for a recipe or an ingredient. Have fun!";
  addHandler(handler) {
    window.addEventListener("load", handler);
  }
  _generateMarkup() {
    let recipes = this._data;
    return recipes
      .map(
        (recipe) => ` <li class="recommendations-item">
              <a href="#${recipe.id}" class="recommendations__link">
                <div class="recommendations__fig">
                  <img
                    src=${recipe.image}
                    class="recommendations__img"
                  />
                  <h3 class="recommendations__title">${recipe.title}</h3>
                </div>
              </a>
            </li>`
      )
      .join("");
  }
}

export default new RecommendationView();
