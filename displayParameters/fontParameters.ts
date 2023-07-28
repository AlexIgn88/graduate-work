import { breakpointsArrType } from '../datatypes/types';
import { valueArrType } from '../datatypes/types';
import { valieForBreakpoints } from '../datatypes/types';
import arraysToObject from '../includes/arraysToObject';

// // These are the default Chakra UI breakpoints
// const breakpoints = {
//     sm: '30em', // 480px
//     md: '48em', // 768px
//     lg: '62em', // 992px
//     xl: '80em', // 1280px
//     '2xl': '96em', // 1536px
//   }

//Исходные данные: массив брейк-пойнтов и значение размера стандартного для mobile first (минимального) шрифта
const breakpointsArr: breakpointsArrType = ['base', '2xl', 'xl', 'lg', 'md', 'sm'];
const minTextFontSizeValue: number = 14;

//чтобы изменить соотношение уменьшения шрифтов в зависимости от размера экрана, можно поменять тут цифры
const textFontSizeValueArr: valueArrType = [
    minTextFontSizeValue,
    minTextFontSizeValue + 8,
    minTextFontSizeValue + 7,
    minTextFontSizeValue + 6,
    minTextFontSizeValue + 5,
    minTextFontSizeValue + 2
];
//пример:    export const textFontSize: valieForBreakpoints = { base: '16px', '2xl': '24px', xl: '23px', lg: '22px', md: '21px', sm: '18px' };
//Создаем объект со ключами-брейк-пойнтами и значениями-размерами шрифтов чтобы передать в компоненты Chakra UI
export const textFontSize: valieForBreakpoints = arraysToObject(breakpointsArr, textFontSizeValueArr);

const h1HeadersFontSizeValueArr: valueArrType = textFontSizeValueArr.map(FontSize => (FontSize + 10));
export const h1HeadersFontSize: valieForBreakpoints = arraysToObject(breakpointsArr, h1HeadersFontSizeValueArr);

const h2HeadersFontSizeValueArr: valueArrType = textFontSizeValueArr.map(FontSize => (FontSize + 4));
export const h2HeadersFontSize: valieForBreakpoints = arraysToObject(breakpointsArr, h2HeadersFontSizeValueArr);

const h3HeadersFontSizeValueArr: valueArrType = textFontSizeValueArr.map(FontSize => (FontSize + 2));
export const h3HeadersFontSize: valieForBreakpoints = arraysToObject(breakpointsArr, h3HeadersFontSizeValueArr);

//h4, h5, h6 пока не задействованы в данном проекте