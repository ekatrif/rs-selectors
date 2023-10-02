import Element from '../element';

class Main {
  private container: HTMLElement;

  constructor() {
    this.container = new Element('main', 'main').createTag();
  }

  render(): HTMLElement {
    return this.container;
  }
}

const main = new Main().render();

export default main;
