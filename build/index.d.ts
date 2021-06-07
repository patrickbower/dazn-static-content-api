declare module "api" {
    const _default: {
        prams: {
            country: string;
            rail_id: string;
            image_id: string;
        };
        railsSchema: (country: string) => string;
        rail: (rail_id: string, country: string) => string;
        image: (image_id: string, image_quality: number, image_width: number, image_height: number, image_format: string) => string;
    };
    export = _default;
}
declare module "extract" {
    const extract: (rawData: any) => object[];
    export = extract;
}
declare module "index" { }
