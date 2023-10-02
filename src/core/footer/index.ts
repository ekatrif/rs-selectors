import { SETTINGS } from '../settings';
import Element from '../element';

class Footer {
  private container: HTMLElement;

  constructor() {
    this.container = new Element('footer', 'footer').createTag();
  }

  private static createAuthor(): HTMLElement {
    const author = new Element('p', 'footerAuthor').createTag();

    const authorLink = new Element('a').createTag() as HTMLAnchorElement;
    authorLink.href = SETTINGS.gitUrl;
    authorLink.innerText = SETTINGS.gitName;

    author.append(authorLink);

    return author;
  }

  private static createLogo(): HTMLElement {
    const link = document.createElement('a');
    link.href = SETTINGS.footerLogoPath;

    const logo = new Element('img', 'footerLogo').createTag() as HTMLImageElement;
    logo.src = SETTINGS.footerLogoPath;

    link.append(logo);

    return link;
  }

  private static createYear(): HTMLElement {
    const year = new Element('p', 'footerYear').createTag();
    year.innerText = SETTINGS.footerYear;

    return year;
  }

  render(): HTMLElement {
    const author = Footer.createAuthor();
    this.container.append(author);

    const logo = Footer.createLogo();
    this.container.append(logo);

    const year = Footer.createYear();
    this.container.append(year);

    return this.container;
  }
}

export default Footer;
