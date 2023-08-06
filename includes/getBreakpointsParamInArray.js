export default function getBreakpointsParamInArray(arr) {
    return [arr[0], ...arr.slice(1).reverse()];
}