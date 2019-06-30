import sinon from 'sinon';
import { WikidataEndpoint } from '../../wikidata-endpoint/Endpoint';
import { constructGraphicalVisualizerUrl } from './UrlComposer';

type VisualisationIdentifier = import('../index.types').VisualisationIdentifier;
type SinonStubbedInstance<ClassType> = import('sinon').SinonStubbedInstance<ClassType>;

const ENDPOINT_GRAPH_URL: string = 'https://query.wikidata.org/embed.html';

const VISUALIZATION_TYPE: VisualisationIdentifier = 'BubbleChart';

const SPARQL_QUERY: string = `

  # music genres
 SELECT ?item
WHERE {
    ?item wdt:P31 wd:Q188451;
}

`;

const ENCODED_SPARQL_QUERY: string =
    '\
SELECT%20%3Fitem%0A\
WHERE%20%7B%0A\
%3Fitem%20wdt%3AP31%20wd%3AQ188451%3B%0A\
%7D\
';

describe.only('Graph URL Composer', () => {
    let finalEncodedUrl: string;

    beforeEach(() => {
        const endpoint: SinonStubbedInstance<WikidataEndpoint> = sinon.createStubInstance(WikidataEndpoint);
        endpoint.getSPARQLVisualisationURL.returns(ENDPOINT_GRAPH_URL);

        finalEncodedUrl = constructGraphicalVisualizerUrl({
            endpoint: (endpoint as unknown) as WikidataEndpoint,
            query: SPARQL_QUERY,
            visualizationType: VISUALIZATION_TYPE
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should encode the specifier string in correct order for URL', () => {
        expect(finalEncodedUrl).toEqual(
            `${ENDPOINT_GRAPH_URL}#%23defaultView%3A${VISUALIZATION_TYPE}%0A${ENCODED_SPARQL_QUERY}`
        );
    });
});
