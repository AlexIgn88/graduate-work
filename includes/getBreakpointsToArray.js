export default function getBreakpointsToArray(arr) {
    return [arr[0], ...arr.slice(1).reverse()];
}