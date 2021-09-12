import View from "./View.js";

class RecommendationView extends View {
  _parentEl = document.querySelector(".recommendations-list");
  _errorMsg = "No such recipe found.Please try again :(";
  _message = "Start by searching for a recipe or an ingredient. Have fun!";
  _generateMarkup() {
    let recipes = this._data.results;
    let total = this._data.pages;
    let slides = "";

    // let markup = "";
    // let item = 0;
    // for (let i = 0; i < total; i++) {
    //   let temp = `<div class="carousel-item${i == 0 ? " active" : ""}">
    //  <div class="row">`;
    //   for (let j = 0; j < 3; j++) {
    //     if (item == recipes.length) temp = temp + "";
    //     else {
    //       temp =
    //         temp +
    //         `  <div class="col-md-4">
    //    <div class="recommendations-item">
    //            <a href="#${recipes[item].id}" class="recommendations__link">
    //              <div class="recommendations__fig">
    //                <img
    //                  src=${recipes[item].image}
    //                  class="recommendations__img"
    //                />
    //                <h3 class="recommendations__title">${recipes[item].title}</h3>
    //              </div>
    //            </a>
    //          </div>
    //          </div>`;
    //       item++;
    //     }
    //   }
    //   temp = temp + "</div></div>";
    //   markup = markup + temp;
    // }
    return recipes
      .map(
        (recipe) => ` <div class="recommendations-item">
                <a href="#${recipe.id}" class="recommendations__link">
                  <div class="recommendations__fig">
                    <img
                      src=${recipe.image}
                      class="recommendations__img"
                    />
                    <h3 class="recommendations__title">${recipe.title}</h3>
                  </div>
                </a>
              </div>`
      )
      .join("");
  }
}
export default new RecommendationView();
