export type page = {
    name: string,
    src: string,
    restricted?: (_: any) => Boolean
};