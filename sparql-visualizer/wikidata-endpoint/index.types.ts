export interface WikidataEndpointConfig {
    host?: string;
    httpProtocol?: HttpProtocol;
}

export type HttpProtocol = 'http' | 'https';
