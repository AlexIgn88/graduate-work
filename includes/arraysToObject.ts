import { breakpointsArrType } from '../datatypes/types';
import { valueArrType } from '../datatypes/types';
import { valieForBreakpoints } from '../datatypes/types';

export function getBreakpointsParamInObject(keys: breakpointsArrType, values: valueArrType): valieForBreakpoints {
    const valuesArrWithPX = values.map(value => value + 'px');
    return arraysToObject(keys, valuesArrWithPX);
}

export default function arraysToObject(keys: any[], values: any[]): any {
    const obj: any = {};

    for (let i = 0; i < keys.length; i++) {
        obj[keys[i]] = values[i];
    }
    return obj;
}

