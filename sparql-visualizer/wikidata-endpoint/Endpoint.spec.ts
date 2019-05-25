import { WikidataEndpoint } from './Endpoint';

type WikidataEndpointConfig = import('./index.types').WikidataEndpointConfig;

const CUSTOM_ENDPOINT_CONFIG: WikidataEndpointConfig = {
    httpProtocol: 'http',
    host: 'pik-wikidata.de',
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
        wikidataEndpoint = new WikidataEndpoint({
            host: 'localhost',
            port: 8181
        });

        expect(wikidataEndpoint.getSPARQLVisualisationURL()).toEqual(
            'http://localhost:8181/embed.html'
        );
    });

    it('should not prefix the host if it is 127.0.0.1 and use http', () => {
        wikidataEndpoint = new WikidataEndpoint({
            host: '127.0.0.1',
            port: 8181
        });

        expect(wikidataEndpoint.getSPARQLVisualisationURL()).toEqual(
            'http://127.0.0.1:8181/embed.html'
        );
    });

    it('should not prefix the host if it is 0.0.0.0 and use http', () => {
        wikidataEndpoint = new WikidataEndpoint({
            host: '0.0.0.0',
            port: 8181
        });

        expect(wikidataEndpoint.getSPARQLVisualisationURL()).toEqual(
            'http://0.0.0.0:8181/embed.html'
        );
    });
});
