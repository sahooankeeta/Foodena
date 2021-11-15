export default class View {
  _data;
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }
  //the loading spinner
  renderSpinner() {
    const markup = `<div class="spinner">
        <svg>
          <use href="images/sprite.svg#icon-spinner3"></use>
        </svg>
      </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }
  //display error messages
  renderError(message = this._errorMsg) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="images/sprite.svg#icon-warning"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
  //display initial messages
  renderMessage(message = this._message) {
    const markup = ` <div class="message">
    <div>
     /* <svg>
        <use href="src/img/icons.svg#icon-smile"></use>
      </svg>*/
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
  //clearing view before rendering new data
  _clear() {
    this._parentEl.innerHTML = "";
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDom.querySelectorAll("*"));
    const curElement = Array.from(this._parentEl.querySelectorAll("*"));

    newElement.forEach((newel, i) => {
      const curel = curElement[i];
      if (
        !newel.isEqualNode(curel) &&
        newel.firstChild?.nodeValue.trim() !== ""
      ) {
        curel.textContent = newel.textContent;
      }
      if (!newel.isEqualNode(curel)) {
        Array.from(newel.attributes).forEach((attr) => {
          curel.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
}
