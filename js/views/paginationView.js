import View from "./View.js";
//import icons from 'url:../../img/icons.svg';
import { RES_PER_PAGE } from "./../config.js";
class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  addHandleClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (btn) {
        const page = +btn.dataset.goto;
        handler(page);
      }
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / RES_PER_PAGE);
    const curPage = this._data.page;
    if (curPage == 1 && numPages > 1)
      return `
    <button data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
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
            <span>Page ${curPage - 1}</span>
          </button>`;
    if (curPage < numPages)
      return `
    <button data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="images/sprite.svg#icon-arrow-long-right"></use>
    </svg>
  </button>
    <button data-goto=${curPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="images/sprite.svg#icon-arrow-long-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
    return "";
  }
}
export default new PaginationView();
