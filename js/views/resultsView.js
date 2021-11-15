import View from "./View.js";

//viewing results of a search
class ResultsView extends View {
  _parentEl = document.querySelector(".results");
  _errorMsg = "No such recipe found.Please try again :(";
  _message = "Start by searching for a recipe or an ingredient. Have fun!";
  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return this._data
      .map(
        (recipe) => `<li class="preview">
    <a class="preview__link ${
      recipe.id == id ? "preview__link--active" : ""
    }" href="#${recipe.id}">
      <figure class="preview__fig">
        <img src="${recipe.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${recipe.title}</h4>
        
      </div>
     
    </a>
  </li>`
      )
      .join("");
  }
}
export default new ResultsView();
