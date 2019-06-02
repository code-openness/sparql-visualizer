type WikidataEndpointConfig = import('./index.types').WikidataEndpointConfig;

export const LOCALHOST_IDENTIFIER: ReadonlyArray<string> = ['localhost', '127.0.0.1', '0.0.0.0'];

export const DEFAULT_WIKIDATA_CONFIG: Required<WikidataEndpointConfig> = { host: 'wikidata.org', httpProtocol: 'https', port: 0 };

export class WikidataEndpoint {
    private readonly configuration: Required<WikidataEndpointConfig>;

    constructor(configuration: WikidataEndpointConfig = {}) { this.configuration = { ...DEFAULT_WIKIDATA_CONFIG, ...configuration }; }

    public getSPARQLQueryURL(): string {
        return this.getBaseUrl();
    }

    public getSPARQLVisualisationURL(): string {
        return `${this.getBaseUrl()}/embed.html`;
    }

    public getConfiguration(): Readonly<WikidataEndpointConfig> {
        return this.configuration;
    }

    private getBaseUrl(): string {
        const { host, httpProtocol, port } = this.configuration;
        const portString: string = port !== 0 ? `:${port}` : '';

        if (this.isLocalhost()) {
            return `http://${host}${portString}`;
        } else {
            return `${httpProtocol}://query.${host}${portString}`;
        }
    }

    private isLocalhost(): boolean {
        const { host } = this.configuration;

        return LOCALHOST_IDENTIFIER.indexOf(host) >= 0;
    }
}
