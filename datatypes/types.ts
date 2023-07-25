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
}