import { valieForBreakpoints } from '../datatypes/types';
import { valueArrType } from '../datatypes/types';

// // These are the default Chakra UI breakpoints
// const breakpoints = {
//     sm: '30em', // 480px
//     md: '48em', // 768px
//     lg: '62em', // 992px
//     xl: '80em', // 1280px
//     '2xl': '96em', // 1536px
//   }

const minTextFontSizeValue = 14;

const textFontSizeValueArr: valueArrType = [
    minTextFontSizeValue,
    minTextFontSizeValue + 8,
    minTextFontSizeValue + 7,
    minTextFontSizeValue + 6,
    minTextFontSizeValue + 5,
    minTextFontSizeValue + 2
];

// export const textFontSize: valieForBreakpoints = { base: '16px', '2xl': '24px', xl: '23px', lg: '22px', md: '21px', sm: '18px' };
export const textFontSize: valieForBreakpoints = {
    base: `${textFontSizeValueArr[0]}px`,
    '2xl': `${textFontSizeValueArr[1]}px`,
    xl: `${textFontSizeValueArr[2]}px`,
    lg: `${textFontSizeValueArr[3]}px`,
    md: `${textFontSizeValueArr[4]}px`,
    sm: `${textFontSizeValueArr[5]}px`
};

const h1HeadersFontSizeValue = textFontSizeValueArr.map(FontSize => (FontSize + 10));

export const h1HeadersFontSize: valieForBreakpoints = {
    base: `${h1HeadersFontSizeValue[0]}px`,
    '2xl': `${h1HeadersFontSizeValue[1]}px`,
    xl: `${h1HeadersFontSizeValue[2]}px`,
    lg: `${h1HeadersFontSizeValue[3]}px`,
    md: `${h1HeadersFontSizeValue[4]}px`,
    sm: `${h1HeadersFontSizeValue[5]}px`
};

const h2HeadersFontSizeValue = textFontSizeValueArr.map(FontSize => (FontSize + 4));

export const h2HeadersFontSize: valieForBreakpoints = {
    base: `${h2HeadersFontSizeValue[0]}px`,
    '2xl': `${h2HeadersFontSizeValue[1]}px`,
    xl: `${h2HeadersFontSizeValue[2]}px`,
    lg: `${h2HeadersFontSizeValue[3]}px`,
    md: `${h2HeadersFontSizeValue[4]}px`,
    sm: `${h2HeadersFontSizeValue[5]}px`
};

const h3HeadersFontSizeValue = textFontSizeValueArr.map(FontSize => (FontSize + 2));

export const h3HeadersFontSize: valieForBreakpoints = {
    base: `${h3HeadersFontSizeValue[0]}px`,
    '2xl': `${h3HeadersFontSizeValue[1]}px`,
    xl: `${h3HeadersFontSizeValue[2]}px`,
    lg: `${h3HeadersFontSizeValue[3]}px`,
    md: `${h3HeadersFontSizeValue[4]}px`,
    sm: `${h3HeadersFontSizeValue[5]}px`
};