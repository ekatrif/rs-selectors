import { CLASSES, SETTINGS } from '../settings';
import Element from '../element';
import Header from '../header';
import main from '../main';
import Footer from '../footer';
import Sidebar from '../sidebar';
import Game from '../main/game';
import Editor from '../main/editor';
import Viewer from '../main/viewer';
import Helper from '../main/helper';
import { Data, IData } from '../data';

import { emitter, EventEmitter } from '../event-emitter';

class App {
  private container: HTMLElement;

  private header: Header;

  private main: HTMLElement;

  private game: Game;

  private editor: Editor;

  private viewer: Viewer;

  private helper: Helper;

  private footer: Footer;

  private sidebar: Sidebar;

  private emitter: EventEmitter;

  private level: number;

  private data: IData[];

  private levelsDone: number[];

  private levelsHelped: number[];

  constructor(level: number, levelsDone: number[], levelsHelped: number[]) {
    this.container = document.createElement('div');
    this.container.id = SETTINGS.appId;

    this.emitter = emitter;
    this.level = level;

    this.header = new Header();
    this.main = main;
    this.game = new Game(this.level);
    this.editor = new Editor(this.level);
    this.viewer = new Viewer(this.level);
    this.helper = new Helper();
    this.sidebar = new Sidebar(this.level);
    this.footer = new Footer();
    this.data = new Data().getData();
    this.levelsDone = levelsDone;
    this.levelsHelped = levelsHelped;
  }

  public static focusInput(): void {
    const input = document.querySelector(`.${CLASSES.editorInput}`) as HTMLInputElement;
    input.focus();
  }

  public static closeMenu(): void {
    const burgerIcon = document.querySelector(`.${CLASSES.burgerIcon}`);
    CLASSES.burgerOpen.forEach((item) => burgerIcon?.classList.remove(item));
  }

  public subscribeResetProgress(): void {
    this.emitter.subscribe('event:resetProgress', (): void => {
      App.closeMenu();

      this.level = 1;
      this.levelsDone = [];
      this.levelsHelped = [];

      this.game = new Game(this.level);
      this.editor = new Editor(this.level);
      this.viewer = new Viewer(this.level);
      this.sidebar = new Sidebar(this.level);

      this.main.innerHTML = '';

      this.renderGame();
      this.renderEditor();
      this.renderViewer();
      this.renderHelper();
      this.renderSidebar();

      this.highlightDoneLevels();
      this.emitProgressWidth();

      App.focusInput();
    });
  }

  public subscribeGameOver(): void {
    this.emitter.subscribe('event:gameOver', (): void => {
      const title = document.querySelector(`.${CLASSES.gameTitle}`);
      if (title) title.textContent = '';

      const help = document.querySelector(`.${CLASSES.help}`);
      if (help) help.textContent = '';

      const table = document.querySelector(`.${CLASSES.table}`);
      const span = document.createElement('span');
      span.innerHTML = SETTINGS.congrats;
      if (table) {
        table.innerHTML = '';
        table.append(span);
      }
    });
  }

  public getLevel(): number {
    return this.level;
  }

  private renderHeader(): void {
    const headerHTML = this.header.render();
    this.container.append(headerHTML);
  }

  private appendMain(): void {
    this.container.append(main);
  }

  private renderGame(): void {
    const gameHTML = this.game.render();
    this.main.append(gameHTML);
  }

  private renderEditor(): void {
    const editorHTML = this.editor.render();
    this.main.append(editorHTML);
  }

  private renderViewer(): void {
    const viewerHTML = this.viewer.render();
    this.main.append(viewerHTML);
  }

  private renderHelper(): void {
    const helperHTML = this.helper.render();
    this.main.append(helperHTML);
  }

  private renderSidebar(): void {
    document.querySelector(`.${CLASSES.sidebar}`)?.remove();
    const sidebarHTML = this.sidebar.render();
    this.container.append(sidebarHTML);
  }

  private renderFooter(): void {
    const footerHTML = this.footer.render();
    this.container.append(footerHTML);
  }

  private levelChangedHandler(): void {
    this.emitter.emit('event:levelChanged', this.level);

    this.game = new Game(this.level);
    this.editor = new Editor(this.level);
    this.viewer = new Viewer(this.level);
    this.sidebar = new Sidebar(this.level);

    this.main.innerHTML = '';

    this.renderGame();
    this.renderEditor();
    this.renderViewer();
    this.renderHelper();
    this.renderSidebar();

    this.emitProgressWidth();

    this.highlightDoneLevels();

    App.focusInput();
  }

