// const { modals } = require('./modals/modals');

import { modals } from './modules/modals';
import { sliders } from './modules/sliders';
import { forms } from './modules/forms';
import { mask } from './modules/mask';
import { checkTextInputs } from './modules/checkTextInputs';
import { showMoreStyles } from './modules/showMoreStyles';
import { calc } from './modules/calc';
import { changeModalState } from './modules/changeModalState';

window.addEventListener('DOMContentLoaded', () => {
  modals();
  sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
  sliders('.main-slider-item', 'vertical');
  const modalState = {};
  changeModalState(modalState);
  forms(modalState);
  mask('[name="phone"]');
  checkTextInputs('[name="name"]');
  checkTextInputs('[name="message"]');
  showMoreStyles('.button-styles', '#styles .row');
  calc('#size', '#material', '#options', '.promocode', '.calc-price');
});
