import { SETTINGS, CLASSES } from '../settings';
import Element from '../element';
import Menu from './menu';
import { Data, IData } from '../data';
import { emitter, EventEmitter } from '../event-emitter';

class Sidebar {
  private container: HTMLElement;

  private menu: HTMLElement;

  private data: IData[];

  private currentLevel: number;

  private emitter: EventEmitter;

  constructor(level: number) {
    this.currentLevel = level;
    this.container = new Element('aside', 'sidebar').createTag();
    this.menu = new Menu(this.currentLevel).render();
    this.data = new Data().getData();
    this.emitter = emitter;
  }

  private levelDown(): void {
    if (this.currentLevel > 1) {
      this.emitter.emit('event:levelDown', this.currentLevel);
    }
  }

  private levelUp(): void {
    if (this.currentLevel < this.data.length) {
      this.emitter.emit('event:levelUp', this.currentLevel);
    }
  }

  private createTitle(): HTMLElement {
    const wrapper = new Element('div', 'sidebarTitle').createTag();

    const level = new Element('div', 'sidebarLevel').createTag();
    level.innerText = `Level ${this.currentLevel} of ${this.data.length}`;

    const check = new Element('div', 'sidebarCheck').createTag();

    const prev = new Element('div', 'sidebarPrev').createTag();
    prev.addEventListener('click', this.levelDown.bind(this));

    const next = new Element('div', 'sidebarNext').createTag();
    next.addEventListener('click', this.levelUp.bind(this));

    wrapper.append(level, check, prev, next);

    return wrapper;
  }

  private static createProgressbar(): HTMLElement {
    const outer = new Element('div', 'progress').createTag();

    const inner = new Element('div', 'progressLine').createTag();

    outer.append(inner);

    return outer;
  }

  private createInfo(): HTMLElement {
    const wrapper = new Element('div', 'sidebarInfo').createTag();

    const title = new Element('h2', 'sidebarInfoTitle').createTag();
    title.innerText = this.data[this.currentLevel - 1]?.title;

    const subtitle = new Element('h3', 'sidebarInfoSubtitle').createTag();
    subtitle.innerText = this.data[this.currentLevel - 1]?.subtitle;

    const syntax = new Element('h4', 'sidebarSyntax').createTag();
    syntax.innerText = this.data[this.currentLevel - 1]?.syntax;

    const hint = new Element('div', 'sidebarHint').createTag();
    hint.innerHTML = this.data[this.currentLevel - 1]?.hint;

    const examples = new Element('div', 'examples').createTag();

    const examplesBody = new Element('div', 'examplesBody').createTag();

    const allExamples = this.data[this.currentLevel - 1]?.examples;
    allExamples?.forEach((element) => {
      const example = new Element('div', 'example').createTag();
      example.innerHTML = element;
      examplesBody.append(example);
    });

    if (allExamples && allExamples.length) {
      const examplesTitle = new Element('div', 'examplesTitle').createTag();
      examplesTitle.innerText = SETTINGS.examplesTitle;
      examples.append(examplesTitle, examplesBody);
    }

    wrapper.append(title, subtitle, syntax, hint, examples);

    return wrapper;
  }

  private subscribeNewProgressWidth(): void {
    this.emitter.subscribe('event:changeProgressWidth', (newWidth: unknown): void => {
      if (typeof newWidth === 'number') {
        const line = this.container.querySelector(`.${CLASSES.progressLine}`);
        line?.setAttribute('style', `width: ${newWidth}%`);
      }
    });
  }

  render(): HTMLElement {
    const title = this.createTitle();
    this.container.append(title);

    const progress = Sidebar.createProgressbar();
    this.container.append(progress);

    const info = this.createInfo();
    this.container.append(info);

    const [menu] = [this.menu];
    this.container.append(menu);

    this.subscribeNewProgressWidth();

    return this.container;
  }
}

export default Sidebar;
