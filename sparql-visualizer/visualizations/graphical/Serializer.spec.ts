import sinon from 'sinon';
import { WikidataEndpoint } from '../../wikidata-endpoint/Endpoint';
import { createGraphElement } from './Serializer';

type VisualisationIdentifier = import('../index.types').VisualisationIdentifier;

const ENDPOINT_GRAPH_URL: string = 'https://query.wikidata.org/embed.html';
const SPARQL_QUERY: string = 'SELECT * FROM *';
const VISUALIZATION_TYPE: VisualisationIdentifier = 'BubbleChart';

describe('Graphical Serializer', () => {
    let endpoint: WikidataEndpoint;
    let graphElement: HTMLElement;

    beforeEach(async () => {
        endpoint = new WikidataEndpoint({});
        sinon.stub(endpoint, 'getSPARQLVisualisationURL').returns(ENDPOINT_GRAPH_URL);

        graphElement = await createGraphElement({
            query: SPARQL_QUERY,
            visualizationType: VISUALIZATION_TYPE,
            endpoint
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return an iframe', async () => {
        expect(graphElement.matches('iframe')).toBeTruthy();
    });

    it('should contain the given url to the graph in the src attirbute of the element', async () => {
        expect(graphElement.getAttribute('src')).toEqual(
            'https://query.wikidata.org/embed.html#%23defaultView%3ABubbleChart%0ASELECT%20*%20FROM%20*'
        );
    });
});
