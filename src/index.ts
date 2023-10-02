import './style.scss';
import App from './core/app';

const savedLevel = localStorage.getItem('currentLevel');
const level = savedLevel ? +JSON.parse(savedLevel) : 1;

const done = localStorage.getItem('done');
const doneLevels = done ? JSON.parse(done) : [];

const help = localStorage.getItem('help');
const helpLevels = help ? JSON.parse(help) : [];

const app = new App(level, doneLevels, helpLevels);
app.run();
