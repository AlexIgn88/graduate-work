export type page = {
    name: string,
    src: string,
    restricted?: (_: any) => Boolean
};

export type place = {
    id: string,
    name: string,
    path: string,
    img?: string,
    text?: string
};

export type breakpointsArrType = [
    string,
    string,
    string,
    string,
    string,
    string
];

export type valueArrType = [
    number,
    number,
    number,
    number,
    number,
    number
];

export type valieForBreakpoints = {
    base: string,
    '2xl'?: string,
    xl?: string,
    lg?: string,
    md?: string,
    sm?: string
};