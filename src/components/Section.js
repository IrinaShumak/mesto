export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    
    this._container = document.querySelector(selector);
  }

  renderItems(elements) {    
    if (elements) {
    elements.forEach(item => this._renderer(item))}
  }

  addItem(element) {
    this._container.append(element);
  }

  addNewItem(element) {
    this._container.prepend(element);
  }
}