import { SETTINGS } from '../../settings';
import Element from '../../element';
import { Data, IData } from '../../data';
import { emitter, EventEmitter } from '../../event-emitter';

class Editor {
  private container: HTMLElement;

  private data: IData[];

  private level: number;

  private emitter: EventEmitter;

  constructor(level: number) {
    this.level = level;
    this.emitter = emitter;
    this.data = new Data().getData();
    this.container = new Element('section', 'editor').createTag();
  }

  private static createTitle(): HTMLElement {
    const title = new Element('div', 'editorTitle').createTag();

    const editorName = new Element('div', 'editorName').createTag();
    editorName.textContent = SETTINGS.editorName;

    const editorFile = new Element('div', 'editorFile').createTag();
    editorFile.textContent = SETTINGS.editorFile;

    title.append(editorName, editorFile);

    return title;
  }

  private static createLines(): HTMLElement {
    const lines = new Element('div', 'editorLines').createTag();

    const [linesNumber] = [SETTINGS.linesNumber];
    for (let i = 0; i < linesNumber; i += 1) {
      const line = new Element('span', 'editorLine').createTag();
      line.innerText = (i + 1).toString();
      lines.append(line);
    }
    return lines;
  }

  private createInput(): HTMLInputElement {
    const input = new Element('input', 'editorInput').createTag() as HTMLInputElement;
    input.type = 'text';
    input.placeholder = SETTINGS.editorPlaceholder;

    input.addEventListener('keyup', (event: KeyboardEvent) => {
      this.emitter.emit('event:checkAnswer', event);
    });

    return input;
  }

  private createButton(): HTMLElement {
    const button = new Element('div', 'editorBtn').createTag();
    button.textContent = SETTINGS.editorBtnText;
    button.addEventListener('click', (event: MouseEvent) => {
      this.emitter.emit('event:checkAnswer', event);
    });
    return button;
  }

  private static createInfo(): HTMLElement {
    const info = new Element('div', 'editorInfo').createTag();
    info.textContent = SETTINGS.editorInfo;
    return info;
  }

  private static createHelp(): HTMLElement {
    const help = new Element('div', 'editorHelp').createTag();
    help.textContent = SETTINGS.editorHelp;
    return help;
  }

  private static createWindow(): HTMLElement {
    const window = new Element('div', 'editorWindow').createTag();
    return window;
  }

  render(): HTMLElement {
    const title = Editor.createTitle();
    this.container.append(title);

    const window = Editor.createWindow();
    this.container.append(window);

    window.append(
      Editor.createLines(),
      this.createInput(),
      this.createButton(),
      Editor.createInfo(),
      Editor.createHelp(),
    );

    return this.container;
  }
}

export default Editor;
