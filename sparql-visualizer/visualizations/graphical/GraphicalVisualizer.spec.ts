import sinon, { SinonStubbedInstance } from 'sinon';
import { WikidataEndpoint } from '../../wikidata-endpoint/Endpoint';
import { constructGraphicalVisualizerUrl } from './GraphicalVisualizer';
type VisualisationIdentifier = import('../index.types').VisualisationIdentifier;

const ENDPOINT_GRAPH_URL: string = 'https://query.wikidata.org/embed.html#';

describe('GraphicalVisualizer', () => {
    it('should encode the specifier string in correct order for URL', () => {
        const endpoint: SinonStubbedInstance<WikidataEndpoint> = sinon.createStubInstance(
            WikidataEndpoint
        );
        endpoint.getSPARQLVisualisationURL.returns(ENDPOINT_GRAPH_URL);
        const visualisationType: VisualisationIdentifier = 'BubbleChart';
        const stringExample: string = `hello`;
        const encodedURL: string =
            'https://query.wikidata.org/embed.html#%23defaultView%3ABubbleChart%0Ahello';
        expect(
            // tslint:disable-next-line: no-any
            constructGraphicalVisualizerUrl(stringExample, visualisationType, endpoint as any)
        ).toEqual(encodedURL);
    });
});
