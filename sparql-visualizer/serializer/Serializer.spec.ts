import sinon from 'sinon';
import { Serializer, CSS_CLASSES } from './Serializer';
import * as VisualizationRoutes from './VisualizationRoutes';
import { createElement } from './DomAccess';

type SinonStub = import('sinon').SinonStub;
type VisualisationIdentifier = import('../visualizations').VisualisationIdentifier;

const VISUALIZATION_TYPE: VisualisationIdentifier = 'BubbleChart';
const SPARQL_QUERY: string = 'SELECT * FROM *';

describe('Serializer', () => {
    let serializer: Serializer;
    let visualizationCallbackStub: SinonStub;
    let selectMatchingVisualizationStub: SinonStub;

    let visualizationElement: HTMLElement;
    let externalContainer: HTMLElement;

    beforeEach(async () => {
        serializer = new Serializer();

        visualizationElement = createElement('<div id="Visualization"></div>');
        visualizationCallbackStub = sinon.stub();
        visualizationCallbackStub.resolves(visualizationElement);

        selectMatchingVisualizationStub = sinon.stub(VisualizationRoutes, 'selectMatchingVisualizationCallback');
        selectMatchingVisualizationStub.returns(visualizationCallbackStub);

        externalContainer = createElement(`
            <div data-visualization="${VISUALIZATION_TYPE}">
                <script type="text/plain" data-content="Query">
                    ${SPARQL_QUERY}
                </script>
            </div>
        `);

        document.body.appendChild(externalContainer);

        await serializer.serialize();
    });

    afterEach(() => {
        document.body.removeChild(externalContainer);
        sinon.restore();
    });

    it('should create an visualization container inside the external container', () => {
        expect(document.querySelectorAll(`[data-visualization] > .${CSS_CLASSES.GRAPH_CONTAINER}`).length).toEqual(1);
    });

    it('should contain the visualization element inside the visualization container', () => {
        expect(
            document.querySelector(
                `[data-visualization] > .${CSS_CLASSES.GRAPH_CONTAINER} > .${CSS_CLASSES.GRAPH_ELEMENT}`
            )
        ).toEqual(visualizationElement);
    });

    it('should extract the right visualization type from the external container', () => {
        expect(visualizationCallbackStub.firstCall.args[0].visualizationType).toEqual(VISUALIZATION_TYPE);
    });

    it('should extract the right sparql query from the external container', () => {
        expect(visualizationCallbackStub.firstCall.args[0].query.trim()).toEqual(SPARQL_QUERY);
    });

    it('should be able to set a custom endpoint', async () => {
        serializer.withEndpoint({ host: 'my-host' });

        await serializer.serialize();

        expect(visualizationCallbackStub.secondCall.args[0].endpoint.getConfiguration().host).toEqual('my-host');
    });

    it('should thorw an error if there is no query specified', () => {
        while (externalContainer.firstChild) {
            externalContainer.removeChild(externalContainer.firstChild);
        }

        expect(serializer.serialize()).rejects.toBeTruthy();
    });
});
