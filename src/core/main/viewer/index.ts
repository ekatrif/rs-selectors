import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

import { SETTINGS } from '../../settings';
import Element from '../../element';
import { Data, IData } from '../../data';
import { emitter, EventEmitter } from '../../event-emitter';

hljs.configure({
  languages: ['html'],
  cssSelector: 'code',
});

class Viewer {
  private container: HTMLElement;

  private data: IData[];

  private currentLevel: number;

  private emitter: EventEmitter;

  constructor(level = 1) {
    this.container = new Element('section', 'viewer').createTag();
    this.data = new Data().getData();
    this.currentLevel = level;
    this.emitter = emitter;
  }

  private static createTitle(): HTMLElement {
    const title = new Element('div', 'viewerTitle').createTag();

    const viewerName = new Element('div', 'viewerName').createTag();
    viewerName.textContent = SETTINGS.viewerName;

    const viewerFile = new Element('div', 'viewerFile').createTag();
    viewerFile.textContent = SETTINGS.viewerFile;

    title.append(viewerName, viewerFile);

    return title;
  }

  private static createWindow(): HTMLElement {
    const window = new Element('div', 'viewerWindow').createTag();
    return window;
  }

  private static createLines(): HTMLElement {
    const lines = new Element('div', 'viewerLines').createTag();

    const [linesNumber] = [SETTINGS.linesNumber];
    for (let i = 0; i < linesNumber; i += 1) {
      const line = new Element('span', 'viewerLine').createTag();
      line.innerText = (i + 1).toString();
      lines.append(line);
    }
    return lines;
  }

  private addPadding(): void {
    const code = this.container.querySelector('code.hljs');
    const children = code?.children;
    if (children && children.length) {
      [...children].forEach((child, index) => {
        if (child.classList.contains('hljs-tag') && index !== 0 && index !== children.length - 1) {
          child.setAttribute('style', `padding-left: ${SETTINGS.viewerPadding}em`);
        }
      });
    }
  }

  private addDataIds(): void {
    const code = this.container.querySelector('code.hljs') as HTMLElement;
    const children = code?.children;
    if (children && children.length) {
      [...children].forEach((child, index) => {
        if (child.classList.contains('hljs-tag') && index !== 0 && index !== children.length - 1) {
          const tag = child.textContent;
          if (tag?.slice(0, 2) === '</') {
            child.setAttribute('data-id', `${index}`);
          } else {
            child.setAttribute('data-id', `${index}`);
          }
        }
      });
    }
  }

  private createMarkup(): HTMLElement {
    const markup = new Element('div', 'viewerMarkup').createTag();
    const pre = document.createElement('pre');
    const code = document.createElement('code');

    const [task] = [this.data[this.currentLevel - 1].task];
    const stringToHighlight = `<div class="table">${task}</div>`;

    code.innerText = stringToHighlight;
    pre.append(code);
    markup.append(pre);

    hljs.highlightElement(code);

    return markup;
  }

  private addHighlightToItem(): void {
    const code = this.container.querySelector('code.hljs');
    code?.addEventListener('mouseover', (event) => {
      const target = event.target as HTMLElement;
      const targetTag = target?.closest('.hljs-tag');
      this.emitter.emit('event:addHighlightToItem', targetTag);

      const dataId = targetTag?.getAttribute('data-id');
      const table = document.querySelector('.table');
      if (dataId) {
        const correspondingItem = table?.querySelector(`[data-id='${dataId}']`);
        this.emitter.emit('event:mouseoverItem', correspondingItem);
      }
    });
  }

  private removeHighlightToItem(): void {
    const code = this.container.querySelector('code.hljs');
    code?.addEventListener('mouseout', (event) => {
      const target = event.target as HTMLElement;
      const targetTag = target?.closest('.hljs-tag');
      this.emitter.emit('event:removeHighlightToItem', targetTag);

      const dataId = targetTag?.getAttribute('data-id');
      const table = document.querySelector('.table');
      if (dataId) {
        const correspondingItem = table?.querySelector(`[data-id='${dataId}']`);
        this.emitter.emit('event:mouseoutItem', correspondingItem);
      }
    });
  }

  render(): HTMLElement {
    const title = Viewer.createTitle();
    this.container.append(title);

    const window = Viewer.createWindow();
    this.container.append(window);

    const lines = Viewer.createLines();

    const markup = this.createMarkup();
    window.append(lines, markup);

    this.addDataIds();
    this.addPadding();
    this.addHighlightToItem();
    this.removeHighlightToItem();

    return this.container;
  }
}

export default Viewer;
