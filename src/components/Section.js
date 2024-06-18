export default class Section {
  constructor({ items, renderer }, container) {
    this._data = items;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  renderItems() {
    this._data.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(item) {
    const newCard = this._renderer(item);
    this._container.prepend(newCard);
  }
}
