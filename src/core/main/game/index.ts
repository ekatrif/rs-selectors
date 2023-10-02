import { SETTINGS, CLASSES } from '../../settings';
import Element from '../../element';
import { Data, IData } from '../../data';
import { emitter, EventEmitter } from '../../event-emitter';

class Game {
  private container: HTMLElement;

  private data: IData[];

  private currentLevel: number;

  private emitter: EventEmitter;

  constructor(level: number) {
    this.container = new Element('section', 'game').createTag();
    this.data = new Data().getData();
    this.currentLevel = level;
    this.emitter = emitter;
  }

  private applyStrobeClass(wrapper: HTMLElement): void {
    const strobeSelectors = this.data[this.currentLevel - 1]?.answer;
    strobeSelectors?.forEach((selector: string): void => {
      [...wrapper.querySelectorAll(selector)].forEach((element): void => {
        CLASSES.strobeAnimation.forEach((strobeClass) => element.classList.add(strobeClass));
      });
    });
  }

  private createTitle(): HTMLElement {
    const title = new Element('h1', 'gameTitle').createTag();
    title.innerText = this.data[this.currentLevel - 1]?.taskTitle;

    return title;
  }

  private createHelp(): HTMLElement {
    const helpWrapper = new Element('p', 'help').createTag();

    const helpLink = new Element('a', 'helpLink').createTag() as HTMLAnchorElement;
    helpLink.href = '#';
    helpLink.innerText = SETTINGS.helpText;
    helpLink.addEventListener('click', () => {
      this.emitter.emit('event:needHelp', 0);
    });

    helpWrapper.append(helpLink);

    return helpWrapper;
  }

  private parseMarkup(): string {
    const [markup] = [this.data[this.currentLevel - 1]?.task];
    return markup;
  }

  private static formatMarkup(string: string): string {
    const arr = string?.trim().split('\n');
    let result = '';
    arr?.forEach((str, index) => {
      const trimStr = str.trim();
      if (trimStr[trimStr.length - 2] === '/') {
        result += `<${trimStr.slice(1, trimStr.length - 2)} data-id='${index + 1}'>`;
        result += `</${trimStr.slice(1, trimStr.length - 2)}>`;
      } else if (trimStr[1] !== '/') {
        result += `<${trimStr.slice(1, trimStr.length - 1)} data-id='${index + 1}'>`;
      } else {
        result += trimStr;
      }
    });
    return result;
  }

  private createTable(): HTMLElement {
    const table = new Element('div', 'table').createTag();
    const markup = this.parseMarkup();
    table.innerHTML = Game.formatMarkup(markup);

    // Подсветить предметы на столе при наведении
    table.addEventListener('mouseover', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && table.contains(target) && target !== table) {
        this.emitter.emit('event:mouseoverItem', target);
      }
    });

    // Убрать подсветку при уходе мыши с предмета
    table.addEventListener('mouseout', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && table.contains(target) && target !== table) {
        this.emitter.emit('event:mouseoutItem', target);
      }
    });

    // Выбрать все элементы с селекторами из массива и присвоить каждому мигающий класс
    this.applyStrobeClass(table);

    return table;
  }

  render(): HTMLElement {
    const title = this.createTitle();
    this.container.append(title);

    const help = this.createHelp();
    this.container.append(help);

    const table = this.createTable();
    this.container.append(table);

    return this.container;
  }
}

export default Game;
