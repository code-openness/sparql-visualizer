type WikidataEndpointConfig = import('./index.types').WikidataEndpointConfig;

const DEFAULT_WIKIDATA_CONFIG: Required<WikidataEndpointConfig> = {
    host: 'wikidata.org',
    httpProtocol: 'https',
    port: 0
};

export class WikidataEndpoint {
    private readonly configuration: Required<WikidataEndpointConfig> = DEFAULT_WIKIDATA_CONFIG;

    constructor(configuration?: WikidataEndpointConfig) {
        this.configuration = {
            ...this.configuration,
            ...(configuration ? configuration : {})
        };
    }

    public getSPARQLQueryURL(): string {
        return this.getBaseUrl();
    }

    public getSPARQLVisualisationURL(): string {
        return `${this.getBaseUrl()}/embed.html`;
    }

    private getBaseUrl(): string {
        const { host, httpProtocol, port } = this.configuration;
        const portString = port !== 0 ? `:${port}` : '';

        if (this.isLocalhost()) {
            return `http://${host}${portString}`;
        } else {
            return `${httpProtocol}://query.${host}${portString}`;
        }
    }

    private isLocalhost(): boolean {
        const { host } = this.configuration;

        return ['localhost', '127.0.0.1', '0.0.0.0'].indexOf(host) >= 0;
    }

    public getConfiguration(): Readonly<WikidataEndpointConfig> {
        return this.configuration;
    }
}
