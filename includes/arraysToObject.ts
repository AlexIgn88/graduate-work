import { breakpointsArrType } from '../datatypes/types';
import { valueArrType } from '../datatypes/types';
import { valieForBreakpoints } from '../datatypes/types';

export default function arraysToObject(keys: breakpointsArrType, values: valueArrType): valieForBreakpoints {
    const obj: any = {};

    for (let i = 0; i < keys.length; i++) {
        obj[keys[i]] = `${values[i]}px`;
    }

    return obj;
}