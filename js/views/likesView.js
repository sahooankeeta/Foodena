import View from "./View.js";

//rendering items of the like tab
class likesView extends View {
  _parentEl = document.querySelector(".likes__list");
  addHandler(handler) {
    window.addEventListener("load", handler);
  }
  _generateMarkup() {
    if (this._data.length == 0)
      return ` <div class="message">
      <div>
        <img
          src="./images/icons8-sad-48.png"
        />
      </div>
      <p>
        No likes yet. Find a nice recipe and like it :)
      </p>
    </div>
`;
    const id = window.location.hash.slice(1);

    return this._data
      .map(
        (recipe) => `
        <li data-like=${recipe.id} class="preview">
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
export default new likesView();
