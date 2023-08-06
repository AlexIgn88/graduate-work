import { valieForBreakpoints } from '../datatypes/types';
import getBreakpointsParamInArray from '../includes/getBreakpointsParamInArray';

// // These are the default Chakra UI breakpoints
// const breakpoints = {
//     sm: '30em', // 480px
//     md: '48em', // 768px
//     lg: '62em', // 992px
//     xl: '80em', // 1280px
//     '2xl': '96em', // 1536px
//   }

export const flexDirection: valieForBreakpoints = { base: 'column', lg: 'row' };

export const flexDirectionInArray = getBreakpointsParamInArray(Object.values(flexDirection));