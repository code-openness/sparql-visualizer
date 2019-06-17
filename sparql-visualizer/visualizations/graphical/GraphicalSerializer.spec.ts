import sinon from 'sinon';
import { WikidataEndpoint } from '../../wikidata-endpoint/Endpoint';
import { composeIFrame, createGraphElement } from './GraphicalSerializer';
type VisualisationIdentifier = import('../index.types').VisualisationIdentifier;

const ENDPOINT_GRAPH_URL: string = 'https://query.wikidata.org/embed.html#';

describe('Graphical Serializer', () => {
    it('should return type HTMLElement', () => {
        expect(composeIFrame(ENDPOINT_GRAPH_URL)).toBeInstanceOf(HTMLElement);
    });
    it('should return a HTMLIFrameElement', () => {
        const endpoint: WikidataEndpoint = new WikidataEndpoint({});
        sinon.stub(endpoint, 'getSPARQLVisualisationURL').returns(ENDPOINT_GRAPH_URL);

        const visualisationType: VisualisationIdentifier = 'BubbleChart';
        const stringExample: string = 'hello';
        const graphElement: HTMLElement = createGraphElement(
            stringExample,
            visualisationType,
            endpoint
        );
        expect(graphElement.matches('iframe')).toBeTruthy();
    });
    it('should contain the given src in iFrame', () => {
        const endpoint: WikidataEndpoint = new WikidataEndpoint({});
        sinon.stub(endpoint, 'getSPARQLVisualisationURL').returns(ENDPOINT_GRAPH_URL);

        const visualisationType: VisualisationIdentifier = 'BubbleChart';
        const stringExample: string = `hello`;

        const graphElement: HTMLElement = createGraphElement(
            stringExample,
            visualisationType,
            endpoint
        );
        expect(graphElement.getAttribute('src')).toEqual(
            'https://query.wikidata.org/embed.html#%23defaultView%3ABubbleChart%0Ahello'
        );
    });
});
