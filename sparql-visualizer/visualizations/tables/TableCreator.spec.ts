import sinon from 'sinon';
import * as SPARQLRequest from '../../sparql/Request';
import { WikidataEndpoint } from '../../wikidata-endpoint';
import { createDataTable } from './TableCreator';

type SinonStub = import('sinon').SinonStub;

describe('TableCreator', () => {
    let endpointStub: WikidataEndpoint;

    beforeEach(() => {
        endpointStub = sinon.createStubInstance(WikidataEndpoint) as any;
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should call requestQueryResults', async () => {
        const requestQueryResultsStub: SinonStub = sinon.stub(SPARQLRequest, 'requestQueryResults');
        requestQueryResultsStub.resolves(createStubResponse());

        await createDataTable(endpointStub, '');

        expect(requestQueryResultsStub.calledOnceWith).toEqual([endpointStub, '']);
    });

    it('should call crateHTMLTable', async () => {});

    function createStubResponse(returnValue: object = {}): Response {
        return {
            json: sinon.stub().resolves(returnValue)
        } as any;
    }
});
