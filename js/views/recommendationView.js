import View from "./View.js";

//For rendering recommendations section
class RecommendationView extends View {
  _parentEl = document.querySelector(".recommendations");
  _errorMsg = "No such recipe found.Please try again :(";
  _message = "Start by searching for a recipe or an ingredient. Have fun!";
  addHandler(handler) {
    window.addEventListener("load", handler);
  }
  _generateMarkup() {
    let recipes = this._data;

    let markup = recipes
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
    if (this._data.length != 0)
      return (
        `
    <h2 class="heading--2">you may also like :</h2>
    <ul class="recommendations-list">` +
        markup +
        `</ul>
      `
      );
  }
}

export default new RecommendationView();
