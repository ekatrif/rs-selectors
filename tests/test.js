/**
 * @jest-environment jsdom
 */

import App from '../src/core/app';
import { Data } from '../src/core/data';
import Element from '../src/core/element';
import { SETTINGS } from '../src/core/settings';

test('renders a div with id "app" on the DOM after calling .render()', () => {
  const app = new App();
  app.render();
  expect(document.getElementById('app')).toBeTruthy();
});

test('check, if general blocks exists', () => {
  const generalBlocks = document.querySelectorAll('.game, .editor, .viewer, .sidebar');
  expect(generalBlocks).toHaveLength(4);
});

test('table has items on it', () => {
  const container = document.querySelector('.table');
  expect(container.children.item.length).toBeGreaterThan(0);
});

test('data is not empty', () => {
  const data = new Data().getData();
  expect(data).not.toHaveLength(0);
});

test('module Element returns HTML element', () => {
  const element = new Element().createTag();
  expect(element instanceof HTMLElement).toBe(true);
});

test('footer contains author, logo and year', () => {
  const footerBlocks = document.querySelectorAll('.footer__author, .footer__logo, .footer__year');
  expect(footerBlocks).toHaveLength(3);
});

test('reset button has click event listener', () => {
  const element = document.createElement('div');
  element.classList.add('my-menu__btn');

  const callback = jest.fn();
  element.addEventListener('click', callback);

  const event = new MouseEvent('click');
  element.dispatchEvent(event);

  expect(callback).toHaveBeenCalledTimes(1);

  element.removeEventListener('click', callback);
});

test('text for the end of game set in settings', () => {
  const [congrats] = [SETTINGS.congrats];
  expect(congrats).not.toHaveLength(0);
});

test('clicking burger button adds class "sidebar__menu-open" to sidebar', () => {
  // Create a new element and button
  const element = document.querySelector('.sidebar__menu ');
  const button = document.querySelector('.burger');

  button.click();

  expect(element.classList.contains('sidebar__menu-open')).toBe(true);
});

test('viewer contains tags', () => {
  const container = document.querySelector('.viewer__markup');
  expect(container.children.item.length).toBeGreaterThan(0);
});