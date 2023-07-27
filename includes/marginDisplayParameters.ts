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

const minMarginValue = 20;

const marginValueArr: valueArrType = [
    minMarginValue,
    minMarginValue * 3,
    minMarginValue * 2.5,
    minMarginValue * 2.5,
    minMarginValue * 2,
    minMarginValue * 1.5
];

// export const marginParameters: valieForBreakpoints = { base: '20px', '2xl': '60px', xl: '50px', lg: '50px', md: '40px', sm: '30px' };
export const marginParameters: valieForBreakpoints = {
    base: `${marginValueArr[0]}px`,
    '2xl': `${marginValueArr[1]}px`,
    xl: `${marginValueArr[2]}px`,
    lg: `${marginValueArr[3]}px`,
    md: `${marginValueArr[4]}px`,
    sm: `${marginValueArr[5]}px`
};