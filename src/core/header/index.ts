import { SETTINGS } from '../settings';
import Element from '../element';

class Header {
  private container: HTMLElement;

  constructor() {
    this.container = new Element('header', 'header').createTag();
    this.container.innerText = SETTINGS.gameTitle;
  }

  private static createLogo(): HTMLElement {
    const logo = new Element('img', 'logo').createTag() as HTMLImageElement;
    logo.src = SETTINGS.logoPath;
    logo.alt = SETTINGS.logoAltText;
    return logo;
  }

  render(): HTMLElement {
    const logo = Header.createLogo();
    this.container.append(logo);
    return this.container;
  }
}

export default Header;