  private subscribeCheckAnswer(): void {
    this.emitter.subscribe('event:checkAnswer', (event: unknown): void => {
      const editorWrapper = document.querySelector(`.${CLASSES.editor}`);
      editorWrapper?.classList.remove('shake');

      if ((event instanceof KeyboardEvent && event.key === 'Enter') || event instanceof MouseEvent) {
        const input = document.querySelector(`.${CLASSES.editorInput}`) as HTMLInputElement;
        const table = document.querySelector(`.${CLASSES.table}`);
        if (input && this.data[this.level - 1].answer.includes(input.value)) {
          if (this.level === this.data.length) {
            this.levelsDone.push(this.data[this.level - 1].level);
            this.emitter.emit('event:gameOver', this.level);
            this.emitProgressWidth();
          } else if (this.level < this.data.length) {
            CLASSES.trueAnimation.forEach((element) => table?.classList.add(element));
            setTimeout(() => {
              this.levelsDone.push(this.data[this.level - 1].level);
              this.emitter.emit('event:levelUp', this.level);
            }, 500);
          }
        } else {
          CLASSES.falseAnimation.forEach((element) => editorWrapper?.classList.add(element));
        }
      }
    });
  }

  private highlightDoneLevels(): void {
    const check = document.querySelector(`.${CLASSES.sidebarCheck}`);
    // Highlight check image in the title
    if (
      this.levelsDone.includes(this.data[this.level - 1].level) &&
      !this.levelsHelped.includes(this.data[this.level - 1].level)
    ) {
      CLASSES.sidebarChecked.forEach((item) => check?.classList.add(item));
    } else if (this.levelsHelped.includes(this.data[this.level - 1].level)) {
      CLASSES.sidebarHelped.forEach((item) => check?.classList.add(item));
    }

    // Highlight check image in menu
    const checks = document.querySelectorAll(`.${CLASSES.menuCheck}`);
    checks.forEach((menuCheck, index) => {
      if (this.levelsDone.includes(index + 1) && !this.levelsHelped.includes(index + 1)) {
        CLASSES.menuChecked.forEach((item) => menuCheck?.classList.add(item));
      } else if (this.levelsHelped.includes(index + 1)) {
        CLASSES.menuHelped.forEach((item) => menuCheck?.classList.add(item));
      }
    });
  }

  private subscribeLevelDown(): void {
    this.emitter.subscribe('event:levelDown', (oldLevel: unknown): void => {
      App.closeMenu();
      if (typeof oldLevel === 'number') this.level = oldLevel - 1;
      this.levelChangedHandler();
    });
  }

  private subscribeLevelUp(): void {
    this.emitter.subscribe('event:levelUp', (oldLevel: unknown): void => {
      App.closeMenu();
      if (typeof oldLevel === 'number') this.level = oldLevel + 1;
      this.levelChangedHandler();
    });
  }

  private subscribeMouseoverItem(): void {
    this.emitter.subscribe('event:mouseoverItem', (target: unknown): void => {
      if (target instanceof HTMLElement) {
        // Show helper
        const rect = target.getBoundingClientRect();
        const xCoord = rect.left;
        const yCoord = rect.top;
        target.setAttribute('data-hovered', 'true');
        const helper = document.querySelector(`.${CLASSES.helper}`);
        if (helper) {
          helper.setAttribute('style', `display: block; top: ${yCoord - SETTINGS.helperOffset}px; left: ${xCoord}px`);

          const id = target.id ? ` id="${target.id}"` : '';
          const filteresClasslist = [...target.classList].filter((element) => element !== 'strobe');
          const itemClass =
            target.classList.length && filteresClasslist.length ? ` class="${filteresClasslist.join(' ')}"` : '';

          const itemTaste = target.getAttribute('taste') ? ` taste="${target.getAttribute('taste')}"` : '';

          helper.textContent = `<${target.tagName}${itemTaste}${itemClass}${id}></${target.tagName}>`.toLowerCase();
        }

        // HighLight code
        const dataId = Number(target.getAttribute('data-id'));
        const code = document.querySelector('code');
        const children = code?.children;
        if (children && children.length)
          [...children].forEach((child) => {
            const childId = child?.getAttribute('data-id');
            if (childId && +childId === dataId) {
              child.classList.add('highlightTag');
            }
          });
      }
    });
  }

  private subscribeMouseoutItem(): void {
    this.emitter.subscribe('event:mouseoutItem', (target: unknown): void => {
      if (target instanceof HTMLElement) {
        target.removeAttribute('data-hovered');
        const helper = document.querySelector(`.${CLASSES.helper}`);
        if (helper) helper.removeAttribute('style');

        // Remove highlight code
        const dataId = Number(target.getAttribute('data-id'));
        const code = document.querySelector('code');
        const children = code?.children;
        if (children && children.length)
          [...children].forEach((child) => {
            const childId = child?.getAttribute('data-id');
            if (childId && +childId === dataId) {
              child.classList.remove('highlightTag');
            }
          });
      }
    });
  }

