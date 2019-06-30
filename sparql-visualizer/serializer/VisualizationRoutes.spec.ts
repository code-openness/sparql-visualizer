import sinon from 'sinon';
import * as Visualizations from '../visualizations';
import { selectMatchingVisualizationCallback } from './VisualizationRoutes';
import { VisualizationParameters } from './index.types';
import { WikidataEndpoint } from '../wikidata-endpoint';
import { VisualisationIdentifier } from '../visualizations';

type SinonStub = import('sinon').SinonStub;

const DUMMY_PARAMETERS: VisualizationParameters = {
    query: '',
    endpoint: (sinon.createStubInstance(WikidataEndpoint) as unknown) as WikidataEndpoint,
    visualizationType: 'Map'
};

describe('Visualizations routes', () => {
    let createTableElementStub: SinonStub;
    let createGraphElementStub: SinonStub;

    beforeEach(() => {
        createTableElementStub = sinon.stub(Visualizations, 'createTableElement');
        createGraphElementStub = sinon.stub(Visualizations, 'createGraphElement');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return the instantiation function for a table if the type is table', async () => {
        await selectMatchingVisualizationCallback('Table')(DUMMY_PARAMETERS);

        expect(createTableElementStub.firstCall.args).toEqual([DUMMY_PARAMETERS]);
    });

    it('should return the instatiation function for a graph if the type is a graph type', async () => {
        await selectMatchingVisualizationCallback('BubbleChart')(DUMMY_PARAMETERS);

        expect(createGraphElementStub.firstCall.args).toEqual([DUMMY_PARAMETERS]);
    });

    it('should return the instatiation function for a graph if the type is wrong or unknown', async () => {
        await selectMatchingVisualizationCallback(('Invalid' as unknown) as VisualisationIdentifier)(DUMMY_PARAMETERS);

        expect(createGraphElementStub.firstCall.args).toEqual([DUMMY_PARAMETERS]);
    });
});
