export type page = {
    name: string,
    src: string,
    restricted?: (_: any) => Boolean,
    icon?: any
};

export type place = {
    id: string,
    name: string,
    path: string,
    img?: string,
    text?: string
};

export type breakpointsArrType = string[];

export type valueArrType = number[];

export type valieForBreakpoints = {
    base: string,
    '2xl'?: string,
    xl?: string,
    lg?: string,
    md?: string,
    sm?: string
};