  private subscribeAddHighlightToItem(): void {
    this.emitter.subscribe('event:addHighlightToItem', (target: unknown): void => {
      const table = document.querySelector(`.${CLASSES.table}`);
      if (target instanceof HTMLElement) {
        if (target) {
          const targetDataId = target.getAttribute('data-id');
          if (targetDataId) {
            const itemToHighlight = table?.querySelector(`[data-id='${+targetDataId}']`);
            itemToHighlight?.setAttribute('data-hovered', 'true');
          }
        }
      }
    });
  }

  private subscribeRemoveHighlightToItem(): void {
    this.emitter.subscribe('event:removeHighlightToItem', (target: unknown): void => {
      const table = document.querySelector(`.${CLASSES.table}`);
      if (target instanceof HTMLElement) {
        if (target) {
          const targetDataId = target.getAttribute('data-id');
          if (targetDataId) {
            const itemToHighlight = table?.querySelector(`[data-id='${+targetDataId}']`);
            itemToHighlight?.removeAttribute('data-hovered');
          }
        }
      }
    });
  }

  private subscribeNeedHelp(): void {
    this.emitter.subscribe('event:needHelp', (): void => {
      const input = document.querySelector(`.${CLASSES.editorInput}`) as HTMLInputElement;
      input.value = '';
      const answer = this.data[this.level - 1].answer[0];
      const [speed] = [SETTINGS.typingSpeed];
      let i = 0;

      const typeWriter = (): void => {
        if (i < answer.length) {
          if (input) input.value += answer.charAt(i);
          i += 1;
          setTimeout(typeWriter, speed);
        }
      };

      typeWriter();

      this.levelsHelped.push(this.data[this.level - 1].level);
    });
  }

  private subscribegotoLevel(): void {
    this.emitter.subscribe('event:gotoLevel', (levelTogo: unknown): void => {
      App.closeMenu();

      if (typeof levelTogo === 'number') this.level = levelTogo;

      this.game = new Game(this.level);
      this.editor = new Editor(this.level);
      this.viewer = new Viewer(this.level);
      this.sidebar = new Sidebar(this.level);

      this.main.innerHTML = '';

      this.renderGame();
      this.renderEditor();
      this.renderViewer();
      this.renderHelper();
      this.renderSidebar();

      this.highlightDoneLevels();
      this.emitProgressWidth();

      App.focusInput();
    });
  }

  private emitProgressWidth(): void {
    const width = (this.levelsDone.length / this.data.length) * 100;
    this.emitter.emit('event:changeProgressWidth', width);
  }

  private createBurger(): HTMLElement {
    const burger = new Element('div', 'burger').createTag();
    burger.addEventListener('click', App.toggleMenu.bind(this));

    const burgerIcon = new Element('div', 'burgerIcon').createTag();

    burger.append(burgerIcon);

    return burger;
  }

  private static toggleMenu(): void {
    const burgerIcon = document.querySelector(`.${CLASSES.burgerIcon}`);
    CLASSES.burgerOpen.forEach((item) => burgerIcon?.classList.toggle(item));

    // Check window.width and show menu or sidebar + menu
    App.getSidebarDependingWidth();
    // });
    window.addEventListener('resize', () => {
      App.getSidebarDependingWidth();
    });
  }

  private static getSidebarDependingWidth(): void {
    const sidebar = document.querySelector(`.${CLASSES.sidebar}`);
    const menu = document.querySelector(`.${CLASSES.menu}`);
    const screenWidth = window.innerWidth;
    if (screenWidth <= 950) {
      if (sidebar?.hasAttribute('style')) {
        sidebar?.removeAttribute('style');
      } else {
        sidebar?.setAttribute('style', 'display: grid');
      }
    } else {
      CLASSES.menuOpen.forEach((item) => menu?.classList.toggle(item));
      sidebar?.removeAttribute('style');
    }
  }

  render(): void {
    this.renderHeader();

    this.appendMain();

    this.renderGame();
    this.renderEditor();
    this.renderViewer();
    this.renderHelper();

    this.renderSidebar();

    const burger = this.createBurger();
    this.container.append(burger);

    this.renderFooter();

    document.body.append(this.container);
  }

  private saveProgress(): void {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('done', JSON.stringify(this.levelsDone));
      localStorage.setItem('help', JSON.stringify(this.levelsHelped));
      localStorage.setItem('currentLevel', JSON.stringify(this.level));
    });
  }

  run(): void {
    this.render();

    this.emitProgressWidth();

    App.focusInput();

    this.subscribeLevelDown();
    this.subscribeLevelUp();
    this.subscribeGameOver();
    this.subscribeMouseoverItem();
    this.subscribeMouseoutItem();
    this.subscribeAddHighlightToItem();
    this.subscribeRemoveHighlightToItem();
    this.subscribeCheckAnswer();
    this.subscribeNeedHelp();
    this.subscribeResetProgress();
    this.subscribegotoLevel();

    this.highlightDoneLevels();

    this.saveProgress();
  }
}

export default App;
