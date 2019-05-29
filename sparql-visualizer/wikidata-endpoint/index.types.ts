export interface WikidataEndpointConfig {
    host?: string;
    httpProtocol?: HttpProtocol;
    port?: number;
}

export type HttpProtocol =
    | 'http'
    | 'https';
