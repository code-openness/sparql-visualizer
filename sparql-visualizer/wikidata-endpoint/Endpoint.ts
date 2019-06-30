type WikidataEndpointConfig = import('./index.types').WikidataEndpointConfig;

export const DEFAULT_WIKIDATA_CONFIG: Required<WikidataEndpointConfig> = {
    host: 'wikidata.org',
    httpProtocol: 'https'
};

export class WikidataEndpoint {
    private readonly configuration: Required<WikidataEndpointConfig>;

    constructor(configuration: WikidataEndpointConfig = {}) {
        this.configuration = { ...DEFAULT_WIKIDATA_CONFIG, ...configuration };
    }

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
        const { host, httpProtocol } = this.configuration;
        return `${httpProtocol}://query.${host}`;
    }
}
