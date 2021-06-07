declare module "api" {
    const _default: {
        prams: {
            country: any;
            rail_id: any;
            image_id: any;
        };
        railsSchema: (country: any) => string;
        rail: (rail_id: any, country: any) => string;
        image: (image_id: any, image_quality: any, image_width: any, image_height: any, image_format: any) => string;
    };
    export default _default;
}
declare module "extract" {
    const extract: (rawData: any) => object[];
    export default extract;
}
declare module "index" { }
