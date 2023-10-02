import { CLASSES } from '../../settings';
import Element from '../../element';

class Helper {
  private container: HTMLElement;

  constructor() {
    this.container = new Element('div', ...CLASSES.helper).createTag();
  }

  render(): HTMLElement {
    return this.container;
  }
}

export default Helper;
