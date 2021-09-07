class SearchView {
  _parentEl = document.querySelector('.search');
  _errorMsg = 'No such recipre found.Please try again :(';
  #data;

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();

      handler();
    });
  }
  getQuery() {
    let query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
}
export default new SearchView();
