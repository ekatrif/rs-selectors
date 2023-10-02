import { SETTINGS, CLASSES } from '../../settings';
import Element from '../../element';
import { Data, IData } from '../../data';
import { emitter, EventEmitter } from '../../event-emitter';

class Menu {
  private container: HTMLElement;

  private data: IData[];

  private level: number;

  private emitter: EventEmitter;

  constructor(level: number) {
    this.container = new Element('div', 'menu').createTag();
    this.data = new Data().getData();
    this.level = level;
    this.emitter = emitter;
  }

  render(): HTMLElement {
    const title = new Element('div', 'menuTitle').createTag();
    title.innerText = SETTINGS.menuTitle;

    const list = new Element('ul', 'menuList').createTag();
    this.data.forEach((obj: IData, index: number): void => {
      const item = new Element('li', 'menuItem').createTag();
      if (index === this.level - 1) {
        CLASSES.menuActiveItem.forEach((element) => item.classList.add(element));
      }

      const link = new Element('a', 'menuLink').createTag() as HTMLAnchorElement;
      link.href = '#';

      const check = new Element('span', 'menuCheck').createTag();

      const number = new Element('span', 'menuNumber').createTag();
      number.innerText = `${obj.level}`;

      const name = new Element('span', 'menuName').createTag();
      name.innerText = `${obj.syntax}`;

      link.append(check, number, name);
      item.append(link);
      list.append(item);
    });

    list.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const item = target?.closest(`.${CLASSES.menuItem}`);
      if (item) {
        const levelTag = item.querySelector(`.${CLASSES.menuNumber}`);
        const level = Number(levelTag?.textContent);
        this.emitter.emit('event:gotoLevel', level);
      }
    });

    const resetBtn = new Element('button', 'menuBtn').createTag();
    resetBtn.innerText = SETTINGS.btnReset;
    resetBtn.addEventListener('click', () => {
      this.emitter.emit('event:resetProgress', 0);
    });

    this.container.append(title, list, resetBtn);
    return this.container;
  }
}

export default Menu;
