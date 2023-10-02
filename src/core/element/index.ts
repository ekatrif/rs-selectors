import { CLASSES } from '../settings';

class Element {
  private tag: string;

  private classKey?: string;

  constructor(tag: string, classKey?: string) {
    this.tag = tag;
    this.classKey = classKey;
  }

  createTag(): HTMLElement {
    const element = document.createElement(this.tag);
    if (this.classKey) CLASSES[this.classKey].forEach((item: string): void => element.classList.add(item));
    return element;
  }
}

export default Element;
