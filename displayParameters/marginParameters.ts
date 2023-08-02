import { breakpointsArrType } from '../datatypes/types';
import { valueArrType } from '../datatypes/types';
import { valieForBreakpoints } from '../datatypes/types';
import arraysToObject from '../includes/arraysToObject';
import getBreakpointsToArray from '../includes/getBreakpointsToArray';

// // These are the default Chakra UI breakpoints
// const breakpoints = {
//     sm: '30em', // 480px
//     md: '48em', // 768px
//     lg: '62em', // 992px
//     xl: '80em', // 1280px
//     '2xl': '96em', // 1536px
//   }

const breakpointsArr: breakpointsArrType = ['base', '2xl', 'xl', 'lg', 'md', 'sm'];
const minMarginValue: number = 20;

const marginValueArr: valueArrType = [
    minMarginValue,
    minMarginValue * 3,
    minMarginValue * 2.5,
    minMarginValue * 2.5,
    minMarginValue * 2,
    minMarginValue * 1.5
];

// export const marginParameters: valieForBreakpoints = { base: '20px', '2xl': '60px', xl: '50px', lg: '50px', md: '40px', sm: '30px' };
export const marginParameters: valieForBreakpoints = arraysToObject(breakpointsArr, marginValueArr);

//например  ['0em', '30em', '48em', '62em', '80em', '96em'] элементы массива идут по возрастанию
export const marginParametersInArray = getBreakpointsToArray(Object.values(marginParameters));