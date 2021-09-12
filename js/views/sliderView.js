import View from "./View.js";

class SliderView extends View {
  _parentEl = document.querySelector(".slider");

  addHandleClick(handler) {
    console.log("slider");
    this._parentEl.addEventListener("click", function (e) {
      // console.log('clicked');
      const btn = e.target.closest(".btn--inline");

      if (btn) {
        const page = +btn.dataset.goto;
        handler(page);
      }
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / 4);
    const curPage = this._data.page;
    if (curPage == 1 && numPages > 1)
      return `
    <button data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
    <span></span>
    <svg class="search__icon">
      <use href="images/sprite.svg#icon-arrow-long-right"></use>
    </svg>
  </button>`;
    if (curPage === numPages && numPages > 1)
      return `
    <button data-goto=${curPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="images/sprite.svg#icon-arrow-long-left"></use>
            </svg>
            <span></span>
          </button>`;
    if (curPage < numPages)
      return `
    <button data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
    <span></span>
    <svg class="search__icon">
      <use href="images/icons.svg#icon-arrow-right"></use>
    </svg>
  </button>
    <button data-goto=${curPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="images/icons.svg#icon-arrow-left"></use>
            </svg>
            <span></span>
          </button>`;
    return "";
  }
}
export default new SliderView();
