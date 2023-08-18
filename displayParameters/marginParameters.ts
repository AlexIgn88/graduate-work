import { breakpointsArrType } from '../datatypes/types';
import { valueArrType } from '../datatypes/types';
import { valieForBreakpoints } from '../datatypes/types';
import { getBreakpointsParamInObject } from '../includes/arraysToObject';
import getBreakpointsParamInArray from '../includes/getBreakpointsParamInArray';

// // These are the default Chakra UI breakpoints
// const breakpoints = {
//     sm: '30em', // 480px
//     md: '48em', // 768px
//     lg: '62em', // 992px
//     xl: '80em', // 1280px
//     '2xl': '96em', // 1536px
//   }

const breakpointsArr: breakpointsArrType = ['base', '2xl', 'xl', 'lg', 'md', 'sm'];
const minMarginValue: number = 30;

const marginValueArr: valueArrType = [
    minMarginValue,
    minMarginValue * 2,
    minMarginValue * 2,
    minMarginValue * 2,
    minMarginValue * 2,
    minMarginValue * 1.5
];

// export const marginParameters: valieForBreakpoints = { base: '20px', '2xl': '60px', xl: '50px', lg: '50px', md: '40px', sm: '30px' };
export const marginParameters: valieForBreakpoints = getBreakpointsParamInObject(breakpointsArr, marginValueArr);

//например  ['0em', '30em', '48em', '62em', '80em', '96em'] элементы массива идут по возрастанию
export const marginParametersInArray = getBreakpointsParamInArray(Object.values(marginParameters));

const halfMarginValueArr: valueArrType = marginValueArr.map(margin => (margin / 2));
export const halfMarginParameters: valieForBreakpoints = getBreakpointsParamInObject(breakpointsArr, halfMarginValueArr);
export const halfMarginParametersInArray = getBreakpointsParamInArray(Object.values(halfMarginParameters));