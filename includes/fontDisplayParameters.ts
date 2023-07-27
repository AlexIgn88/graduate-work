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

const minTextFontSizeValue = 16;

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

const headersFontSizeValue = textFontSizeValueArr.map(FontSize => (FontSize + 10));

export const headersFontSize: valieForBreakpoints = {
    base: `${headersFontSizeValue[0]}px`,
    '2xl': `${headersFontSizeValue[1]}px`,
    xl: `${headersFontSizeValue[2]}px`,
    lg: `${headersFontSizeValue[3]}px`,
    md: `${headersFontSizeValue[4]}px`,
    sm: `${headersFontSizeValue[5]}px`
};