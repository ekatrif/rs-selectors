interface ISettings {
  appId: string;
  linesNumber: number;
  logoPath: string;
  logoAltText: string;
  gameTitle: string;
  gitUrl: string;
  gitName: string;
  rsLink: string;
  footerLogoPath: string;
  footerYear: string;
  helpText: string;
  editorName: string;
  editorFile: string;
  editorPlaceholder: string;
  editorBtnText: string;
  editorInfo: string;
  editorHelp: string;
  viewerName: string;
  viewerFile: string;
  viewerPadding: number;
  examplesTitle: string;
  menuTitle: string;
  btnReset: string;
  congrats: string;
  typingSpeed: number;
  helperOffset: number;
}

interface IClasses {
  [key: string]: string[];
}

const SETTINGS: ISettings = {
  appId: 'app',
  linesNumber: 20,
  logoPath: './img/logo.png',
  logoAltText: 'logo',
  gameTitle: 'CSS Diner',
  gitUrl: 'https://github.com/ekatrif',
  gitName: 'EkaTrif',
  rsLink: 'https://rs.school/js/',
  footerLogoPath: './img/rs_school_js.svg',
  footerYear: '2023',
  helpText: `Help, I'm stuck!`,
  editorName: 'CSS Editor',
  editorFile: 'style.css',
  editorPlaceholder: 'Type in a CSS',
  editorBtnText: 'enter',
  editorInfo: `{<br>/* Styles would go here. */<br>}`,
  editorHelp: `/* <br>Type a number to skip to a level.<br>Ex → "5" for level 5 <br>*/`,
  viewerName: 'HTML Viewer',
  viewerFile: 'table.html',
  viewerPadding: 1,
  examplesTitle: 'Examples',
  menuTitle: 'Choose a level',
  btnReset: 'Reset Progress',
  congrats: 'You did it!<br/>You rock at CSS.',
  typingSpeed: 200,
  helperOffset: 100,
};

const CLASSES: IClasses = {
  header: ['header'],
  logo: ['header__logo'],
  footer: ['footer'],
  footerAuthor: ['footer__author'],
  footerLogo: ['footer__logo'],
  footerYear: ['footer__year'],
  main: ['main'],
  game: ['game'],
  gameTitle: ['game__title'],
  help: ['game__help'],
  helpLink: ['game__help-link'],
  table: ['table'],
  editor: ['editor'],
  trueAnimation: ['clean'],
  falseAnimation: ['shake'],
  strobeAnimation: ['strobe'],
  editorTitle: ['editor__title'],
  editorName: ['editor__name'],
  editorFile: ['editor__file'],
  editorWindow: ['editor__window'],
  editorLines: ['editor__lines'],
  editorLine: ['editor__line'],
  editorInput: ['editor__input', 'input-strobe'],
  editorBtn: ['editor__button'],
  editorInfo: ['editor__info'],
  editorHelp: ['editor__help'],
  viewer: ['viewer'],
  viewerTitle: ['viewer__title'],
  viewerName: ['viewer__name'],
  viewerFile: ['viewer__file'],
  viewerWindow: ['viewer__window'],
  viewerLines: ['viewer__lines'],
  viewerLine: ['viewer__line'],
  viewerMarkup: ['viewer__markup'],
  sidebar: ['sidebar'],
  sidebarOpen: ['sidebar-open'],
  sidebarTitle: ['sidebar__title'],
  sidebarLevel: ['sidebar__level'],
  sidebarCheck: ['sidebar__check'],
  sidebarChecked: ['sidebar__check-checked'],
  sidebarHelped: ['sidebar__check-help'],
  sidebarPrev: ['sidebar__prev'],
  sidebarNext: ['sidebar__next'],
  burger: ['sidebar__burger', 'burger'],
  burgerIcon: ['burger__icon'],
  burgerOpen: ['burger__icon-open'],
  progress: ['sidebar__progress', 'progress'],
  progressLine: ['progress__line'],
  sidebarInfo: ['sidebar__info', 'info'],
  sidebarInfoTitle: ['info__title'],
  sidebarInfoSubtitle: ['info__subtitle'],
  sidebarSyntax: ['info__syntax'],
  sidebarHint: ['info__hint'],
  examples: ['info__examples', 'examples'],
  examplesTitle: ['examples__title'],
  examplesBody: ['examples__body'],
  example: ['examples__example'],
  menu: ['sidebar__menu', 'menu'],
  menuOpen: ['sidebar__menu-open'],
  menuTitle: ['menu__title'],
  menuList: ['menu__list'],
  menuItem: ['menu__item'],
  menuActiveItem: ['menu__item-active'],
  menuLink: ['menu__link'],
  menuCheck: ['menu__check'],
  menuChecked: ['menu__check-checked'],
  menuHelped: ['menu__check-help'],
  menuNumber: ['menu__number'],
  menuName: ['menu__name'],
  menuBtn: ['menu__btn'],
  helper: ['helper'],
};

export { SETTINGS, CLASSES };
