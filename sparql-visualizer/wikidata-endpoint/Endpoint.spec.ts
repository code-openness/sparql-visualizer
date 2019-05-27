import { LOCALHOST_IDENTIFIER, WikidataEndpoint } from './Endpoint';

type WikidataEndpointConfig = import('./index.types').WikidataEndpointConfig;

const CUSTOM_ENDPOINT_CONFIG: WikidataEndpointConfig = {
    host: 'pik-wikidata.de',
    httpProtocol: 'http',
    port: 8181
};

describe('Wikidata Endpoint', () => {
    let wikidataEndpoint: WikidataEndpoint;

    beforeEach(() => {
        wikidataEndpoint = new WikidataEndpoint();
    });

    it('should return the default endpoints when nothing was procided', () => {
        expect(wikidataEndpoint.getConfiguration()).toEqual({
            host: 'wikidata.org',
            httpProtocol: 'https',
            port: 0
        });
    });

    it('should compose a valid sparql query endpoint url', () => {
        expect(wikidataEndpoint.getSPARQLQueryURL()).toEqual('https://query.wikidata.org');
    });

    it('should compose a valid sparql endpoint url with a port', () => {
        wikidataEndpoint = new WikidataEndpoint(CUSTOM_ENDPOINT_CONFIG);

        expect(wikidataEndpoint.getSPARQLQueryURL()).toEqual('http://query.pik-wikidata.de:8181');
    });

    it('should compose a valid sparql query visualization url', () => {
        wikidataEndpoint = new WikidataEndpoint(CUSTOM_ENDPOINT_CONFIG);

        expect(wikidataEndpoint.getSPARQLVisualisationURL()).toEqual(
            'http://query.pik-wikidata.de:8181/embed.html'
        );
    });

    it('should not prefix the host if it is localhost and use http', () => {
        const urlsWithPort: string[] = LOCALHOST_IDENTIFIER.map(
            (localhostIdentifier: string): WikidataEndpoint => new WikidataEndpoint({ host: localhostIdentifier, port: 8181 })
        ).map(
            (endpoint: WikidataEndpoint): string => endpoint.getSPARQLVisualisationURL()
        ).filter(
            (url: string): boolean => url.indexOf(':8181') < 0
        );

        expect(urlsWithPort).toEqual([]);
    });
});
